// client/src/utils/forecastUtils.js
import axios from 'axios';

export const getWeatherForecast = async (location) => {
  const url = "http://localhost:5000"
  try {
    const forecastResponse = await axios.get(`${url}/api/forecast/${location}`);
    return forecastResponse.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
 
