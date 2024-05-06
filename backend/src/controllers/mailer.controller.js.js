import { FrontendUrl } from "../config";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "helptechtalk12@gmail.com",
    pass: "mbgb uuwo eaqn hctw",
  },
});

export const sendEmail = async (emailOptions) => {
  try {
    const info = await transporter.sendMail(emailOptions);
    console.log(info.response);
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

export const sendResetPasswordEmail = async (email, resetToken) => {
  const emailOptions = {
    from: "helptechtalk12@gmail.com",
    to: email,
    subject: "Restore password",
    html: `<p>Click the following link to reset your password:</p>
           <a href="${FrontendUrl}/reset-password/${resetToken}">Restore password</a>`,
  };

  await sendEmail(emailOptions);
};
