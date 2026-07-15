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