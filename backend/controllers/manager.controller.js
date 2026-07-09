import bcrypt from "bcrypt";
import mongoose from "mongoose";

import User from "../models/user.model.js";
import Manager from "../models/manager.model.js";

export const addManager = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, phone, email, password, confirm_password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) throw "Email already exists.";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [user] = await User.create(
      [
        {
          email,
          password: hashedPassword,
          role: "manager",
        },
      ],
      { session },
    );

    const [manager] = await Manager.create(
      [
        {
          userId: user._id,
          vendorId: req.user.vendorId,
          name,
          phone,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Manager added successfully.",
      manager,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getManagers = async (req, res) => {
  const managers = await Manager.find({
    vendorId: req.user.vendorId,
  })
    .populate("userId", "email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    managers,
  });
};

export const updateManager = async (req, res) => {
  const { id } = req.params;

  const { name, phone, email } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const manager = await Manager.findOne({
      _id: id,
      vendorId: req.user.vendorId,
    }).session(session);

    if (!manager) throw "Manager not found.";

    const existingUser = await User.findOne({
      email,
      _id: { $ne: manager.userId },
    }).session(session);

    if (existingUser) throw "Email already exists.";

    await User.findByIdAndUpdate(
      manager.userId,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    const updatedManager = await Manager.findByIdAndUpdate(
      id,
      {
        name,
        phone,
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Manager updated successfully.",
      manager: updatedManager,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const toggleManagerStatus = async (req, res) => {
  const { id } = req.params;

  const manager = await Manager.findOne({
    _id: id,
    vendorId: req.user.vendorId,
  });

  if (!manager) throw "Manager not found.";

  manager.status = manager.status === "active" ? "suspended" : "active";

  await manager.save();

  res.status(200).json({
    success: true,
    message: `Manager ${manager.status} successfully.`,
    manager,
  });
};
