import "./App.css";
import { Box, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentsTable from "./components/AppointmentsTable";
import { getAppointments } from "./api/api";

interface AppointmentTypes {
  id: number;
  patient_name: string;
  appointment_start_date: string;
  appointment_start_time: string;
  appointment_end_date: string;
  appointment_end_time: string;
  comments: string;
}

function App() {
  const [appointments, setAppointments] = useState<AppointmentTypes[]>([]);
  const [editAppointment, setEditAppointment] = useState<AppointmentTypes>();
  const [rows, setRows] = useState<AppointmentTypes[] | undefined>([]);
  const [editRowId, setEditRowId] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().getTime() + 86400000),
  );

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const handleDateFilter = () => {
      const currentDay = new Date(startDate.setHours(0, 0, 0, 0));
      if (appointments.length > 0) {
        const filteredAppointments = appointments.filter((appointment) => {
          const appointmentStartDate = new Date(
            appointment.appointment_start_date,
          );
          const appointmentEndDate = new Date(appointment.appointment_end_date);
          return (
            appointmentStartDate >= currentDay && appointmentEndDate <= endDate
          );
        });
        setRows(filteredAppointments);
      } else {
        setRows(undefined);
      }
    };
    handleDateFilter();
  }, [startDate, endDate, appointments]);

  useEffect(() => {
    const findRowId = () => {
      const row = rows?.find((row) => row.id === editRowId);
      if (row) {
        setEditAppointment(row);
      }
    };

    findRowId();
  }, [editRowId]);

  return (
    <Box className="app">
      <Box className="app-header">
        <img src="icon.svg" style={{ width: "60px", height: "60px" }} />
        <Typography variant="h3">Doctors' Appointments</Typography>
      </Box>
      <Typography variant="h5" sx={{ mb: "20px" }}>
        Book your appointment now!
      </Typography>
      <Box className="app-body">
        <Box className="app-box">
          <AppointmentsTable
            rows={rows}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setEditRowId={setEditRowId}
            fetchAppointments={fetchAppointments}
            editRowId={editRowId}
          />
        </Box>
        <Box className="app-box">
          <AppointmentForm
            editAppointment={editAppointment}
            fetchAppointments={fetchAppointments}
            setEditAppointment={setEditAppointment}
            appointments={appointments}
            setEditRowId={setEditRowId}
          />
        </Box>
      </Box>
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: "azure",
            color: "#000000",
            fontSize: "16px",
          },
        }}
      />
    </Box>
  );
}

export default App;
