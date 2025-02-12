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
import { getUsers } from "../../api/api_users";

interface Users {
    id: number;
    email: string;
    username: string;
    name: string;
    role: string;
}

const columns: GridColDef<Users>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        editable: true,
    },
    {
        field: 'role',
        headerName: 'Role',
        flex: 1,
        editable: true,
    },
];

export default function UsersPage() {
    const [users, setUsers] = useState<Users[]>();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        }
        fetchUsers();
    }, [users]);

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
                Manage Users
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Add New Users
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                placeholder="Enter Name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                placeholder="Enter Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                placeholder="Enter Role"
                                name="role"
                                type="text"
                                value={formData.role}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                placeholder="Enter Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                Add Users
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <DataGrid
                        rows={users}
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
