// Middleware para rutas que requieren sesión activa
export const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "Debes iniciar sesión para acceder.");
    return res.redirect("/login");
  }

  // Verifica si el usuario está activo
  if (req.session.user.status?.name !== "active") {
    req.flash("error", "Tu cuenta está inactiva. Contacta al administrador.");
    return res.redirect("/login");
  }

  next();
};

// Middleware para permitir solo administradores
export const adminMiddleware = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "Debes iniciar sesión.");
    return res.redirect("/login");
  }

  // Verifica rol de admin
  if (req.session.user.role?.name !== "admin") {
    req.flash("error", "No tienes permisos para acceder a esta sección.");
    return res.redirect("/dashboard");
  }

  next();
};

// Middleware opcional para rutas de invitados (login / registro)
// Si ya está logueado, lo redirige al dashboard según su rol
export const guestMiddleware = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  next();
};
