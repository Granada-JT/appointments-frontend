import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

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
      comments: 'Nonumy est vero feugait erat euismod labore veniam magna dignissim et vulputate esse vel nonumy et sed et stet. Ipsum iriure rebum nibh diam eirmod nisl. Accusam invidunt accusam et sit soluta amet invidunt. Justo sanctus est et sea velit gubergren duis clita kasd rebum sanctus ipsum sadipscing ullamcorper sit. Et sanctus in dolore vel tation. Tincidunt ipsum sea ex aliquip eos tempor adipiscing consequat dolore sea kasd tation dolor nostrud gubergren tempor duo ea. Hendrerit sit duo aliquyam eu eirmod illum justo lobortis dolor dolor suscipit. Dolore et ea sed erat takimata et et ipsum ipsum et ut. Esse duo nulla justo ut vel volutpat et nobis sadipscing tempor diam accusam volutpat. Amet sed diam vero. Sit laoreet justo takimata ea. Gubergren sadipscing blandit elitr dolore.'
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
