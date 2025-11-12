// config.js
const CONFIG = {
  API_BASE_URL:
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"    
      ? "http://localhost:3000" // ✅ your local backend
      : "https://ucs503p-202526odd-nullptr.onrender.com", // ✅ your deployed backend
};
