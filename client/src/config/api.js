// Centralized API Base URL configuration
const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    // Auto-fix common typo iwia -> iw1a if present in environment variable
    return envUrl.replace('workout-pro-iwia', 'workout-pro-iw1a');
  }
  // Production fallback to live Render server
  if (import.meta.env.PROD) {
    return 'https://workout-pro-iw1a.onrender.com/api';
  }
  return 'http://localhost:5000/api';
};

export const API_BASE = getApiBase();
export default API_BASE;
