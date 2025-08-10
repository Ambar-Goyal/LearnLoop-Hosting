const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("Missing required environment variables: MAIL_HOST, MAIL_USER, or MAIL_PASS");
    }
// transporter created using createTransport function here now 
 
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",// for using  gmail server here now 
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: parseInt(process.env.MAIL_PORT) === 465,
      auth: {
        user: process.env.MAIL_USER,//jis mail se mail jayegi 
        pass: process.env.MAIL_PASS,//app password 
      },
    });

// use sendmail function now here 

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
