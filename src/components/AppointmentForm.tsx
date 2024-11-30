import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material';
import { createAppointment } from '../api/api';
import dayjs from 'dayjs';

interface FormDataTypes {
  name: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  comments: string;
}

const onSubmit = async (data: FormDataTypes) => {
  try {
    if (data) {
      const appointmentData = {
        patientName: data.name,
        appointmentStartDate: data.startDateTime?.toLocaleDateString(),
        appointmentStartTime: data.startDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        appointmentEndDate: data.endDateTime?.toLocaleDateString(),
        appointmentEndTime: data.endDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        comments: data.comments
      }

      const response = await createAppointment(appointmentData);
      if (response.status === 201) {
        alert('Appointment Booked Successfully');
      }
    }
  } catch(error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

const AppointmentForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    defaultValues: {
    name: '',
    startDateTime: new Date,
    endDateTime: new Date(new Date().getTime() + 60 * 60 * 1000),
    comments: ''
    }
  })
	
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <Controller 
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange }}) => (
            <TextField 
              type='text'
              label='Name'
              variant='filled'
              color='info'
              value={value}
              onChange={(e) => {
                onChange(e)
                setValue('name', e.target.value)
              }}
              error={Boolean(errors.name)}
              fullWidth={true}
            />
          )}
        />
        {errors.name && (
          <FormHelperText 
            sx={{ color: 'error.main' }}
            id='validation-message'
          >
          This field is required
          </FormHelperText>
        )}
      </FormControl>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <Typography sx={{ width: '230px'}} align="left">Start Date and Time:</Typography>
        <FormControl fullWidth>
          <Controller 
            name='startDateTime'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }}) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  defaultValue={dayjs(value)}
                  onChange={(date) => {onChange(date?.toDate())}}
                />
              </LocalizationProvider>
            )}
          />
          {errors.startDateTime && (
            <FormHelperText 
              sx={{ color: 'error.main' }}
              id='validation-message'
            >
            This field is required
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginY: "10px" }}>
        <Typography sx={{ width: '230px'}} align="left">End Date and Time:</Typography>
        <FormControl fullWidth>
          <Controller 
            name='endDateTime'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange }}) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                  defaultValue={dayjs(value)}
                  onChange={(date) => {onChange(date?.toDate())}}
                />
              </LocalizationProvider>
            )}
          />
          {errors.endDateTime && (
            <FormHelperText 
              sx={{ color: 'error.main' }}
              id='validation-message'
            >
            This field is required
            </FormHelperText>
          )}
        </FormControl>
      </Box>
      <FormControl fullWidth>
        <Controller 
          name='comments'
          control={control}
          rules={{ required: false }}
          render={({ field: { value, onChange }}) => (
            <TextField 
              type='text'
              label='Comments'
              variant='outlined'
              multiline
              rows={5}
              color='info'
              value={value}
              onChange={(e) => {
                onChange(e)
                setValue('comments', e.target.value)
              }}
              error={Boolean(errors.comments)}
              fullWidth={true}
            />
          )}
        />
        {errors.comments && (
          <FormHelperText 
            sx={{ color: 'error.main' }}
            id='validation-message'
          >
          This field is required
          </FormHelperText>
        )}
      </FormControl>
      <Button type='submit' variant='contained'>Submit</Button>
    </form>
  )
}

export default AppointmentForm;