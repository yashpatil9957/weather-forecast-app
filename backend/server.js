const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const weatherRoutes = require("./routes/weather");
app.use("/api/weather", weatherRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Weather API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
