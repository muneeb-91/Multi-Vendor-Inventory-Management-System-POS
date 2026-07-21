import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import Manager from "../models/manager.model.js";
import { buildUserResponse } from "../services/auth.service.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.pos_token;
  // const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) throw "Token is required.";

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) throw "User not found.";

  const userResponse = await buildUserResponse(user);
  req.user = userResponse;
  next();
};
