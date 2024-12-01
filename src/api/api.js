import axios from "axios";

export const getAppointments = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/appointment/`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.error);
  }
};

export const createAppointment = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/appointment/create`,
      data,
    );
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.error);
  }
};

export const editAppointment = async (id, data) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/appointment/edit/${id}`,
      data,
    );
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.error);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/appointment/delete/${id}`,
    );
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.error);
  }
};
