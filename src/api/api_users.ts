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

export const getUsers = async (): Promise<Users[]> => {
    const response = await apiClient.get<{users: Users[]}>("/api/user/show");
    return response.data.users;
};

// Get a single users by ID
export const getUserById = async (id: number): Promise<Users> => {
    const response = await apiClient.get<{users: Users}>(`/api/user/${id}`);
    return response.data.users;
};

// Create a new users
export const createUser = async (data: Users) => {
    const response = await apiClient.post("/api/user", data);
    return response.data.users;
};

// Update an users
export const updateUser = async (id: number, data: Users) => {
    const response = await apiClient.put(`/api/user/${id}`, data);
    return response.data.users;
};

// Delete an users
export const deleteUser = async (id: number) => {
    const response = await apiClient.delete(`/api/user/${id}`);
    return response.data.users;
};
