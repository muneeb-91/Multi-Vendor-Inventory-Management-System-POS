import express from "express";

// controller imports
import {
  addCategory,
  getCategories,
  toggleCategoryStatus,
  deleteCategory,
  updateCategory
} from "../controllers/category.controller.js";

// validation imports
import { addCategorySchema } from "../validations/category.validation.js";

// middleware imports
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

// routes
router.post(
  "/categories",
  verifyToken,
  authorizeRoles("vendor"),
  validate(addCategorySchema),
  addCategory
);

router.get(
    "/categories", 
    verifyToken, 
    authorizeRoles("vendor"), 
    getCategories
);

router.patch(
    "/categories/:id/toggle-status",
    verifyToken,
    authorizeRoles("vendor"),
    toggleCategoryStatus
);

router.put(
  "/categories/:id",
  verifyToken,
  authorizeRoles("vendor"),
  updateCategory
);

router.delete(
    "/categories/:id",
    verifyToken,
    authorizeRoles("vendor"),
    deleteCategory
);

export default router;
