import { Router } from "express";
const router = Router();
import { validate } from "../middlewares/validate.js";

// controller imports
import { login, registerVendor } from "../controllers/userController.js";

// validation imports
import { vendorRegisterationSchema, loginSchema } from "../validations/userValidations.js";

router.post('/register-vendor', validate(vendorRegisterationSchema), registerVendor);
router.post('/login', validate(loginSchema), login);

export default router;