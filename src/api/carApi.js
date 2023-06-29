import axios from 'axios';

const API_BASE_URL = 'https://myfakeapi.com/api/cars';

export const fetchCars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.cars;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
