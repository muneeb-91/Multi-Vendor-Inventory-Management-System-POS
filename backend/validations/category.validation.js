import { joi } from "../config/joi.js";

export const addCategorySchema = joi.object({
  categoryName: joi.string().trim().required(),
});
