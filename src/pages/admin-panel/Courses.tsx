"use client"
import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Avatar,
    Link,
    TextField,
    Pagination
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Copyright from '../../components/dashboard/internals/components/Copyright';
import { getCourses } from '../../api/api_courses';


interface Courses {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    program_study: string;
    courses_rating: number;
}


export default function Courses() {
    const [courses, setCourses] = useState<Courses[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    useEffect(() => {    
        fetchCourses();
    }, [courses]);

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    }

    const filteredTasks = courses.filter(
        (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const displayedTasks = filteredTasks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setCurrentPage(value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Manage Courses
            </Typography>
            <Box>
                {/* Task Cards */}
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
                <Typography sx={{ marginBottom: 2 }} variant="subtitle2" color="text.secondary">
                    Count : {courses.length}
                </Typography>
                <Grid container spacing={2}>
                    {displayedTasks.length > 0 ? (
                        displayedTasks.map((task, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Link href={`/admin-panel/page/courses/manage/${task.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar src={task.thumbnail} />
                                        <Box>
                                            <Typography variant="body1">{task.title}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {task.description.length > 20 ? `${task.description.substring(0, 20)}...` : task.description}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Link>
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
            </Box>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
