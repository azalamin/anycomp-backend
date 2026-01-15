import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { platformFeeController } from "./platformFee.controller";

const router = Router();

// Admin-only
router.post("/", authMiddleware(), platformFeeController.createPlatformFeeHandler);

router.get("/", authMiddleware(), platformFeeController.getAllPlatformFeesHandler);

export const platformFeeRouter = router;
