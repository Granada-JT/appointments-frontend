import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface AppointmentTypes {
  patient_name: string;
  appointment_start_date: Date;
  appointment_start_time: Date;
  appointment_end_date: Date;
  appointment_end_time: Date;
  comments: string;
}

interface AppointmentsTableProps {
  rows: AppointmentTypes[]
}

const AppointmentsTable = (props: AppointmentsTableProps) => {
  const { rows } = props;
  const [startDate, setStartDate] = useState<Date>(new Date);
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().getTime() + 86400000));

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 120,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.patient_name}
            </Typography>
          </Box>
        );
      }
    },
    { 
      field: 'appointmentStartDate', 
      headerName: 'Start Date', 
      width: 90,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointment_start_date}
            </Typography>
          </Box>
        );
      }
    },
    { 
      field: 'appointmentEndDate', 
      headerName: 'End Date', 
      width: 90,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointment_end_date}
            </Typography>
          </Box>
        );
      }
    },
    { 
      field: 'appointmentStartTime', 
      headerName: 'Start Time', 
      width: 90,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointment_start_time}
            </Typography>
          </Box>
        );
      }
    },
    { 
      field: 'appointmentEndTime', 
      headerName: 'End Time', 
      width: 90,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointment_end_time}
            </Typography>
          </Box>
        );
      }
    },
    { 
      field: 'comments', 
      headerName: 'Comments', 
      width: 150,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.comments}
            </Typography>
          </Box>
        );
      }
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 150,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', height: '100%' }}>
            <Button color="info" variant="contained">Edit</Button>
            <Button color="error" variant="contained">Delete</Button>
          </Box>
        );
      }
    }
  ]

  return (
    <Box sx={{ width: "100%" }}>
      <Typography>Filter By Date</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px", my: "10px" }}>
        <Typography>From:</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
          defaultValue={dayjs(startDate)}
          onChange={(date) => {
            if (date) {
              setStartDate(date.toDate())
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
              setEndDate(date.toDate())
            }
          }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ height: "400px"}}>
        <DataGrid
          getRowId={(row: any) => row.id}
          rows={rows}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default AppointmentsTable;
