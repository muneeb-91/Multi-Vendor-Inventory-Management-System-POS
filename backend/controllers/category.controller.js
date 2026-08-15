import mongoose from "mongoose";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

export const addCategory = async (req, res) => {
  const { categoryName, description, status } = req.body;

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
    description,
    status,
  });

  res.status(201).json({
    success: true,
    message: "Category added successfully.",
    category,
  });
};

export const getCategories = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search?.trim() || "";
  const status = req.query.status || "all";

  const filter = {
    vendorId: req.user.vendorId,
  };

  if (search) {
    filter.categoryName = {
      $regex: search,
      $options: "i",
    };
  }

  if (status !== "all") {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const [categories, totalCategories] = await Promise.all([
    Category.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

    Category.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    categories,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCategories / limit),
      totalItems: totalCategories,
      limit
    },
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
    categoryId: category._id,
    status: category.status,
  });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await Category.findOne({
    _id: id,
    vendorId: req.user.vendorId,
  });

  if (!category) {
    throw "Category not found.";
  }

  category.name = name;
  category.description = description;

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully.",
    category,
  });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const category = await Category.findOneAndDelete(
      {
        _id: id,
        vendorId: req.user.vendorId,
      },
      { session },
    );

    if (!category) throw "Category not found.";

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
      categoryId: category._id,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
