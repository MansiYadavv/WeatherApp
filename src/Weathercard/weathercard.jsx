import React, { useState } from "react";
import "./weathercard.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      console.log("Fetched data:", data); // Debugging log

      if (!data || !data.current) throw new Error("Incomplete data");

      setWeather(data.current);
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          data-testid="city-input"
        />
        <button onClick={handleSearch} data-testid="search-button">
          Search
        </button>
      </div>

      {loading && <p data-testid="loading">Loading data...</p>}
      {error && <p data-testid="error">{error}</p>}

      {weather && (
        <div className="weather-cards" data-testid="weather-cards">
          <div className="card weather-card" data-testid="weather-card">
            <h3>Temperature</h3>
            <p>{weather.temp_c}°C</p>
          </div>
          <div className="card weather-card" data-testid="weather-card">
            <h3>Humidity</h3>
            <p>{weather.humidity}%</p>
          </div>
          <div className="card weather-card" data-testid="weather-card">
            <h3>Condition</h3>
            <p>{weather.condition.text}</p>
          </div>
          <div className="card weather-card" data-testid="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;