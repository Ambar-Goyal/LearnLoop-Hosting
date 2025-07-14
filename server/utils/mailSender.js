const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("Missing required environment variables: MAIL_HOST, MAIL_USER, or MAIL_PASS");
    }

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: parseInt(process.env.MAIL_PORT) === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

let info = await transporter.sendMail({
  from: `"LearnLoop | AMBAR" <${process.env.MAIL_USER}>`,
  to: email,
  subject: title,
  html: body,
});

    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return error.message;
  }
};

module.exports = mailSender;
