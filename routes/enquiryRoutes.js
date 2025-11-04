// routes/enquiryRoutes.js
const express = require("express");
const router = express.Router();

const {
  createPublicEnquiry,
  getPublicEnquiries,
  getPrivateEnquiries,
  claimLead,
} = require("../controllers/enquiryController");

const authMiddleware = require("../middlewares/auth");

// Public route – clients submit enquiries (no auth)
router.post("/public", createPublicEnquiry);

// Protected routes – require JWT auth
router.get("/public", authMiddleware, getPublicEnquiries);
router.get("/private", authMiddleware, getPrivateEnquiries);
router.patch("/:id/claim", authMiddleware, claimLead);

module.exports = router;
