import './App.css';
import { useEffect, useState } from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentsTable from './components/AppointmentsTable';
import { Box, Typography } from '@mui/material';
import { getAppointments } from './api/api';

interface AppointmentTypes {
  patient_name: string;
  appointment_start_date: Date;
  appointment_start_time: Date;
  appointment_end_date: Date;
  appointment_end_time: Date;
  comments: string;
}

function App() {
  const [appointments, setAppointments] = useState<AppointmentTypes[]>([])

  useEffect(() => {
    const fetchAppointments = async() => {
      try {
        const response = await getAppointments()
        setAppointments(response)
        
      } catch(error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      }
    }

    fetchAppointments()
  }, [])

  return (
    <Box className="app">
      <Box className="app-header">
        <Typography variant='h4' sx={{ mb: '20px' }}>
          Book An Appointment
        </Typography>
        <Box className="app-body">
          <Box className="app-box">
            <AppointmentsTable rows={appointments} />
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
