import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import { serviceOfferingController } from "./serviceOffering.controller";

const router = Router();

// Admin-only
router.post("/", authMiddleware(), serviceOfferingController.createServiceOfferingHandler);

// Public
router.get(
	"/specialist/:specialistId",
	serviceOfferingController.getServiceOfferingsBySpecialistHandler
);

// Admin-only
router.delete("/:id", authMiddleware(), serviceOfferingController.deleteServiceOfferingHandler);

export const serviceOfferingRouter = router;
