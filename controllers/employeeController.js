// controllers/employeeController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await Employee.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Employee registered successfully",
      employee: { id: newEmployee.id, name: newEmployee.name, email: newEmployee.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
