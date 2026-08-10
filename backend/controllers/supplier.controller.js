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

// Get Suppliers with pagination
export const getSuppliers = async (req, res) => {
  const {
    page = 1,
    limit = 5,
    search = "",
    status = "all",
  } = req.query;

  const currentPage = Number(page);
  const itemsPerPage = Number(limit);

  const skip = (currentPage - 1) * itemsPerPage;

  // Base filter
  const filter = {
    vendorId: req.user.vendorId,
  };

  // Search
  if (search.trim()) {
    filter.$or = [
      {
        supplierName: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        phone: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        email: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  // Status filter
  if (status !== "all") {
    filter.status = status;
  }

  const [suppliers, totalSuppliers] = await Promise.all([
    Supplier.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage),

    Supplier.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalSuppliers / itemsPerPage);

  res.status(200).json({
    success: true,
    suppliers,
    pagination: {
      currentPage,
      totalPages,
      totalItems: totalSuppliers,
      limit: itemsPerPage,
    },
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
