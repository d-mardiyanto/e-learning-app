import apiClient from "./apiClient";

// Define ProgramStudy type (optional)
interface ProgramStudy {
    id: string;
    class_name: string;
}

// Get all ProgramStudys
export const getProgramStudy = async () => {
    const response = await apiClient.get("/api/prody/show");
    return response.data.programStudy;
};

// Get a single ProgramStudy by ID
export const getProgramStudyById = async (id: number) => {
    const response = await apiClient.get(`/api/prody/${id}`);
    return response.data.programStudy;
};

// Create a new ProgramStudy
export const createProgramStudy = async (data: ProgramStudy) => {
    const response = await apiClient.post("/api/prody", data);
    return response.data.programStudy;
};

// Update an ProgramStudy
export const updateProgramStudy = async (id: number, data: ProgramStudy) => {
    const response = await apiClient.put(`/api/prody/${id}`, data);
    return response.data.programStudy;
};

// Delete an ProgramStudy
export const deleteProgramStudy = async (id: number) => {
    const response = await apiClient.delete(`/api/prody/${id}`);
    return response.data.programStudy;
};
