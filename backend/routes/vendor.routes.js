import { Router } from "express";
const router = Router();

// controller imports
import { registerVendor } from "../controllers/vendor.controller.js";

// validation imports
import { vendorRegisterationSchema } from "../validations/vendor.validation.js";

// middleware imports
import { validate } from "../middlewares/validate.js";

// routes
router.post(
    "/register-vendor",
    validate(vendorRegisterationSchema),
    registerVendor
);

export default router;