// controllers/publicEnquiryController.js
const PublicEnquiry = require("../models/PublicEnquiry");

exports.createPublicEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required" });
    }

    const enquiry = await PublicEnquiry.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({ success: true, enquiry });
  } catch (error) {
    console.error("❌ Error creating enquiry:", error.message);
    console.error("🧠 Stack Trace:", error.stack);
    res
      .status(500)
      .json({ success: false, error: "Server error while creating enquiry" });
  }
};
