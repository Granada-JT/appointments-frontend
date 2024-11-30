import axios from 'axios';

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/`);
    return response.data;
  } catch(error) {
    console.error(error);
    throw new Error(error.response.data.error)
  }
}

export const createAppointment = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/appointment/create`, data);
    return {
      status: response.status,
      message: response.data.message
    };
  } catch(error) {
    console.error(error);
    throw new Error(error.response.data.error)
  }
}

export const editAppointment = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/edit`, data);
    return response.data;
  } catch(error) {
    console.error(error);
    return error.message
  }
}

export const deleteAppointment = async (data) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/delete`, data);
    return response.data;
  } catch(error) {
    console.error(error);
    return error.message
  }
}
