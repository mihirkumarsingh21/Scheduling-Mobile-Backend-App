import { Router } from "express";
import { createProvider, deleteProvider, getProviderById, getProviders } from "../controllers/provider.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/create", protectedRoute, admin ,createProvider);
router.get("/all", getProviders);
router.get("/:id", getProviderById);
router.delete("/:id", protectedRoute, admin, deleteProvider);

export default router;