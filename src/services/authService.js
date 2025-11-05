import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";
import { STATUS } from "../utils/status.js";
import { MESSAGES } from "../utils/constants.js";
import { ROLES } from "../utils/roles.js";

export const register = async (userData) => {
  const { firstName, lastName, username, email, phone, birthDate, gender, password } = userData;

  // Verificar si el email o username ya existen
  const userExists = await User.findOne({
    where: {
      email
    }
  });
  if (userExists) throw new Error(MESSAGES.CORREO_EXISTE);

  const usernameExists = await User.findOne({
    where: {
      username
    }
  });
  if (usernameExists) throw new Error(MESSAGES.USERNAME_EXISTE);

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Obtener rol y estado por defecto
  const defaultRole = await Role.findOne({ where: { name: ROLES.USER } });
  const defaultStatus = await Status.findOne({ where: { name: STATUS.ACTIVE } });

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

  if (!user) throw new Error(MESSAGES.USUARIO_NO_ENCONTRADO);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error(MESSAGES.CONTRA_INCORRECTA);

  if (user.status.name !== STATUS.ACTIVE) throw new Error(MESSAGES.USUARIO_INACTIVO);

  const token = jwt.sign(
    { id: user.id, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
};