import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";
export const register = async (userData) => {
    const { firstName, lastName, username, email, phone, birthDate, gender, password } = userData;

    // Verificar si el email o username ya existen
    const userExists = await User.findOne({
        where: {
            email
        }
    });
    if (userExists) throw new Error("El correo ya está registrado");

    const usernameExists = await User.findOne({
        where: {
            username
        }
    });
    if (usernameExists) throw new Error("El username ya está registrado");

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Obtener rol y estado por defecto
    const defaultRole = await Role.findOne({ where: { name: "user" } });
    const defaultStatus = await Status.findOne({ where: { name: "active" } });

    // Crear usuario
    const newUser = await User.create({
        firstName,
        lastName,
        username,
        email,
        phone,
        birthDate,
        gender,
        password: hashedPassword,
        roleId: defaultRole.id,
        statusId: defaultStatus.id
    });

    return newUser;
};

export const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
    include: [
      { model: Role, as: "role" },
      { model: Status, as: "status" }
    ]
  });

  if (!user) throw new Error("Usuario no encontrado");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Contraseña incorrecta");

  if (user.status.name !== "active") throw new Error("Usuario inactivo");

  const token = jwt.sign(
    { id: user.id, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
};