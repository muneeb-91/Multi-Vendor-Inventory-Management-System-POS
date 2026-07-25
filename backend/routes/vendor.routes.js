import { Router } from "express";
const router = Router();

// controller imports
import { registerVendor, getVendorRequests } from "../controllers/vendor.controller.js";

// validation imports
import { vendorRegisterationSchema } from "../validations/vendor.validation.js";

// middleware imports
import { validate } from "../middlewares/validate.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

// routes
router.post(
    "/register-vendor",
    validate(vendorRegisterationSchema),
    registerVendor
);

router.get(
    "/requests",
    verifyToken,
    authorizeRoles("admin"),
    getVendorRequests
);

router.patch(
  "/:id/status",
  verifyToken,
  authorizeRoles("admin"),
  updateVendorStatus
);

export default router;