import { joi } from "../config/joi.js";

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
});

