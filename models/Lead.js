// models/Lead.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");

const Lead = sequelize.define("Lead", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: "unclaimed", // unclaimed or claimed
  },
});

// Relationship: Lead belongs to User
Lead.belongsTo(User, { foreignKey: "claimedBy", as: "claimed_user" });

module.exports = Lead;
