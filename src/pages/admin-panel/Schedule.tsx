import {
    Box,
    Paper,
    Typography,
    LinearProgress,
    Avatar,
    Chip,
    Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Copyright from '../../components/dashboard/internals/components/Copyright';

const tasks = [
    { id: 'A', title: 'Lorem Ipsum', progress: 55, color: '#4caf50' },
    { id: 'B', title: 'Ipsum Dolor', progress: 80, color: '#f06292' },
    { id: 'C', title: 'Dolor Sit', progress: 65, color: '#2196f3' },
    { id: 'D', title: 'Sit Amet', progress: 75, color: '#ffb74d' },
];

const categories = ['Draft', 'In Progress', 'Editing', 'Done'];

const days = ['28', '29', '30', '31', '01', '02', '03', '04', '05', '06'];

export default function Schedule() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Schedule Management
            </Typography>
            {/* Calendar Timeline */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Calendar
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        overflowX: 'auto',
                        gap: 2,
                        pb: 1,
                        borderBottom: '1px solid #e0e0e0',
                    }}
                >
                    {days.map((day, index) => (
                        <Box key={index} sx={{ textAlign: 'center', minWidth: 50 }}>
                            <Typography variant="body2" color="textSecondary">
                                {day}
                            </Typography>
                            <Divider sx={{ my: 1, bgcolor: '#e0e0e0' }} />
                        </Box>
                    ))}
                </Box>
            </Paper>

            {/* Task Cards */}
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={task.id}>
                        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: task.color }}>{task.id}</Avatar>
                            <Box>
                                <Typography variant="body1">{task.title}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Task details here
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Timeline */}
            <Box sx={{ mt: 4, mb: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Timeline
                    </Typography>
                    {tasks.map((task) => (
                        <Box
                            key={task.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                my: 2,
                            }}
                        >
                            <Chip label={task.title} sx={{ bgcolor: task.color, color: '#fff' }} />
                            <LinearProgress
                                variant="determinate"
                                value={task.progress}
                                sx={{
                                    flexGrow: 1,
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: '#e0e0e0',
                                }}
                            />
                            <Typography variant="body2">{task.progress}%</Typography>
                        </Box>
                    ))}
                </Paper>
            </Box>

            {/* Categorized Tasks */}
            <Grid container spacing={2}>
                {categories.map((category, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {category}
                            </Typography>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Task example 1
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Task example 2
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}
