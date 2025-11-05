import * as authService from "../services/authService.js";

// Mostrar formulario de login
export const loginGet = (req, res) => {
  res.render("auth/login", { 
    title: "Login"
  });
};

// Procesar login
export const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Llamamos al servicio de login
    const { user, token } = await authService.login(email, password);

    // Guardamos en sesión solo los datos necesarios
    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: { id: user.role.id, name: user.role.name },
      status: { id: user.status.id, name: user.status.name }
    };

    req.session.token = token; // para API, opcional

    // Redirigimos al dashboard
    res.redirect("/dashboard");

  } catch (error) {
    console.error("Error en login:", error.message);

    // Flash message para mostrar al usuario
    req.flash("error_msg", error.message);
    res.redirect("/login");
  }
};

// Mostrar formulario de registro
export const registerGet = (req, res) => {
  res.render("auth/register", { 
    title: "Registro"
  });
};

// Procesar registro
export const registerPost = async (req, res) => {
  try {
    const newUser = await authService.register(req.body);

    req.flash("success_msg", "Registro exitoso, ya puedes iniciar sesión");
    res.redirect("/login");
  } catch (error) {
    req.flash("error_msg", error.message);
    res.redirect("/register");
  }
};

// Logout
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      req.flash("error_msg", "Error al cerrar sesión");
      return res.redirect("/dashboard");
    }
    res.clearCookie("connect.sid"); // limpiar cookie de sesión
    res.redirect("/login");
  });
};
