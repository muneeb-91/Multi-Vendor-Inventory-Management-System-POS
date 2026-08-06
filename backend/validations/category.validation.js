import { joi } from "../config/joi.js";

export const addCategorySchema = joi.object({
  categoryName: joi.string().trim().required(),
  description: joi.string().trim().required().min(5).max(45),
  status: joi.string().trim().optional(),
});
