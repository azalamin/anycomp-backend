import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { mediaController } from "./media.controller";

const router = Router();

// Admin-only
router.post("/", authMiddleware(), mediaController.createMediaHandler);

// Public (used in specialist details)
router.get("/specialist/:specialistId", mediaController.getMediaBySpecialistHandler);

// Admin-only
router.delete("/:id", authMiddleware(), mediaController.deleteMediaHandler);

export const mediaRouter = router;
