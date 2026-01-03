// API Configuration - Using Render backend
const API_BASE_URL = 'https://crime-report-backend-t9qq.onrender.com';

// Wake up the Render backend on app load
if (typeof window !== 'undefined') {
  fetch(`${API_BASE_URL}/api/auth/profile`).catch(() => {
    console.log('Waking up backend...');
  });
}

console.log('Using API:', API_BASE_URL);
export default API_BASE_URL;
