import { toast } from "react-toastify";

export const validateLoginForm = ({ email, password }) => {
  if (!email.trim()) {
    toast.error("Email is required.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }
  if (!password.trim()) {
    toast.error("Password is required.");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }
  return true;
};

export const validateSupplier = (formData) => {
  const e = {};
  const supplierName = formData.supplierName.trim();
  const phone = formData.phone.trim();
  const email = formData.email.trim();
  const address = formData.address.trim();

  // Supplier Name
  if (!supplierName) {
    e.supplierName = "Supplier name is required.";
  } else if (supplierName.length < 2) {
    e.supplierName = "Must be at least 2 characters.";
  } else if (supplierName.length > 30) {
    e.supplierName = "Must be 30 characters or less.";
  }

  // Phone
  if (!phone) {
    e.phone = "Phone number is required.";
  } else if (phone.length < 11) {
    e.phone = "Must be at least 11 digits.";
  } else if (phone.length > 15) {
    e.phone = "Must be 15 digits or less.";
  }

  // Email (Optional)
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    e.email = "Enter a valid email address.";
  }

  // Address
  if (!address) {
    e.address = "Address is required.";
  } else if (address.length > 20) {
    e.address = "Must be 20 characters or less.";
  }

  return e;
};

export const validateCategory = (formData) => {
  const e = {};
  const name = formData.categoryName.trim();
  const desc = formData.description.trim();

  // name
  if (!name) e.categoryName = "Category name is required.";
  else if (name.length < 2) e.categoryName = "Must be at least 2 characters.";
  else if (name.length > 25) e.categoryName = "Must be 25 characters or less.";

  // description
  if (!desc) e.description = "Description is required.";
  else if (desc.length < 5) e.description = "Must be at least 5 characters.";
  else if (desc.length > 45) e.description = "Must be 45 characters or less.";

  return e;
};

export const validateEditCategory = (fromData) => {
    const e = {};
    const name = formData.categoryName.trim();
    const desc = formData.description.trim();

    if (!name)           e.categoryName = "Category name is required.";
    else if (name.length < 2)  e.categoryName = "Must be at least 2 characters.";
    else if (name.length > 25) e.categoryName = "Must be 25 characters or less.";

    if (!desc)           e.description = "Description is required.";
    else if (desc.length < 5)  e.description = "Must be at least 5 characters.";
    else if (desc.length > 45) e.description = "Must be 45 characters or less.";

    return e;
  };
