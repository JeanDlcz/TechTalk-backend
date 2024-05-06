import { Router } from "express";
import {
  createUser,
  getUsers,
  updateUserRole,
} from "../controllers/user.controller.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";
import {
  activateSubscription,
  unsubscribe,
  sendUnsubscribeLink,
} from "../controllers/subscription.controller.js";
const router = Router();

router.post("/", verifyToken, isAdmin, checkExistingUser, createUser);
router.get("/", getUsers);
router.post("/activate-subscription", activateSubscription);
router.post("/unsubscribe", unsubscribe);
router.post("/email-unsubscribe", sendUnsubscribeLink);
router.put("/update-role", verifyToken, isAdmin, updateUserRole);
export default router;
