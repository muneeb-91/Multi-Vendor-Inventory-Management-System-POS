import { joi } from "../config/joi.js";

const managerSchema = {
  name: joi.string().trim(),
  phone: joi.string().trim(),
  email: joi.string().email().trim(),
};

export const addManagerSchema = joi.object({
  name: managerSchema.name.required(),
  phone: managerSchema.phone.required(),
  email: managerSchema.email.required(),
  password: joi.string().min(6).required(),
  confirm_password: joi.string().required(),
});

export const updateManagerSchema = joi.object({
    ...managerSchema,
}).min(1);
