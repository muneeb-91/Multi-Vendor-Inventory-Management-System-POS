import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { buildUserResponse } from "../services/auth.service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) throw "Invalid Credentials";

  const comparePassword = bcrypt.compare(password, user.password);
  if (!comparePassword) throw "Invalid Credentials!";

  const accessToken = generateToken(user._id, res);
  const userResponse = await buildUserResponse(user);

  res.status(201).json({
    success: true,
    message: "Login successful",
    accessToken,
    user: userResponse,
});
};

export const checkAuth = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logout = async (req, res) => {
    res.clearCookie("pos_token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    });
};