// controllers/enquiryController.js
const asyncHandler = require("express-async-handler");
const PublicEnquiry = require("../models/PublicEnquiry");

/**
 * 1️⃣ Public form submission (accessible without auth)
 */
exports.createPublicEnquiry = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }

  const enquiry = await PublicEnquiry.create({
    name,
    email,
    message,
    claimed: false,
    counselorId: null,
  });

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully",
    enquiry,
  });
});

/**
 * 2️⃣ Get all unclaimed enquiries (for employees to view available leads)
 */
exports.getPublicEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await PublicEnquiry.findAll({
    where: { claimed: false },
  });
  res.json({ success: true, enquiries });
});

/**
 * 3️⃣ Get private (claimed) enquiries for the logged-in employee
 */
exports.getPrivateEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await PublicEnquiry.findAll({
    where: { counselorId: req.user },
  });
  res.json({ success: true, enquiries });
});

/**
 * 4️⃣ Claim an unclaimed lead
 */
exports.claimLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const enquiry = await PublicEnquiry.findByPk(id);

  if (!enquiry) {
    res.status(404);
    throw new Error("Enquiry not found");
  }

  if (enquiry.claimed) {
    res.status(409);
    throw new Error("This lead has already been claimed");
  }

  enquiry.claimed = true;
  enquiry.counselorId = req.user;
  await enquiry.save();

  res.json({
    success: true,
    message: "Lead claimed successfully",
    enquiry,
  });
});
