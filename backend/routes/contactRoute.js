const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or use your SMTP provider
      auth: {
        user: "bheemaraju.abhiram03@gmail.com", // Your email
        pass: "fbrb pfeb rlzk tqye", // Use App Password if Gmail
      },
    });

    // Email details
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "bheemaraju.abhiram03@gmail.com", // Receiver (your email)
      subject: "New Contact Form Message",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ message: "❌ Failed to send message. Try again later." });
  }
});

module.exports = router;
