import { Router } from "express";
import {
  forgotPasswordHandler,
  resetPasswordHandler,
  signinHandler,
  signupHandler,
} from "../controllers/auth.controller.js";
import {
  checkExistingRole,
  checkExistingUser,
} from "../middlewares/verifySignup.js";
import User from "../models/User.js";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    " Origin, Content-Type, Accept, Authorization"
  );
  next();
});

router.post("/signup", [checkExistingUser, checkExistingRole], signupHandler);

router.post("/signin", signinHandler);
router.post("/forgot-password", forgotPasswordHandler);
router.post("/reset-password", resetPasswordHandler);

router.get("/signin", async (req, res) => {
  const { userId } = req.body;

  try {
    // Search user by ID using Mongoose
    const user = await User.findById(userId);

    if (user) {
      return res.json({ error: user });
    }

    // Send the response with the user's data
    res.json({
      id: user,
      name: user.username,
      role: user.roles,
    });
  } catch (error) {}
});

export default router;
