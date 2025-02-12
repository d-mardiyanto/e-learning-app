import React, { useState, useEffect, useCallback } from "react";
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
import { createClasses,updateClasses,deleteClasses,getClasses } from "../../api/api_classes";

interface Classes {
    id: number;
    class_name: string;
}

const columns: GridColDef<Classes>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'class_name',
        headerName: 'Class Name',
        flex: 1,
        editable: true,
    },
];

export default function ClassPage() {
    const [classes, setClasses] = useState<Classes[]>();
    const [selectedClasses, setSelectedClasses] = useState<Classes | null>(null);
    const [formData, setFormData] = useState({
        id:0,
        class_name: "",
    });

    const [action,setAction]=useState("");

    const fetchClasses = useCallback(async () => {
        const data = await getClasses();
        setClasses(data);
    }, []); 

    useEffect(() => {    
        fetchClasses();
    }, [fetchClasses]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRowClick = (params:any) => {
        const xClass = classes?.find((s) => s.id === params.row.id);
        if (xClass) {
            setSelectedClasses(xClass);
            setFormData(xClass);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await createClasses(formData);
            console.log(data); // You can do something with the created data here
        } catch (error) {
            console.error("Error creating data:", error);
        }
    };

    const handleUpdate = async (e: React.FormEvent, id: number) => {
        e.preventDefault();
        try {
            const data = await updateClasses(id, formData);
            console.log(data); // You can do something with the updated data here
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const handleDelete = async (id:number) => {
        try {
            const response = await deleteClasses(id);
            console.log(response); // You can do something
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(action==="store"){
            handleCreate(e);
        }else if(action==="update"){
            handleUpdate(e,formData.id);
        }else if(action==="delete"){
            handleDelete(formData.id)
        }
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
                            Add New Class
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                placeholder="Enter Class Name"
                                name="class_name"
                                value={formData.class_name}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                required
                            />
                            {selectedClasses? (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        onClick={() => setAction("update")}
                                        sx={{ mt: 1 }}>
                                        Update
                                    </Button>
                                    <Button variant="contained" color="secondary"
                                        fullWidth
                                        type="submit"
                                        onClick={() => setAction("delete")}
                                        sx={{ mt: 1 }}>Delete
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        type="reset"
                                        sx={{ mt: 1 }}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button type="submit" fullWidth variant="outlined"
                                    onClick={() => setAction("store")}
                                    sx={{ mt: 1 }}>
                                    Submit
                                </Button>
                            )}
                        </form>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <DataGrid
                        rows={classes}
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
                        onRowClick={handleRowClick}
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
