import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/company";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const registerCompany = (data) => api.post("/register/", data);
export const loginCompany = (data) => api.post("/login/", data);
export const verifyEmail = (data) => api.post("/verify-email/", data);

// ESP
export const registerEsp = (data) => api.post("/register-esp/", data);

// Provinces
export const getSmartValveLocation = () => api.get("/SmartValveLocation/");
export const getSensorLocation = () => api.get("/SensorLocation/");

// Control
export const ScheduledControl = (data) => api.post("/scheduled-control/",data);
export const getTodayScheduledControls = () => api.get("/today-scheduled-controls/");

// Water Readings (Past time)
export const getHourlyAverages = () => api.get("/hourly-averages/");
export const getLastHourAverage = () => api.get("/last-hour-average/");
export const getCriticalReadings = () => api.get("/critical-readings/");

// Commands
export const sendCommand = (data) => api.post("/send-command/", data);
export const getAllCommands = () => api.get("/all-commands/");
export const getProvinceCommandCount = () => api.get("/province-command-count/");

// Leakages
export const getAllLeaks = () => api.get("/all-leaks/");

export default api;
