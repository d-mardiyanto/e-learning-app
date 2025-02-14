import apiClient from "./apiClient";

// Define Courses type (optional)
interface Courses {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    program_study: string;
    courses_rating: number;
}
// Get all Coursess
export const getCourses = async (): Promise<Courses[]> => {
    const response = await apiClient.get<{ courses: Courses[] }>("/api/courses/show");
    return response.data.courses;
};

// Get a single Courses by ID
export const getCoursesById = async (id: number): Promise<Courses> => {
    const response = await apiClient.get<{ courses: Courses }>(`/api/courses/${id}`);
    return response.data.courses;
};

// Create a new Courses
export const createCourses = async (data: Courses) => {
    const response = await apiClient.post("/api/courses", data);
    return response.data.courses;
};

// Update an Courses
export const updateCourses = async (id: number, data: Courses) => {
    const response = await apiClient.put(`/api/courses/${id}`, data);
    return response.data.courses;
};

// Delete an Courses
export const deleteCourses = async (id: number) => {
    const response = await apiClient.delete(`/api/courses/${id}`);
    return response.data.courses;
};
