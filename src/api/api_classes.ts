import apiClient from "./apiClient";

// Define Classes type (optional)
interface Classes {
    id: number;
    class_name: string;
}

// Get all Classess
export const getClasses = async (): Promise<Classes[]> => {
    const response = await apiClient.get<{ classes: Classes[] }>("/api/classes/show");
    return response.data.classes;
};

// Get a single Classes by ID
export const getClassesById = async (id: number): Promise<Classes> => {
    const response = await apiClient.get<{ classes: Classes }>(`/api/classes/${id}`);
    return response.data.classes;
};

// Create a new Classes
export const createClasses = async (data: Classes) => {
    const response = await apiClient.post("/api/classes", data);
    return response.data.classes;
};

// Update an Classes
export const updateClasses = async (id: number, data: Classes) => {
    const response = await apiClient.put(`/api/classes/${id}`, data);
    return response.data.classes;
};

// Delete an Classes
export const deleteClasses = async (id: number) => {
    const response = await apiClient.delete(`/api/classes/${id}`);
    return response.data.classes;
};
