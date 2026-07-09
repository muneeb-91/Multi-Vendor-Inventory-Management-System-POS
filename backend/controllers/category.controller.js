import mongoose from "mongoose";
import Category from "../models/category.model.js";
import Product from '../models/product.model.js';

export const addCategory = async (req, res) => {
  const { categoryName } = req.body;

  const existingCategory = await Category.findOne({
    vendorId: req.user.vendorId,
    categoryName: {
      $regex: new RegExp(`^${categoryName}$`, "i"),
    },
  });

  if (existingCategory) throw "Category already exists.";

  const category = await Category.create({
    vendorId: req.user.vendorId,
    categoryName,
  });

  res.status(201).json({
    success: true,
    message: "Category added successfully.",
    category,
  });
};

export const getCategories = async (req, res) => {
  const categories = await Category.find({
    vendorId: req.user.vendorId,
    status: "active",
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    categories,
  });
};

export const toggleCategoryStatus = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findOne({
    _id: id,
    vendorId: req.user.vendorId,
  });

  if (!category) throw "Category not found.";

  category.status = category.status === "active" ? "inactive" : "active";

  await category.save();

  res.status(200).json({
    success: true,
    message: `Category ${category.status} successfully.`,
    category,
  });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const category = await Category.findOneAndDelete(
      {
        _id: id,
        vendorId: req.user.vendorId,
      },
      { session },
    );

    if (!category) throw "Category not found.";

    const deletedProducts = await Product.countDocuments({
      vendorId: req.user.vendorId,
      categoryId: id,
    });

    await Product.deleteMany(
      {
        vendorId: req.user.vendorId,
        categoryId: id,
      },
      { session },
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
      deletedProducts: totalProducts,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
