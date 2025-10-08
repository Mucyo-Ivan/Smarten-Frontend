import axios from "axios";

const API_BASE = "/api/company"; // Relative path via proxy

// Create Axios instance with credentials for authenticated requests
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies (accessToken, csrftoken)
});

// Create Axios instance for public endpoints
export const noAuthApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies
});

// Store CSRF token and its expiration
let csrfToken = null;
let csrfTokenExpires = null;
const CSRF_TOKEN_LIFETIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Fetch CSRF token from the backend
async function fetchCsrfToken() {
  try {
    const response = await noAuthApi.get('/get-csrf-token/');
    csrfToken = response.data.csrfToken;
    csrfTokenExpires = Date.now() + CSRF_TOKEN_LIFETIME; // Assume token is valid for 24 hours
    console.log('Fetched CSRF token:', csrfToken);
    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error.response?.data || error.message);
    throw error;
  }
}

// Ensure CSRF token is fetched and valid
async function ensureCsrfToken() {
  // Check if token exists and is not expired
  if (!csrfToken || !csrfTokenExpires || Date.now() >= csrfTokenExpires) {
    await fetchCsrfToken();
  }
  return csrfToken;
}

// Request interceptor to add CSRF token for non-safe methods
api.interceptors.request.use(
  async (config) => {
    const nonSafeMethods = ['post', 'put', 'delete', 'patch'];
    const url = config?.url || '';
    const isPublicEndpoint = /\/(refresh|login|register|logout|verify-email|validate-token|reset-password)\/?(\?.*)?$/.test(url);

    // Remove Authorization header for public endpoints
    if (isPublicEndpoint && config.headers.Authorization) {
      delete config.headers.Authorization;
    }

    // Add CSRF token for non-safe methods
    if (nonSafeMethods.includes(config.method.toLowerCase())) {
      try {
        const token = await ensureCsrfToken();
        config.headers['X-CSRFToken'] = token;
        console.log(`Added CSRF token to ${config.method.toUpperCase()} ${url}:`, token);
      } catch (error) {
        console.error('Failed to add CSRF token:', error);
        throw error;
      }
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

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

async function refreshAccessToken() {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = noAuthApi
      .post('/refresh/', {})
      .then(() => {
        // No tokens/user returned; cookies are set by backend
        localStorage.setItem('isAuthenticated', 'true');
        console.log('Token refresh successful');
        onRefreshed();
      })
      .catch((error) => {
        console.error('Error during token refresh:', error.response?.data || error.message);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        throw error;
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// Response interceptor for token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        console.log('Retrying original request after token refresh:', originalRequest.url);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    console.error(`API error for ${originalRequest.method?.toUpperCase()} ${originalRequest.url}:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Authentication
export const registerCompany = async (data) => {
  console.log("registerCompany payload:", data);
  try {
    const res = await noAuthApi.post('/register/', data);
    console.log('registerCompany response:', res.data);
    return res;
  } catch (error) {
    console.error('registerCompany error:', error.response?.data || error.message);
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
export const TotalEspPerProvince = () => api.get("/total-esp-per-province/");
export const TotalSensorPerProvince = () => api.get("/total-sensors-per-province/");
export const TotalSmartValvePerProvince = () => api.get("/total-smartvalve-per-province/");

export const TotalEspPerDistrict = (province) => {
  return api.get("/total-esp-per-district/", {
    params: { province },
  });
};

export const TotalSensorPerDistrict = (province) => {
  return api.get("/total-sensors-per-district/", {
    params: { province },
  });
};

export const TotalSmartValvePerDistrict = (province) => {
  return api.get("/total-smartvalve-per-district/", {
    params: { province },
  });
};

// Provinces
export const getSmartValveLocation = () => api.get("/SmartValveLocation/");
export const getSensorLocation = () => api.get("/SensorLocation/");

// Control
export const ScheduledControl = (data) => api.post("/scheduled-control/", data);
export const getTodayScheduledControls = () => api.get("/today-scheduled-controls/");
export const getFutureScheduledControls = () => api.get("/future-scheduled-controls/");
export const manageScheduledControlStatus = (controlId, action) =>
  api.post(`/manage-scheduled-control-status/${controlId}/`, { action });
export const checkScheduledControlStatus = () => api.get("/manage-scheduled-control-status/");

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
    params: { province },
  });
};

export const getRecentLeak = () => api.get("/recent-leak/");

export const getRecentLeakageProvince = (province) => {
  return api.get("/recent-leakage-province/", {
    params: { province },
  });
};

export const getInvestigatingLeaks = (province) => {
  return api.get("/investigating-leaks/", {
    params: { province },
  });
};

// Resolve a leakage
export const resolveLeakage = (data) => api.post("/resolved-leak/", data);

// Get total leakages per province for dashboard stats
export const getTotalLeakagesPerProvince = () => api.get("/total-leakages-province/");

// Get device count for dashboard
export const getDeviceCount = () => api.get("/device-count/");

// Forgot password function
export const forgotPassword = async (email) => {
  try {
    const response = await noAuthApi.post("/forgot-password/", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset password function
export const resetPassword = async (data) => {
  try {
    const response = await noAuthApi.post("/reset-password/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get leakage details by ID
export const getLeakageById = async (leakageId) => {
  try {
    const response = await api.post("/leakage-by-id/", { leakage_id: leakageId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;