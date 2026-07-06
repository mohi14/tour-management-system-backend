import { Router } from "express";
import { HealthControllers } from "./health.controller";

const router = Router();

router.get("/", HealthControllers.getLiveHealth);
router.get("/live", HealthControllers.getLiveHealth);
router.get("/ready", HealthControllers.getReadyHealth);

export const HealthRoutes = router;
