import { joi } from "../config/joi.js";

export const createOrderSchema = joi.object({
  customerName: joi.string().trim(),
  items: joi
    .array()
    .items(
      joi.object({
        productId: joi.string().required(),
        quantity: joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
  discount: joi.number().min(0),
  tax: joi.number().min(0),
  paymentMethod: joi
    .string()
    .valid("cash", "card", "jazzcash", "easypaisa")
    .required(),
});
