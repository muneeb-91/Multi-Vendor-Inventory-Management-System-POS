import mongoose from "mongoose";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const registerVendor = async (req, res) => {
  const {
    ownerName,
    shopName,
    email,
    phone,
    password,
    confirm_password,
    businessAddress,
  } = req.body;

  const getDuplicateEmail = await User.findOne({ email: email });
  if (getDuplicateEmail) throw "This user is already registered";

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create(
      [
        {
          email,
          password: hashedPassword,
          role: "vendor",
        },
      ],
      { session },
    );

    const vendor = await Vendor.create(
      [
        {
          userId: user[0]._id,
          ownerName,
          shopName,
          phone,
          businessAddress,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    const accessToken = generateToken(user[0]._id, res);

    res.status(201).json({
      success: true,
      message: "Registration successful, waiting for admin approval",
      accessToken,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getVendorRequests = async (req, res) => {
  const vendorRequests = await Vendor.find({
    status: "pending",
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    vendorRequests,
  });
};

export const updateVendorStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "active",
    "suspended",
    "rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    throw "Invalid vendor status.";
  }

  const vendor = await Vendor.findById(id);

  if (!vendor) {
    throw "Vendor not found.";
  }

  vendor.status = status;
  await vendor.save();

  res.status(200).json({
    success: true,
    message: `Vendor ${status} successfully.`,
    vendor,
  });
};