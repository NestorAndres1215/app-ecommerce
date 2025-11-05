import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";
import {
  listStatus,
  createStatusForm,
  createStatus,
  editStatusForm,
  updateStatus,
  deleteStatus
} from "../controllers/statusController.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, listStatus);
router.get("/create", authMiddleware, adminMiddleware, createStatusForm);
router.post("/create", authMiddleware, adminMiddleware, createStatus);
router.get("/edit/:id", authMiddleware, adminMiddleware, editStatusForm);
router.post("/edit/:id", authMiddleware, adminMiddleware, updateStatus);
router.get("/delete/:id", authMiddleware, adminMiddleware, deleteStatus);

export default router;
