const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, subject, htmlBody) => {
  try {
    const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

    console.log("🔧 SendGrid Config:", { 
      MAIL_HOST, 
      MAIL_PORT, 
      MAIL_USER, 
      MAIL_PASS_LENGTH: MAIL_PASS?.length 
    });

    if (!MAIL_HOST || !MAIL_USER || !MAIL_PASS) {
      throw new Error("Missing MAIL_HOST, MAIL_USER, or MAIL_PASS in .env");
    }

    console.log("📧 Creating SendGrid transporter...");

    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: parseInt(MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
      // ADD THESE LINES:
      connectionTimeout: 30000, // 30 seconds timeout
      socketTimeout: 30000,     // 30 seconds timeout
      greetingTimeout: 30000,   // 30 seconds timeout
    });

    const fromEmail = "ambargoyal3@gmail.com";

    const info = await transporter.sendMail({
      from: `"LearnLoop | AMBAR" <${fromEmail}>`,
      to: email,
      subject: subject,
      html: htmlBody,
    });

    console.log("✅ Email sent successfully via SendGrid");
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    return err.message;
  }
};

module.exports = mailSender;