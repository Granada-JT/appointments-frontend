import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toast, { Toaster } from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { deleteAppointment } from "../api/api";
import { useState } from "react";

interface AppointmentTypes {
  id: number;
  patient_name: string;
  appointment_start_date: string;
  appointment_start_time: string;
  appointment_end_date: string;
  appointment_end_time: string;
  comments: string;
}

interface AppointmentsTableProps {
  rows: AppointmentTypes[] | undefined;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  setEditRowId: (id: number) => void;
  fetchAppointments: () => void;
  editRowId: number;
}

const AppointmentsTable = (props: AppointmentsTableProps) => {
  const {
    rows,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setEditRowId,
    fetchAppointments,
    editRowId,
  } = props;

  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const handleDeleteAppointment = async (id: number) => {
    try {
      if (id) {
        const response = await deleteAppointment(id);
        if (response.status === 200) {
          fetchAppointments();
          toast.success("Appointment Deleted Successfully");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 120,
      renderCell: ({ row }: { row: AppointmentTypes }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              component="a"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              {row.patient_name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "appointmentStartDate",
      headerName: "Start Date",
      width: 115,
      renderCell: ({ row }: { row: AppointmentTypes }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              component="a"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              {row.appointment_start_date}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "appointmentEndDate",
      headerName: "End Date",
      width: 115,
      renderCell: ({ row }: { row: AppointmentTypes }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              component="a"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              {row.appointment_end_date}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "appointmentStartTime",
      headerName: "Start Time",
      width: 117,
      renderCell: ({ row }: { row: AppointmentTypes }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              component="a"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              {row.appointment_start_time}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "appointmentEndTime",
      headerName: "End Time",
      width: 115,
      renderCell: ({ row }: { row: AppointmentTypes }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              component="a"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              {row.appointment_end_time}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 150,
      renderCell: ({ row }: { row: AppointmentTypes }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              component="a"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
              }}
            >
              {row.comments}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }: { row: AppointmentTypes }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              height: "100%",
            }}
          >
            {editRowId === row.id ? (
              <Button variant="outlined" disabled sx={{ width: "100%" }}>
                Editing
              </Button>
            ) : deleteRowId === row.id ? (
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#999",
                    mt: "5px",
                    mb: "-12px",
                  }}
                >
                  Confirm Delete?
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="info"
                  onClick={() => handleDeleteAppointment(row.id)}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => setDeleteRowId(0)}
                  sx={{ ml: "5px" }}
                >
                  No
                </Button>
              </Box>
            ) : (
              <>
                <Button
                  color="info"
                  variant="contained"
                  onClick={() => setEditRowId(row.id)}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setDeleteRowId(row.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: "10px" }}>
        Appointments
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: "5px", my: "10px" }}
      >
        <Typography>From:</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs(startDate)}
            onChange={(date) => {
              if (date) {
                setStartDate(date.toDate());
              }
            }}
          />
        </LocalizationProvider>
        <Typography>To:</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={dayjs(endDate)}
            onChange={(date) => {
              if (date) {
                setEndDate(date.toDate());
              }
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ height: "400px" }}>
        <DataGrid
          getRowId={(row: AppointmentTypes) => row.id}
          rows={rows}
          columns={columns}
          disableColumnMenu={true}
        />
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
};

export default AppointmentsTable;
