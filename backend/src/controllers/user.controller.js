import User from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    if (!rolesFound || rolesFound.length === 0) {
      return res.status(400).json({ message: "Invalid roles provided" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.roles = rolesFound.map((role) => role._id);
    await user.save();

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user role" });
  }
};
