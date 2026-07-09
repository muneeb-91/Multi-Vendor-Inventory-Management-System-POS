import { joi } from "../config/joi.js";

export const addProductSchema = joi.object({
  name: joi.string().trim().required(),
  sku: joi.string().trim().uppercase().required(),
  categoryId: joi.string().required(),
  supplierId: joi.string().required(),
  stock: joi.number().min(0).required(),
  sellingPrice: joi.number().min(0).required(),
  purchasePrice: joi.number().min(0).required(),
  purchaseDate: joi.date().required(),
});

export const updateProductSchema = joi.object({
  name: joi.string().trim(),
  sku: joi.string().trim().uppercase(),
  categoryId: joi.string(),
  supplierId: joi.string(),
  stock: joi.number().min(0),
  sellingPrice: joi.number().min(0),
  purchasePrice: joi.number().min(0),
  purchaseDate: joi.date(),
  status: joi.string().valid("active", "inactive"),
}).min(1);
