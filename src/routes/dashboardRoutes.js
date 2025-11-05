import { Router } from "express";
import { showDashboard } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/dashboard", authMiddleware, showDashboard);

export default router;
