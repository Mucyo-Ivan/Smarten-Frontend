import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/company";

// Create Axios instance
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach accessToken if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => Promise.reject(error)
);


// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/company/refresh/', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken} = response.data;

        // Store new tokens
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login'; // Redirect to login
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
  console.log('logoutUser payload:', { refreshToken });
  try {
    const response = await api.post('/logout/', { refreshToken }, {
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
    const response = await api.post('/refresh/', { refreshToken });
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
