const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/sendEmail", async (req, res) => {
  const { userEmail, message } = req.body;

  try {
    await emailController.sendEmail(userEmail, message);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;
