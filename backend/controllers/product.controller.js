import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Supplier from "../models/supplier.model.js";

export const addProduct = async (req, res) => {
  const {
    name,
    sku,
    categoryId,
    supplierId,
    stock,
    sellingPrice,
    purchasePrice,
    purchaseDate,
  } = req.body;

  // SKU duplicate check
  const existingProduct = await Product.findOne({
    sku,
    vendorId: req.user.vendorId,
  });

  if (existingProduct) throw "SKU already exists.";

  // making sure category and supplier exist and active
  const [category, supplier] = await Promise.all([
    Category.findOne({
      _id: categoryId,
      vendorId: req.user.vendorId,
      status: "active",
    }),
    Supplier.findOne({
      _id: supplierId,
      vendorId: req.user.vendorId,
      status: "active",
    }),
  ]);
  if (!category) throw "Category not found or inactive.";
  if (!supplier) throw "Supplier not found or inactive.";

  const product = await Product.create({
    vendorId: req.user.vendorId,
    name,
    sku,
    categoryId,
    supplierId,
    stock,
    sellingPrice,
    purchasePrice,
    purchaseDate,
  });

  res.status(201).json({
    success: true,
    message: "Product added successfully.",
    product,
  });
};

export const getProducts = async (req, res) => {
  const products = await Product.find({
    vendorId: req.user.vendorId,
  })
    .populate("categoryId", "categoryName")
    .populate("supplierId", "supplierName")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    products,
  });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    sku,
    categoryId,
    supplierId,
    stock,
    sellingPrice,
    purchasePrice,
    purchaseDate,
    status,
  } = req.body;

  const updateData = {
    name,
    sku,
    categoryId,
    supplierId,
    stock,
    sellingPrice,
    purchasePrice,
    purchaseDate,
    status,
  };

  const updatedProduct = await Product.findOneAndUpdate(
    {
      _id: id,
      vendorId: req.user.vendorId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedProduct) throw "Product not found.";

  res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    product: updatedProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndDelete({
    _id: id,
    vendorId: req.user.vendorId,
  });

  if (!product) throw "Product not found.";

  res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
};
