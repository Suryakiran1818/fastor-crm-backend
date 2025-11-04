// controllers/leadController.js
const { PublicEnquiry } = require("../models");

// Fetch all unclaimed leads (public enquiries)
const getUnclaimedLeads = async (req, res) => {
  try {
    const leads = await PublicEnquiry.findAll({
      where: { claimed: false },
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Error fetching unclaimed leads:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch leads claimed by the logged-in employee
const getMyLeads = async (req, res) => {
  try {
    const leads = await PublicEnquiry.findAll({
      where: { employeeId: req.user.id },
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error("Error fetching employee leads:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Claim a specific lead
const claimLead = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await PublicEnquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    if (enquiry.claimed) {
      return res
        .status(409)
        .json({ success: false, message: "Lead already claimed" });
    }

    enquiry.claimed = true;
    enquiry.employeeId = req.user.id;
    await enquiry.save();

    res.status(200).json({
      success: true,
      message: "Lead claimed successfully",
      lead: enquiry,
    });
  } catch (error) {
    console.error("Error claiming lead:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getUnclaimedLeads,
  getMyLeads,
  claimLead,
};
