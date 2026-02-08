const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/weather?city=Delhi
router.get("/", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({
        message: "City name is required",
      });
    }

    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch weather data",
      error: error.message,
    });
  }
});

module.exports = router;
