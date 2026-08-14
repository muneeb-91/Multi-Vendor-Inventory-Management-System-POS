import { joi } from "../config/joi.js";

export const addSupplierSchema = joi.object({
  supplierName: joi.string().trim().required(),
  phone: joi.string().trim().required(),
  email: joi.string().email().trim().optional(),
  address: joi.string().trim(),
  status: joi.string().trim().valid("active", "inactive"),
});
