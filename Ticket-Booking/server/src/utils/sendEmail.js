const nodemailer = require("nodemailer");

const sendMailtoUser = async (mailData) => {
  const transportar = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transportar.sendMail(mailData);
};

const mailSend = async (email, name, password) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "MovieTicket Booking Website User Account Details",
      text: `Hello ${name},\n\nYour login details are:\nEmail Id: ${email}\nPassword: ${password}\n\nPlease keep your password secure and do not share it with anyone.\n\nIf you encounter any issues, feel free to reach out to our support team.\nYou can also update your password anytime in the account settings.\nStay tuned for exclusive offers and updates!\n\nThank you for using our ticket booking service.\n\nBest regards,\nMoiveTicket Booking Team`,
    };
    await sendMailtoUser(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  mailSend,
};
