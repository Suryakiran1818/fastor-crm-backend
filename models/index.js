// models/index.js
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Sequelize instance using .env configuration
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage: process.env.DB_STORAGE || "./database.sqlite",
  logging: false, // set true if you want to see SQL logs
});

// Function to test and sync database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    await sequelize.sync();
    console.log("✅ Database tables synced successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

module.exports = { sequelize, connectDB };
