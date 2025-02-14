import apiClient from "./apiClient";

// Define Students type (optional)
interface Students {
    id: string;
    photo: string;
    name: string;
    religion: string;
    address: string;
    birthdate: string;
    birthplace: string;
    email: string;
    phone: string;
}
// Get all Students

export const getStudents = async (): Promise<Students[]> => {
    const response = await apiClient.get<{ students: Students[] }>("/api/student/show");
    return response.data.students;
};

// Get a single Students by ID
export const getStudentById = async (id: number): Promise<Students> => {
    const response = await apiClient.get<{ students: Students }>(`/api/student/${id}`);
    return response.data.students;
};

// Create a new Students
export const createStudent = async (data: Students) => {
    const response = await apiClient.post("/api/student", data);
    return response.data.students;
};

// Update an Students
export const updateStudent = async (id: number, data: Students) => {
    const response = await apiClient.put(`/api/student/${id}`, data);
    return response.data.students;
};

// Delete an Students
export const deleteStudent = async (id: number) => {
    const response = await apiClient.delete(`/api/student/${id}`);
    return response.data.students;
};
