// config/database.js
const { Sequelize } = require("sequelize");

// Create a new Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // The database file path
  logging: false, // Disable SQL query logging (optional)
});

// Function to connect and sync database
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
