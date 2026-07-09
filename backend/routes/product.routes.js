import express from "express";

// controller imports
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

// validation imports
import {
  addProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";

// middleware imports
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

// routes
router.post(
  "/products",
  verifyToken,
  authorizeRoles("vendor"),
  validate(addProductSchema),
  addProduct,
);

router.get(
  "/products", 
  verifyToken, 
  authorizeRoles("vendor"), 
  getProducts
);

router.patch(
  "/products/:id",
  verifyToken,
  authorizeRoles("vendor"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete(
  "/products/:id",
  verifyToken,
  authorizeRoles("vendor"),
  deleteProduct,
);

export default router;
