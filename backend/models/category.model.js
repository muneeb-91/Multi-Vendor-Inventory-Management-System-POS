import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    categoryName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 25,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 45,
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

export default mongoose.model("Category", categorySchema);