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

export const validateCategory = ({ formData }) => {
  if (!formData.categoryName.trim()) toast.error("Category name is required.");
  return false;
  if (formData.categoryName.trim().length < 2)
    toast.error("Must be at least 2 characters.");
  return false;
  if (formData.categoryName.trim().length > 25)
    toast.error("Must be 25 characters or less.");
  return false;
  
  if (!formData.description.trim()) toast.error("Description is required.");
  return false;
  if (formData.description.trim().length < 5)
    toast.error("Must be at least 5 characters.");
  return false;
  if (formData.description.trim().length > 45)
    toast.error("Must be 45 characters or less.");
  return false;

  return true;
};
