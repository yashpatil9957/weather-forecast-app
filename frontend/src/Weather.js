import { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `http://localhost:5000/api/weather?city=${city}`
      );

      setWeather(res.data);
    } catch (err) {
      setError("City not found or server error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>

          <p>🌡️ {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          <p>☁️ {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
