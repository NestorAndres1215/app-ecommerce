export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  req.flash("error", "Acceso restringido solo para administradores.");
  return res.redirect("/dashboard");
};

export const isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === "user") {
    return next();
  }
  req.flash("error", "Acceso restringido solo para usuarios.");
  return res.redirect("/dashboard");
};
