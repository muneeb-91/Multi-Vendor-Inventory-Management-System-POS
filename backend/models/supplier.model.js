import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    supplierName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      minLength: 11,
      maxLength: 15,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    address: {
      type: String,
      trim: true,
      required: true,
      maxLength: 20
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Supplier", supplierSchema);