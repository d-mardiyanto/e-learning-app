import apiClient from "./apiClient";

// Define users type (optional)
interface Users {
    id: number;
    email:string;
    username:string;
    name:string;
    role:string;
}
// Get all users

export const getUsers = async () => {
    const response = await apiClient.get("/api/user/show");
    return response.data.users;
};

// Get a single users by ID
export const getUserById = async (id: number) => {
    const response = await apiClient.get(`/api/user/${id}`);
    return response.data;
};

// Create a new users
export const createUser = async (data: Users) => {
    const response = await apiClient.post("/api/user", data);
    return response.data;
};

// Update an users
export const updateUser = async (id: number, data: Users) => {
    const response = await apiClient.put(`/api/user/${id}`, data);
    return response.data;
};

// Delete an users
export const deleteUser = async (id: number) => {
    const response = await apiClient.delete(`/api/user/${id}`);
    return response.data;
};
