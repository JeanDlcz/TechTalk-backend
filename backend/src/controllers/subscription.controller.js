import { FrontendUrl } from "../config";
import User from "../models/User";
import nodemailer from "nodemailer";

export const activateSubscription = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "This email does not exist in our database." });
    }

    if (user.subscription) {
      return res.status(202).json({ message: "User is already subscribed." });
    }

    user.subscription = true;

    await user.save();

    return res
      .status(200)
      .json({ message: "Subscription activated successfully." });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while processing the request.",
      errorMessage: error.message,
    });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not Found." });
    }

    if (!user.subscription) {
      return res.status(202).json({ message: "User is already unsubscribed." });
    }

    user.subscription = false;
    await user.save();

    return res.status(200).json({ message: "Successful unsubscription." });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while processing the request.",
      errorMessage: error.message,
    });
  }
};

export const sendUnsubscribeLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "This email does not exist in our database." });
    }

    if (!user.subscription) {
      return res.status(202).json({ message: "User is already unsubscribed." });
    }

    const unsubscribeLink = `${FrontendUrl}/confirm-unsubscribe?email=${email}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "helptechtalk12@gmail.com",
        pass: "mbgb uuwo eaqn hctw",
      },
    });

    const mailOptions = {
      from: ' "unsubscribe to" <helptechtalk12@gmail.com>',
      to: email,
      subject: "Unsubscribe Confirmation",
      html: `
      <body>
      <p style="font-size: 16px; color: #333;">Click the following link to unsubscribe:</p>
      <a href="${unsubscribeLink}" style="display: inline-block; padding: 10px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">Unsubscribe Now</a>
      <p style="font-size: 14px; color: #666;">Please note that unsubscribing will stop receiving further notifications and you will be boring.</p>
      <img src="https://global-uploads.webflow.com/605826c62e8de87de744596e/62e21a5ed89f8f4e401d6b9d_80162de165890734983661ba.jpg" alt="Description" style="width: 100%; max-width: 600px; height: auto;">
    </body>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Unsubscribe link sent. Check your email for confirmation.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while processing the request.",
      errorMessage: error.message,
    });
  }
};
