const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 4000,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email send successfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
