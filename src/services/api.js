import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/company";

// Create Axios instance
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15s timeout to avoid hanging requests
});

// A no-auth axios instance to call endpoints that must NOT include Authorization
export const noAuthApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Single-flight refresh control
let isRefreshing = false;
let refreshPromise = null; // Promise resolving to new accessToken
let pendingRequests = [];

function subscribeTokenRefresh(cb) {
  pendingRequests.push(cb);
}

function onRefreshed(token) {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
}

function refreshAccessToken() {
  if (!isRefreshing) {
    isRefreshing = true;
    const refreshToken = localStorage.getItem('refreshToken');
    refreshPromise = (async () => {
      if (!refreshToken) throw new Error('No refresh token available');
      const response = await noAuthApi.post('/refresh/', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      return accessToken;
    })()
      .then((token) => {
        onRefreshed(token);
        return token;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// Attach accessToken if available
api.interceptors.request.use((config) => {
  const url = config?.url || '';
  // Do NOT attach Authorization for public/refresh endpoints
  const isPublicEndpoint = /\/(refresh|login|register|logout)\/?(\?.*)?$/.test(url);
  if (isPublicEndpoint) {
    if (config.headers && config.headers.Authorization) {
      delete config.headers.Authorization;
    }
    return config;
  }

  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration and network aborts
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

    // Retry once on ECONNABORTED (timeout/abort)
    if ((error.code === 'ECONNABORTED' || error.message === 'Request aborted') && !originalRequest._abortedRetry) {
      originalRequest._abortedRetry = true;
      return api(originalRequest);
    }

    // Handle both 401 and 403 errors for token expiration
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Queue this request until refresh completes
        const newToken = await (refreshPromise || refreshAccessToken());
        // Update header and retry
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // If refresh fails, log out the user
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
        } catch {}
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication
export const registerCompany = (data) => api.post("/register/", data);
export const verifyEmail = (data) => api.post("/verify-email/", data);
export const loginCompany = async (data) => {
  console.log('loginCompany payload:', data); // Debug payload
  try {
    const response = await api.post('/login/', data); // Remove trailing slash
    console.log('loginCompany response:', response.data); // Debug response
    return response;
  } catch (error) {
    console.error('loginCompany error:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    console.warn('logoutUser: No refreshToken provided');
    throw new Error('Refresh token is required');
  }
  const accessToken = localStorage.getItem('accessToken');
  console.log('logoutUser payload:', { refreshToken, accessTokenPresent: !!accessToken });
  try {
    const response = await api.post('/logout/', { refreshToken, accessToken }, {
      headers: {
        'Content-Type': 'application/json',
        // If backend requires accessToken or refreshToken in headers, uncomment:
        // Authorization: `Bearer ${refreshToken}`,
      },
    });
    console.log('logoutUser response:', response.data);
    return response;
  } catch (error) {
    console.error('logoutUser error:', error.response?.data || error.message);
    throw error;
  }
};

export const refreshToken = async (refreshToken) => {
  console.log('refreshToken payload:', { refreshToken });
  try {
    // Use noAuthApi to ensure no Authorization header is sent
    const response = await noAuthApi.post('/refresh/', { refreshToken });
    console.log('refreshToken response:', response.data);
    return response;
  } catch (error) {
    console.error('refreshToken error:', error.response?.data || error.message);
    throw error;
  }
};

// Devices
export const registerEsp = (data) => api.post("/register-esp/", data);
export const TotalEspPerProvince = () => api.get("/total-esp-per-province/")
export const TotalSensorPerProvince = () => api.get("/total-sensors-per-province/")
export const TotalSmartValvePerProvince = () => api.get("/total-smartvalve-per-province/")

export const TotalEspPerDistrict = (province) => {
  return api.get("/total-esp-per-district/", {
    params: { province }
  });
};

export const TotalSensorPerDistrict = (province) => {
  return api.get("/total-sensors-per-district/", {
    params: { province }
  });
};

export const TotalSmartValvePerDistrict  = (province) => {
  return api.get("/total-smartvalve-per-district/", {
    params: { province }
  });
};




// Provinces
export const getSmartValveLocation = () => api.get("/SmartValveLocation/");
export const getSensorLocation = () => api.get("/SensorLocation/");

// Control
export const ScheduledControl = (data) => api.post("/scheduled-control/",data);
export const getTodayScheduledControls = () => api.get("/today-scheduled-controls/");
export const getFutureScheduledControls = () => api.get("/future-scheduled-controls/");
export const manageScheduledControlStatus = (controlId, action) => 
  api.post(`/company/manage-scheduled-control-status/${controlId}/`, { action });
export const checkScheduledControlStatus = () => api.get("/company/manage-scheduled-control-status/");

// Water Readings (Past time)
export const getHourlyAverages = () => api.get("/hourly-averages/");
export const getLastHourAverage = () => api.get("/last-hour-average/");
export const getCriticalReadings = () => api.get("/critical-readings/");

// Commands
export const sendCommand = (data) => api.post("/send-command/", data);
export const getAllCommands = () => api.get("/all-commands/");
export const getProvinceCommandCount = () => api.get("/province-command-count/");

// Leakages
export const getAllLeaks = (province) => {
  return api.get("/all-leaks/", {
    params: { province }
  });
};

export const getRecentLeak = () => api.get("/recent-leak/");

export const getRecentLeakageProvince = (province) => {
  return api.get("/recent-leakage-province/", {
    params: { province }
  });
};

export const getInvestigatingLeaks = (province) => {
  return api.get("/investigating-leaks/", {
    params: { province }
  });
};

// Resolve a leakage
export const resolveLeakage = (data) => api.post("/resolved-leak/", data);

export default api;
