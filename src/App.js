import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'ca0752c9d3596b51b157ce0e4f2eed3a';

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div className="weather-container">
      <body>
      <h1 className="weather-heading">Weather App</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          placeholder="Enter location (e.g., London)"
          value={location}
          onChange={handleLocationChange}
          className="weather-input"
        />
        <button type="submit" className="weather-button">Get Weather</button>
      </form>
      {error && <p className="weather-error"> Enter Location Correctly</p>}
      {weatherData && (
        <div className="weather-data">
          <h2 className="weather-city">{weatherData.name}</h2>
          <p className="weather-temp">Temperature: {kelvinToCelsius(weatherData.main.temp)}°C</p>
          
          <p className="weather-description">Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      </body>
    </div>
  );
};

export default Weather;
