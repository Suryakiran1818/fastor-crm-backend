// routes/publicEnquiryRoutes.js
const express = require("express");
const router = express.Router();
const { createPublicEnquiry } = require("../controllers/publicEnquiryController");

// ✅ POST route for public enquiries
router.post("/enquiry", createPublicEnquiry);

module.exports = router;
