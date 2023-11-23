// client/src/components/WeatherApp.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styled from 'styled-components';
import { getWeatherIcon } from '../utils/weatherUtils';
import { getWeatherForecast } from '../utils/forecastUtils';
import { addToHistory } from '../utils/historyUtils';
import flagEmoji from 'country-flag-emoji-json';
import cities from 'cities.json';
import Loader from './Loader';
import Logo from '../assets/logo/logo.png'

// Styled Components
const Container = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  width:400px;
  max-height: auto;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow:hidden;
`;


const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;



const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
`;

const StyledImage = styled.img`
  margin-left: 5px;
  max-width: 100%;
  border-radius: 5px;
`;

const DataContainer = styled.div`
  margin-top: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: square;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 10px;
  }
`;
const ErrorText = styled.p`
 margin-bottom: 5px;
 text-transform: capitalize;
 color:red;
`
const ScrollContainer = styled.section`
  overflow-y: auto ;
  max-height: 300px;
`

const SelectContainer = styled.div`
  margin-bottom: 15px;
`;

const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps}>
    <img src={data.flag} width="20px" alt={label}/> {/* Using the flag emoji from the country-flag-emoji-json package */}
    <span style={{ marginLeft: '10px' }}>{label}</span>
  </div>
);

const CitySelectContainer = styled.div`
  margin-bottom: 15px;
`;

const CustomCityOption = ({ innerProps, label }) => (
  <div {...innerProps}>
    <span style={{ marginLeft: '10px' }}>{label}</span>
  </div>
);


function WeatherApp() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [locationNotFound,setLocationNotFound] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [weatherDataCity, setWeatherDataCity] = useState(null);
  const [weatherIconCity, setWeatherIconCity] = useState('');
  const [weatherForecastCity, setWeatherForecastCity] = useState([]);
  const [locationHistory, setLocationHistory] = useState([]);
  const [loading,isLoading] = useState(false);
  const url = "http://localhost:5000"

  const countryOptions = Object.keys(flagEmoji).map((countryCode) => ({
    value: flagEmoji[countryCode].name,
    label: flagEmoji[countryCode].name,
    flag: flagEmoji[countryCode].image,
    code: flagEmoji[countryCode].code,
  }));
  const cityOptions = cities.filter((city) => city.country === selectedCountry?.code).map((city) => ({
    value: city.name,
    label: city.name,
  }));
  const fetchWeather = async () => {
    isLoading(true)
    try {
      if (!selectedCountry) {
        setLocationNotFound('Please select a country');
        return;
      }

      const response = await axios.get(`${url}/api/weather/${selectedCountry.value}`);
      setWeatherData(response.data);
      setWeatherIcon(getWeatherIcon(response.data.description));

      const response2 = await axios.get(`${url}/api/weather/${selectedCity.label}`);
      setWeatherDataCity(response2.data);
      setWeatherIconCity(getWeatherIcon(response2.data.description));

      if (response.status >= 200 && response.status < 300) {
        isLoading(false)
      }

      const forecastData = await getWeatherForecast(selectedCountry.value);
      setWeatherForecast(forecastData);

      const forecastDataCity = await getWeatherForecast(selectedCity.label);
      setWeatherForecastCity(forecastDataCity);

      setLocationHistory((prevHistory) => addToHistory(`${selectedCity.label}, ${selectedCountry.value}`, prevHistory));
      setLocationNotFound('');
    } catch (error) {
      setLocationNotFound(error.response?.data?.error?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    // Reset city selection when country changes
    setSelectedCity(null);
  }, [selectedCountry]);

  return (
    <Container>
        <img src={Logo} alt='logo'/>
        <Title>Weather App</Title>

        
          <div style={{display:"block"}}>
          {locationNotFound && <ErrorText>{locationNotFound}</ErrorText>}
          <SelectContainer>
              <Select
                options={countryOptions}
                value={selectedCountry}
                onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                components={{ Option: CustomOption }}
              />
           </SelectContainer>
           <CitySelectContainer>
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={(selectedOption) => setSelectedCity(selectedOption)}
            components={{ Option: CustomCityOption }}
            isDisabled={!selectedCountry}
          />
        </CitySelectContainer>
            <div style={{display:"flex"}}>
            <Button onClick={fetchWeather} disabled={loading}>Get Weather</Button>
            <Loader isLoading={loading}/>
            </div>
            
            <ScrollContainer>
            {weatherData && (
              <DataContainer>
              {weatherIcon && <StyledImage src={weatherIcon} alt="Weather Icon" />}
                <h2>{weatherData.location}</h2>
                <p>Temperature: {weatherData.temperature}°C</p>
                <p>Description: {weatherData.description}</p>
              </DataContainer>
            )}

            {weatherDataCity && (
              <DataContainer>
              {weatherIconCity && <StyledImage src={weatherIconCity} alt="Weather Icon" />}
                <h2>{weatherDataCity.location}</h2>
                <p>Temperature: {weatherDataCity.temperature}°C</p>
                <p>Description: {weatherDataCity.description}</p>
              </DataContainer>
            )}

            {weatherForecast.length > 0 && (
              <DataContainer>
                <h3>5-Day Forecast</h3>
                <ul>
                  {weatherForecast.map((day) => (
                    <li key={day.date}>
                      <p>{day.date}</p>
                      <p>Temperature: {day.temperature}°C</p>
                      <p>Description: {day.description}</p>
                    </li>
                  ))}
                </ul>
              </DataContainer>
            )}

            {weatherForecastCity.length > 0 && (
              <DataContainer>
                <h3>5-Day Forecast</h3>
                <ul>
                  {weatherForecastCity.map((day) => (
                    <li key={day.date}>
                      <p>{day.date}</p>
                      <p>Temperature: {day.temperature}°C</p>
                      <p>Description: {day.description}</p>
                    </li>
                  ))}
                </ul>
              </DataContainer>
            )}

            {locationHistory.length > 0 && (
              <DataContainer>
                <h3>Location History</h3>
                <ul>
                  {locationHistory.map((loc, index) => (
                    <li key={index}>{loc}</li>
                  ))}
                </ul>
              </DataContainer>
            )}
            </ScrollContainer>
           

          </div>
        
     
    </Container>
  );

}

export default WeatherApp;
