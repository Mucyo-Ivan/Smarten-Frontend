import axios from "axios";

// const API_BASE = "http://127.0.0.1:8000/api/company"; // Update as needed
const API_BASE = "/api/company"; // relative path via proxy

// Create Axios instance with credentials
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies
});

// No-auth instance for public endpoints
export const noAuthApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies
});

// Single-flight refresh control
let isRefreshing = false;
let refreshPromise = null;
let pendingRequests = [];

function subscribeTokenRefresh(cb) {
  pendingRequests.push(cb);
}

function onRefreshed() {
  pendingRequests.forEach((cb) => cb());
  pendingRequests = [];
}

function refreshAccessToken() {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = noAuthApi.post('/refresh/', {})
      .then(() => {
        // No tokens/user returned; cookies are set by backend
        localStorage.setItem('isAuthenticated', 'true');
        onRefreshed();
      })
      .catch((error) => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        console.log("Error during token refresh:", error);
        throw error;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// Remove Authorization header; use cookies
api.interceptors.request.use((config) => {
  const url = config?.url || '';
  const isPublicEndpoint = /\/(refresh|login|register|logout|validate-token)\/?(\?.*)?$/.test(url);
  if (isPublicEndpoint && config.headers.Authorization) {
    delete config.headers.Authorization;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor for token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Authentication
export const registerCompany = async (data) => {
  console.log("registerCompany payload: ", data);
  try {
    const res = await noAuthApi.post('/register/', data);
    console.log('registerCompany response: ', res.data);
    return res;
  } catch (error) {
    console.error('registerCompany error', error.response?.data || error.message);
    throw error;
  }
};

export const verifyEmail = (data) => noAuthApi.post("/verify-email/", data);

export const loginCompany = async (data) => {
  console.log('loginCompany payload:', data);
  try {
    const response = await noAuthApi.post('/login/', data);
    console.log('loginCompany response:', response.data);
    return response;
  } catch (error) {
    console.error('loginCompany error:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  console.log('logoutUser: Sending POST /logout/');
  try {
    const response = await noAuthApi.post('/logout/', {});
    console.log('logoutUser response:', response.data);
    return response;
  } catch (error) {
    console.error('logoutUser error:', error.response?.data || error.message);
    throw error;
  }
};

export const refreshToken = async () => {
  console.log('refreshToken: Sending POST /refresh/');
  try {
    const response = await noAuthApi.post('/refresh/', {});
    console.log('refreshToken response:', response.data);
    return response;
  } catch (error) {
    console.error('refreshToken error:', error.response?.data || error.message);
    throw error;
  }
};

export const validateToken = async () => {
  console.log('validateToken: Sending GET /validate-token/');
  try {
    const response = await noAuthApi.get('/validate-token/');
    console.log('validateToken response:', response.data);
    return response;
  } catch (error) {
    console.error('validateToken error:', error.response?.data || error.message);
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

// Get total leakages per province for dashboard stats
export const getTotalLeakagesPerProvince = () => api.get("/total-leakages-province/");

// Get device count for dashboard
export const getDeviceCount = () => api.get("/device-count/");

export default api;
