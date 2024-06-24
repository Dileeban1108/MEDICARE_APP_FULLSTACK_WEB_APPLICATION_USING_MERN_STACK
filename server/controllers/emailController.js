const nodemailer = require("nodemailer");

const sendEmail = async (userEmail, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "dileebandileeban6@gmail.com",
        pass: "cgrj nuap bnsa rkny",
      },
      // TLS configuration (optional, adjust based on your needs)
      tls: {
        rejectUnauthorized: false, // Use only if necessary (e.g., self-signed certificates)
      },
    });

    let info = await transporter.sendMail({
      from: 'dileebandileeban6@gmail.com',
      to: userEmail,
      subject: "Regarding the appointment of the medical app",
      text: message, 
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

module.exports = { sendEmail };
