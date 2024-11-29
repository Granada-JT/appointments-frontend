import './App.css';
import AppointmentForm from './components/AppointmentForm';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <Box className="app">
      <Box className="app-header">
        <Typography variant='h4' sx={{ mb: '20px' }}>
          Book An Appointment
        </Typography>
        <Box className="app-body">
          <Box className="app-box">
            Info Box
          </Box>
          <Box className="app-box">
            <AppointmentForm />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
