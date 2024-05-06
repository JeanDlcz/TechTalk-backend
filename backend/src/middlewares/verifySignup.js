import User from "../models/User.js";
import { ROLES } from "../models/Role.js";

export const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ username: req.body.username });
    if (userFound)
      return res.status(400).json({ message: "The username already exists" });

    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "The email already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkExistingRole = (req, res, next) => {
  if (!req.body.roles || req.body.roles.length === 0) {
    req.body.roles = ["user"];
    return next();
  }

  const validRoles = ROLES.map(role => role.toLowerCase());
  const invalidRoles = req.body.roles.filter(role => !validRoles.includes(role.toLowerCase()));

  if (invalidRoles.length > 0) {
    req.body.roles = [...req.body.roles, "user"];
    return res.status(400).json({
      message: `Invalid role(s) provided: ${invalidRoles.join(", ")}. Default role 'user' added.`,
    });
  }

  next();
};