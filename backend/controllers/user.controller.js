import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const getUser = await User.findOne({ email: email });
  if (!getUser) throw "Invalid Credentials";

  const comparePassword = bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Invalid Credentials!";

  const accessToken = generateToken(getUser._id, res);

  res.status(201).json({
    success: true,
    message: "Login successful",
    accessToken,
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