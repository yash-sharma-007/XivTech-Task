import React, { useState } from "react";
import WeatherCard from "./Weather-Card";

export const Mainpage = () => {
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    const cityInput = document.getElementById("cityname").value;
    const cities = cityInput.split(",").map((city) => city.trim());

    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/getweather`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cities: cities,
        }),
      });

      const data = await response.json();
      if(data.success){
        setWeatherData(data.data);
      }
      else{
        setWeatherData(null)
      }
      
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <div className="container">
        <label htmlFor="cityname">
          <h2> Enter City Names</h2>
          <textarea
            name="cityname"
            id="cityname"
            cols="60"
            rows="6"
            className="form-control"
            placeholder="Please Enter City name with comma separate"
          ></textarea>
        </label>
        <br />
        <button className="btn btn-secondary" onClick={getWeather}>Get Weather</button>
      </div>

      <div className="container">
      <br />
            <h2>Weather Results: {weatherData==null ? 0 : weatherData.length}</h2>
        {weatherData && (
          <div>
            <div className="weather-container">
              {weatherData.map((data) => (
                <WeatherCard key={data.city} data={data} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
