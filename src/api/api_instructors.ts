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
export const getInstructors = async (): Promise<Instructors[]> => {
    const response = await apiClient.get<{ instructors: Instructors[] }>("/api/instructor/show");
    return response.data.instructors;
};

// Get a single instructor by ID
export const getInstructorById = async (id: number): Promise<Instructors> => {
    const response = await apiClient.get<{ instructors: Instructors }>(`/api/instructor/${id}`);
    return response.data.instructors;
};

// Create a new instructor
export const createInstructor = async (data: Instructors) => {
    const response = await apiClient.post("/api/instructor", data);
    return response.data.instructors;
};

// Update an instructor
export const updateInstructor = async (id: number, data: Instructors) => {
    const response = await apiClient.put(`/api/instructor/${id}`, data);
    return response.data.instructors;
};

// Delete an instructor
export const deleteInstructor = async (id: number) => {
    const response = await apiClient.delete(`/api/instructor/${id}`);
    return response.data.instructors;
};
