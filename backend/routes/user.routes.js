import { Router } from "express";
const router = Router();

// controller imports
import { 
    login,
    checkAuth,
    logout,
} from "../controllers/user.controller.js";

// validation imports
import {
    loginSchema,
} from "../validations/user.validation.js";

// middleware imports
import { validate } from "../middlewares/validate.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// routes
router.post(
    "/login", 
    validate(loginSchema),
    login
);
router.get(
    "/checkAuth",
    verifyToken,
    checkAuth
);
router.post(
    "/logout",
    verifyToken,
    logout
);

export default router;
