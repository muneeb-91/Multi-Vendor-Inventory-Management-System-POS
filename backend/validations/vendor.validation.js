import { joi } from "../config/joi.js";

export const vendorRegisterationSchema = joi.object({
    ownerName: joi.string().trim().required(),
    shopName: joi.string().trim().required(),
    email: joi.string().email().required(),
    phone: joi.string().max(12).trim().required(),
    password: joi.string().min(6).max(12).required(),
    confirm_password: joi.string().valid(joi.ref('password')).required(),
    businessAddress: joi.string().trim().required(),
});