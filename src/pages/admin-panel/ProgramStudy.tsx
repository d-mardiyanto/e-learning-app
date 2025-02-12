import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid2';
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import Copyright from '../../components/dashboard/internals/components/Copyright';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { getProgramStudy } from "../../api/api_program_study";

interface ProgramStudy {
    id: number;
    program_name: string;
}

const columns: GridColDef<ProgramStudy>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'program_name',
        headerName: 'Program Name',
        flex: 1,
        editable: true,
    },
];

export default function ProgramStudy() {
    const [prody, setPrody] = useState<ProgramStudy[]>();
    const [formData, setFormData] = useState({
        name: "",
    });

    useEffect(() => {
        const fetchPrody = async () => {
            const data = await getProgramStudy();
            setPrody(data);
        }
        fetchPrody();
    }, [prody]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Manage Classes
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Add New Program Study
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                placeholder="Enter Program Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Add Program Study
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <DataGrid
                        rows={prody}
                        columns={columns}
                        sx={{ height: "calc(100vh - 100px)" }}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
