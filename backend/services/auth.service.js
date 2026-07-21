import Vendor from "../models/vendor.model.js";
import Manager from "../models/manager.model.js";

export const buildUserResponse = async (user) => {
  const userObject = user.toObject();
  delete userObject.password;

  if (user.role === "vendor") {
    const vendor = await Vendor.findOne({ userId: user._id });

    return {
      ...userObject,
      name: vendor.ownerName,
      vendorId: vendor._id,
      status: vendor.status,
    };
  }

  if (user.role === "manager") {
    const manager = await Manager.findOne({ userId: user._id });

    return {
      ...userObject,
      name: manager.name,
      vendorId: manager.vendorId,
      status: manager.status,
    };
  }

  return {
    ...userObject,
    name: "Admin",
  };
};
