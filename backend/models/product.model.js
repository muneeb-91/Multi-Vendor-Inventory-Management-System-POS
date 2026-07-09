import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);