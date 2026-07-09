import express from "express";

// controller imports
import {
  addSupplier,
  getSuppliers,
  toggleSupplierStatus,
  deleteSupplier
} from "../controllers/supplier.controller.js";

// validation imports
import { addSupplierSchema } from "../validations/supplier.validation.js";

// middlware imports
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

// routes
router.post(
    "/suppliers",
    verifyToken,
    authorizeRoles("vendor"),
    validate(addSupplierSchema),
    addSupplier
);

router.get(
    "/suppliers",
    verifyToken,
    authorizeRoles("vendor"),
    getSuppliers
)

router.patch(
    "/suppliers/:id/toggle-status",
    verifyToken,
    authorizeRoles("vendor"),
    toggleSupplierStatus
);

router.delete(
    "/suppliers/:id",
    verifyToken,
    authorizeRoles("vendor"),
    deleteSupplier
);

export default router;
