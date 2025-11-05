import { Router } from "express";
import {
    loginGet, loginPost,
    registerGet, registerPost,
    logout
} from "../controllers/authController.js";
import { guestMiddleware } from "../middlewares/authMiddleware.js";
const router = Router();

// Login
router.get("/login", guestMiddleware, loginGet);
router.post("/login", loginPost);

// Registro
router.get("/register", guestMiddleware, registerGet);
router.post("/register", registerPost);

// Logout
router.get("/logout", logout);

export default router;
