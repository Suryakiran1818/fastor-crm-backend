// routes/leadRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUnclaimedLeads,
  getMyLeads,
  claimLead,
} = require("../controllers/leadController");

// ✅ Import the middleware properly
// (If your middleware exports verifyToken as a named export)
const { verifyToken } = require("../middlewares/authMiddleware");

// Apply JWT protection middleware to all routes under /api/leads
router.use(verifyToken);

// GET - Fetch all unclaimed leads
router.get("/unclaimed", getUnclaimedLeads);

// GET - Fetch all leads claimed by the logged-in employee
router.get("/my-leads", getMyLeads);

// PATCH - Claim a specific lead by ID
router.patch("/:id/claim", claimLead);

module.exports = router;
