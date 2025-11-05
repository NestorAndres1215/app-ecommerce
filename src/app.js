import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import dotenv from "dotenv";
import ejsMate from "ejs-mate";

import "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || "secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));
app.use(flash());

// EJS-Mate para layouts
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Variables globales para todas las vistas
app.use((req, res, next) => {
  // Esto asegura que las vistas siempre tengan el usuario
  res.locals.user = req.session.user || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Rutas
app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", userRoutes);
app.use("/", roleRoutes);
app.use("/", statusRoutes);

// Ruta 404

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running: http://localhost:${PORT}`));
