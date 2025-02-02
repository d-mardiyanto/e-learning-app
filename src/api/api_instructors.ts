import apiClient from "./apiClient";

// Define Instructor type (optional)
interface Instructors {
    id: string;
    photo: string;
    name: string;
    profession: string;
    email: string;
    phone: string;
}

// Get all instructors
export const getInstructors = async () => {
    const response = await apiClient.get("/api/instructor/show");
    return response.data.instructors;
};

// Get a single instructor by ID
export const getInstructorById = async (id: number) => {
    const response = await apiClient.get(`/api/instructor/${id}`);
    return response.data;
};

// Create a new instructor
export const createInstructor = async (data: Instructors) => {
    const response = await apiClient.post("/instructor", data);
    return response.data;
};

// Update an instructor
export const updateInstructor = async (id: number, data: Instructors) => {
    const response = await apiClient.put(`/instructor/${id}`, data);
    return response.data;
};

// Delete an instructor
export const deleteInstructor = async (id: number) => {
    const response = await apiClient.delete(`/instructor/${id}`);
    return response.data;
};
