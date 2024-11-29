import { Controller, useForm } from 'react-hook-form';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material';

interface FormDataTypes {
  name: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  comments: string;
}

const onSubmit = (data: FormDataTypes) => {
  alert('Appointment Successfully Booked')
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
