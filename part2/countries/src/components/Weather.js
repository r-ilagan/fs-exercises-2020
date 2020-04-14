import React, { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config();

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;

  const getWeather = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        const countryWeather = response.data;
        setWeather(countryWeather);
      });
  };

  useEffect(getWeather, [capital]);
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>
        <b>temperature: </b>
        {weather.current?.temperature} Celsius
      </p>
      <img src={weather.current?.weather_icons} alt="weather icon" />
      <p>
        <b>wind:</b> {weather.current?.wind_speed} mph direction{' '}
        {weather.current?.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
