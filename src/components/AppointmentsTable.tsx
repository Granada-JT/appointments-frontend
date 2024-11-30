import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const AppointmentsTable = () => {

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 120,
      renderCell: ({ row }: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.patientName}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointmentStartDate}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointmentEndDate}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointmentStartTime}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component='a'
              variant='body2'
              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
            >
              {row.appointmentEndTime}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    }
  ]

  const rows = [
    {
      id: 1,
      patientName: 'd',
      appointmentStartDate: '11/30/2024',
      appointmentStartTime: '03:34 PM',
      appointmentEndDate: '11/30/2024',
      appointmentEndTime: '04:34 PM',
      comments: ''
    },
    {
      id: 2,
      patientName: 'g',
      appointmentStartDate: '11/19/2024',
      appointmentStartTime: '03:34 PM',
      appointmentEndDate: '11/22/2024',
      appointmentEndTime: '04:34 PM',
      comments: ''
    }
  ]

  return (
    <DataGrid
      getRowId={(row: any) => row.id}
      rows={rows}
      columns={columns}
    />
  )

}

export default AppointmentsTable;
