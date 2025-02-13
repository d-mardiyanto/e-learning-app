import apiClient from "./apiClient";

// Define ProgramName type (optional)
interface ProgramName {
    id: string;
    class_name: string;
}

// Get all ProgramStudys
export const getProgramStudy = async (): Promise<ProgramName[]> => {
    const response = await apiClient.get<{ programname: ProgramName[] }>("/api/prody/show");
    return response.data.programname;
};

// Get a single ProgramStudy by ID
export const getProgramStudyById = async (id: number) => {
    const response = await apiClient.get<{programname: ProgramName[] }>(`/api/prody/${id}`);
    return response.data.programname;
};

// Create a new ProgramStudy
export const createProgramStudy = async (data: ProgramName) => {
    const response = await apiClient.post("/api/prody", data);
    return response.data.programname;
};

// Update an ProgramStudy
export const updateProgramStudy = async (id: number, data: ProgramName) => {
    const response = await apiClient.put(`/api/prody/${id}`, data);
    return response.data.programname;
};

// Delete an ProgramStudy
export const deleteProgramStudy = async (id: number) => {
    const response = await apiClient.delete(`/api/prody/${id}`);
    return response.data.programname;
};
