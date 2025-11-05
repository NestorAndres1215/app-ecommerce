import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";
import {
  listRoles,
  createRoleForm,
  createRole,
  editRoleForm,
  updateRole,
  deleteRole
} from "../controllers/roleController.js";

const router = Router();

// Listar roles
router.get("/", authMiddleware, adminMiddleware, listRoles);

// Crear rol
router.get("/create", authMiddleware, adminMiddleware, createRoleForm);
router.post("/create", authMiddleware, adminMiddleware, createRole);

// Editar rol
router.get("/edit/:id", authMiddleware, adminMiddleware, editRoleForm);
router.post("/edit/:id", authMiddleware, adminMiddleware, updateRole);

// Eliminar rol
router.get("/delete/:id", authMiddleware, adminMiddleware, deleteRole);

export default router;
