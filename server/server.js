
const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

mongoose.connect(process.env.ATLAS_URI);

const weatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  description: String,
});

const Weather = mongoose.model('Weather', weatherSchema);

app.get('/api/weather/:location', async (req, res) => {
  const location = req.params.location;
  try {
    const existingData = await Weather.findOne({ location });

    if (existingData) {
      res.json(existingData);
    } else {
      const apiKey = process.env.API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

      const response = await axios.get(apiUrl);
      
      const weatherData = {
        location,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      };

      const newWeather = new Weather(weatherData);
      await newWeather.save();

      res.json(weatherData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:error.response.data });
  }
});

app.get('/api/forecast/:location', async (req, res) => {
  try {
    const location = req.params.location;
    const apiKey = process.env.API_KEY; // Replace with your actual weather API key

    // Use the weather API (e.g., OpenWeatherMap) to fetch the forecast
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`);

    const forecastData = response.data.forecast.forecastday.map((day) => ({
      date: day.date,
      temperature: day.day.avgtemp_c,
      description: day.day.condition.text,
    }));

    res.json(forecastData);
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

