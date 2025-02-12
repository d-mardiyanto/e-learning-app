import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Button, Typography, Avatar, Box, TextField, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Phone, LocationOn, EmailRounded } from '@mui/icons-material';
import Copyright from '../../components/dashboard/internals/components/Copyright';
import { getStudents } from "../../api/api_students";

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

const StudentsPage = () => {
    const [students, setStudents] = useState<Students[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch students:", error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [students])

    const filteredStd = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredStd.length / itemsPerPage);
    const displayedStd = filteredStd.slice(
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
                Manage Students
            </Typography>
            <Button variant="contained" color="primary" size="small">
                Add Students
            </Button>
            {/* <Button onClick={fetchStudents} className="mt-2" variant="contained" color="primary" size="small">
                Get Students
            </Button> */}
            <TextField
                fullWidth
                label="Search Student"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to the first page on search
                }}
                sx={{ marginBottom: 2, marginTop: 2 }}
            />
            <Typography variant="subtitle2" color="text.secondary">
                Count : {students.length}
            </Typography>
            <Grid container spacing={1} sx={{ marginTop: 2 }}>
                {displayedStd.length > 0 ? (
                    displayedStd.map((student, index) => (
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
                                    src={student.photo}
                                    alt={student.name}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        margin: 'auto',
                                        marginBottom: 2,
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6">{student.name}</Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {student.religion}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginTop: 1, marginBottom: 3, height: 30 }}>
                                        {student.birthdate}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', height: 30, gap: 1 }}>
                                        <LocationOn color="action" />
                                        <Typography sx={{ textAlign: 'left' }} variant="body2">
                                            {student.address.length > 15 ? `${student.address.substring(0, 20)}...` : student.address}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', height: 30, gap: 1 }}>
                                        <EmailRounded color="action" />
                                        <Typography sx={{ textAlign: 'left' }} variant="body2">{student.email}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: 1, marginTop: 1 }}>
                                        <Phone color="action" />
                                        <Typography sx={{ textAlign: 'left' }} variant="body2">{student.phone}</Typography>
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
export default StudentsPage;
