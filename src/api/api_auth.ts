import apiClient from "./apiClient";


export const login = async (email: string, password: string) => {
    const response = await apiClient.post("/api/auth/login", { email, password });

    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};