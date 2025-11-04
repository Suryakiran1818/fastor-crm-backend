// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Employee Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await Employee.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, employee });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Employee Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ where: { email } });

    if (!employee)
      return res.status(400).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, employee.password);
    if (!valid)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: employee.id, email: employee.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
