import express from "express";

import {
    createOrder,
    getOrders,
    cancelOrder,
} from "../controllers/order.controller.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { validate } from "../middlewares/validate.js";

import { createOrderSchema } from "../validations/order.validation.js";

const router = express.Router();

router.post(
    "/orders",
    verifyToken,
    authorizeRoles("vendor", "manager"),
    validate(createOrderSchema),
    createOrder
);

router.patch(
  "/orders/:id/cancel",
  verifyToken,
  authorizeRoles("vendor", "manager"),
  cancelOrder
);

router.get(
    "/orders",
    verifyToken,
    authorizeRoles("vendor", "manager"),
    getOrders
);

export default router;