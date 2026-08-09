import mongoose from "mongoose";
import Supplier from "../models/supplier.model.js";
import Product from "../models/product.model.js";

export const addSupplier = async (req, res) => {
  
  const { supplierName, phone, email, address } = req.body;

  const existingSupplier = await Supplier.findOne({
    vendorId: req.user.vendorId,
    supplierName: {
      $regex: new RegExp(`^${supplierName}$`, "i"),
    },
  });

  if (existingSupplier) throw "Supplier already exists.";

  const supplier = await Supplier.create({
    vendorId: req.user.vendorId,
    supplierName,
    phone,
    email,
    address,
  });

  res.status(201).json({
    success: true,
    message: "Supplier added successfully.",
    supplier,
  });
};

export const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({
    vendorId: req.user.vendorId,
    status: "active",
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    suppliers,
  });
};

export const toggleSupplierStatus = async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findOne({
    _id: id,
    vendorId: req.user.vendorId,
  });
  if (!supplier) throw "Supplier not found.";
  supplier.status = supplier.status === "active" ? "inactive" : "active";

  await supplier.save();

  res.status(200).json({
    success: true,
    message: `Supplier ${supplier.status} successfully.`,
    supplier,
  });
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const supplier = await Supplier.findOneAndDelete(
      {
        _id: id,
        vendorId: req.user.vendorId,
      },
      { session },
    );

    if (!supplier) throw "Supplier not found.";

    const deletedProducts = await Product.countDocuments({
      vendorId: req.user.vendorId,
      supplierId: id,
    });

    await Product.deleteMany(
      {
        vendorId: req.user.vendorId,
        supplierId: id,
      },
      { session },
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Supplier deleted successfully.",
      deletedProducts,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
