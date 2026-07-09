import express from "express";

// controller imports
import {
  addManager,
  getManagers,
  toggleManagerStatus,
  updateManager,
} from "../controllers/manager.controller.js";

// validation imports
import {
  addManagerSchema,
  updateManagerSchema,
} from "../validations/manager.validation.js";

// middleware imports
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/managers",
  verifyToken,
  authorizeRoles("vendor"),
  validate(addManagerSchema),
  addManager,
);

router.get(
    "/managers", 
    verifyToken, 
    authorizeRoles("vendor"), 
    getManagers
);

router.patch(
  "/managers/:id",
  verifyToken,
  authorizeRoles("vendor"),
  validate(updateManagerSchema),
  updateManager,
);

router.patch(
  "/managers/:id/toggle-status",
  verifyToken,
  authorizeRoles("vendor"),
  toggleManagerStatus,
);

export default router;
