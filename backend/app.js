require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeRoutes = require("./src/routes/employeeRoutes");

const app = express();
const port = process.env.PORT;
console.log('======>', port)

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", employeeRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
