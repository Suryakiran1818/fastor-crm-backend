// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Fallback: set default JWT secret if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "my_default_secret_key"; // safe fallback
  console.log("⚠️  JWT_SECRET not found in .env, using default secret key");
}

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Fastor CRM Backend is running successfully!");
});

// Route Imports
const employeeRoutes = require("./routes/employeeRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const leadRoutes = require("./routes/leadRoutes");

// Use Routes
app.use("/api/employees", employeeRoutes); // Register/Login
app.use("/api/enquiries", enquiryRoutes);   // Public Form Submission
app.use("/api/leads", leadRoutes);          // Lead Management (Unclaimed/MyLeads/Claim)

// Global Error Handler (must be after routes)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Database Sync + Server Start
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database connected and models synchronized");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
