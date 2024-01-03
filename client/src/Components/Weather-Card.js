import React from "react";
import "./WeatherCard.css"; // Import your CSS file

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card" key={data.city}>
      <h3>City: {data.city}</h3>
      <h4>Temperature: {data.temperature}C</h4>
    </div>
  );
};

export default WeatherCard;
