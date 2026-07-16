import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import Manager from "../models/manager.model.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.pos_token;
  // const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) throw "Token is required.";

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) throw "User not found.";

  if (user.role === "vendor") {
    const vendor = await Vendor.findOne({
      userId: user._id,
    });

    req.user = {
      ...user.toObject(),
      vendorId: vendor._id,
      name: vendor.ownerName,
    };
  }
  else if (user.role === "manager") {
    const manager = await Manager.findOne({
      userId: user._id,
    });

    req.user = {
      ...user.toObject(),
      vendorId: manager.vendorId,
      name: manager.name,
    };
  } else {
    req.user = user.toObject;
  }
  next();
};
