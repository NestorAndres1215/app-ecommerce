import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";
import {
  listUsers,
  showCreateForm,
  createUser,
  showEditForm,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = Router();

router.get("/users", authMiddleware, adminMiddleware, listUsers);
router.get("/users/create", authMiddleware, adminMiddleware, showCreateForm);
router.post("/users/create", authMiddleware, adminMiddleware, createUser);

router.get("/users/edit/:id", authMiddleware, adminMiddleware, showEditForm);
router.post("/users/edit/:id", authMiddleware, adminMiddleware, updateUser);

router.get("/users/delete/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
