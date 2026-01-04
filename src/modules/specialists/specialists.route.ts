import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { specialistController } from "./specialists.controller";

const router = Router();

router.get("/", specialistController.getAllSpecialistsHandler);
router.post("/", authMiddleware, specialistController.createSpecialistHandler);
router.patch("/:id/publish", authMiddleware, specialistController.publishSpecialistHandler);

export const specialistRouter = router;
