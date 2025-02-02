import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
    },
});

// Automatically attach Bearer token if available
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Assume token is stored in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
