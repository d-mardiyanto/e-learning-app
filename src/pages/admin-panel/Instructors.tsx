import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Avatar, Box, TextField, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Phone } from '@mui/icons-material';
import Copyright from '../../components/dashboard/internals/components/Copyright';
import { getInstructors } from '../../api/api_instructors';

interface Instructors {
    id: string;
    photo: string;
    name: string;
    profession: string;
    email: string;
    phone: string;
}

const InstructorsPage = () => {
    const [instructors, setInstructors] = useState<Instructors[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const fetchInstructors = async () => {
        try {
            const data = await getInstructors();
            setInstructors(data);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch students:", error);
        }
    }

    useEffect(() => {
        fetchInstructors();
    }, [instructors])

    
    const filteredInstructors = instructors.filter(
        (instructor) =>
            instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            instructor.profession.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);
    const displayedInstructors = filteredInstructors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Manage Instructor
            </Typography>
            <Button variant="contained" color="primary" size="small">
                Add Instructor
            </Button>
            <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to the first page on search
                }}
                sx={{ marginBottom: 2, marginTop: 2 }}
            />
            <Typography variant="subtitle2" color="text.secondary">
                Count : {instructors.length}
            </Typography>
            <Grid container spacing={1} sx={{ marginTop: 2 }}>
                {displayedInstructors.length > 0 ? (
                    displayedInstructors.map((instructor, index) => (
                        <Grid key={index}>
                            <Card
                                sx={{
                                    width: 378,
                                    height: 400,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    padding: 2,
                                }}
                            >
                                <Avatar
                                    src={instructor.photo}
                                    alt={instructor.name}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        margin: 'auto',
                                        marginBottom: 2,
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6">{instructor.name}</Typography>
                                    <Typography variant="body2" sx={{ marginTop: 1, marginBottom: 3, height: 30 }}>
                                        {instructor.profession}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: 1, marginTop: 1 }}>
                                        <Phone color="action" />
                                        <Typography sx={{ textAlign: 'left' }} variant="body2">{instructor.phone}</Typography>
                                    </Box>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button variant="outlined" color="success" size="small">
                                        Chat
                                    </Button>
                                    <Button variant="contained" color="primary" size="small">
                                        View Profile
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="text.secondary" sx={{ marginTop: 4 }}>
                        No matching profiles found.
                    </Typography>
                )}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
};

export default InstructorsPage;