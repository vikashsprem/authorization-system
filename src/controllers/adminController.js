const User = require("../models/userModel");
const { ROLES } = require("../constants/roles");

const userController = {
  // Update user role
  updateUserRole: async (req, res) => {
    try {
      const { userId, role } = req.body;

      if (!Object.values(ROLES).includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error updating user role" });
    }
  },

  // Get all users (for admin)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, "-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  },
};

module.exports = userController;
