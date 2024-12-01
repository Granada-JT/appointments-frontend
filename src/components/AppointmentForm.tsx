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
import { createAppointment, editAppointment as editAppointmentApi } from '../api/api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface AppointmentTypes {
  id: number;
  patient_name: string;
  appointment_start_date: Date;
  appointment_start_time: Date;
  appointment_end_date: Date;
  appointment_end_time: Date;
  comments: string;
}

interface AppointmentFormProps {
  editAppointment: AppointmentTypes | undefined;
  setEditAppointment: (appointment: AppointmentTypes | undefined) => void;
  fetchAppointments: () => void;
}

interface FormDataTypes {
  name: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  comments: string;
}

const AppointmentForm = (props: AppointmentFormProps) => {
  const [key, setKey] = useState<number>(0)
  const { editAppointment, setEditAppointment, fetchAppointments } = props;
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      startDateTime: new Date,
      endDateTime: new Date(new Date().getTime() + 60 * 60 * 1000),
      comments: ''
    }
  })

  useEffect(() => {
    if (editAppointment) {
      setValue('name', editAppointment.patient_name);
      setValue(
        'startDateTime', 
        new Date(`${editAppointment.appointment_start_date} ${editAppointment.appointment_start_time}`)
      );
      setValue(
        'endDateTime', 
        new Date(`${editAppointment.appointment_end_date} ${editAppointment.appointment_end_time}`)
      );
      setValue('comments', editAppointment.comments);
      setKey(prevKey => prevKey + 1)
    }
  }, [editAppointment]);

  const onSubmit = async (data: FormDataTypes) => {
    try {
      if (data && editAppointment) {
        const appointmentData = {
          patientName: data.name,
          appointmentStartDate: data.startDateTime?.toLocaleDateString(),
          appointmentStartTime: data.startDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          appointmentEndDate: data.endDateTime?.toLocaleDateString(),
          appointmentEndTime: data.endDateTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          comments: data.comments
        }

        const response = await editAppointmentApi(editAppointment.id,appointmentData);
        if (response.status === 200) {
          fetchAppointments();
          setEditAppointment(undefined);
          alert('Appointment Updated Successfully');
          reset();
          setKey(prevKey => prevKey + 1);
        }
      } else if (data) {
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
	
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "10px" }}>Appointment Form</Typography>
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
          <Typography sx={{ width: '230px' }} align="left">Start Date and Time:</Typography>
          <FormControl fullWidth>
            <Controller 
              name='startDateTime'
              control={control}
              rules={{
                required: true,
                validate: (value) => {
                  const currentTime = new Date();
                  currentTime.setMinutes(currentTime.getMinutes() - 1);
                  if (new Date(value) < currentTime) {
                    return 'Start date passed, please enter a valid date and time'
                  }
                }
              }}
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    key={key}
                    defaultValue={dayjs(value)}
                    onChange={(date) => { onChange(date?.toDate()); }}
                  />
                </LocalizationProvider>
              )}
            />
            {errors.startDateTime && (
              <FormHelperText 
                sx={{ color: 'error.main' }}
                id='validation-message'
              >
                {errors.startDateTime.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginY: "10px" }}>
          <Typography sx={{ width: '230px' }} align="left">End Date and Time:</Typography>
          <FormControl fullWidth>
            <Controller 
              name='endDateTime'
              control={control}
              rules={{
                required: true,
                validate: (value) => {
                  const startDate = getValues('startDateTime');
                  if (new Date(value) <= new Date(startDate)) {
                    return 'Please enter a valid date range';
                  }
                  return true;
                }
              }}
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    key={key}
                    defaultValue={dayjs(value)}
                    onChange={(date) => { onChange(date?.toDate()); }}
                  />
                </LocalizationProvider>
              )}
            />
            {errors.endDateTime && (
              <FormHelperText 
                sx={{ color: 'error.main' }}
                id='validation-message'
              >
                {errors.endDateTime.message}
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
        <Button type='submit' variant='contained'>{editAppointment ? "Update Appointment" : "Book Appointment"}</Button>
      </form>
    </Box>
  )
}

export default AppointmentForm;
