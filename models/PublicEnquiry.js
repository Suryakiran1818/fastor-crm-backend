// models/PublicEnquiry.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); // ✅ Correct import

const PublicEnquiry = sequelize.define("PublicEnquiry", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // Optional
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = PublicEnquiry;
