import User from "../models/User.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";
import bcrypt from "bcrypt";
import { ROLES } from "../utils/roles.js";
import { MESSAGES } from "../utils/constants.js";
import { STATUS } from "../utils/status.js";

export const getAllUsers = async () => {
  return await User.findAll({
    include: [
      { model: Role, as: "role", where: { name: ROLES.ADMIN } }, // solo admins
      { model: Status, as: "status" }
    ]
  });
};

export const getUserById = async (id) => {
  return await User.findByPk(id, {
    include: [
      { model: Role, as: "role" },
      { model: Status, as: "status" }
    ]
  });
};

export const createUser = async (userData) => {
  const { firstName, lastName, username, email, phone, birthDate, gender, password, roleId, statusId } = userData;

  // Verificar si el email o username ya existen
  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw new Error(MESSAGES.CORREO_EXISTE);

  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) throw new Error(MESSAGES.USERNAME_EXISTE);

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario usando rol y estado seleccionados
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    phone,
    birthDate,
    gender,
    password: hashedPassword,
    roleId: roleId || (await Role.findOne({ where: { name: ROLES.USER } })).id,
    statusId: statusId || (await Status.findOne({ where: { name: STATUS.ACTIVE } })).id
  });

  return newUser;
};
export const updateUser = async (id, data) => {
  const { password, roleId, statusId } = data;

  // 1️⃣ Buscar usuario SIN include
  const user = await User.findByPk(id);
  if (!user) throw new Error(MESSAGES.USUARIO_NO_ENCONTRADO);

  // 2️⃣ Actualizar contraseña si viene
  if (password?.trim()) {
    data.password = await bcrypt.hash(password, 10);
  } else {
    delete data.password;
  }

  // 3️⃣ Validar y actualizar rol si viene
  if (roleId) {
    const role = await Role.findByPk(roleId);
    if (!role) throw new Error(MESSAGES.ROL_NO_VALIDO);
    data.roleId = role.id;
  }

  // 4️⃣ Validar y actualizar estado si viene
  if (statusId) {
    const status = await Status.findByPk(statusId);
    if (!status) throw new Error(MESSAGES.ESTADP_NO_VALIDO);
    data.statusId = status.id;
  }

  // 5️⃣ Actualizar usuario
  await user.update(data);

  // 6️⃣ Devolver usuario con asociaciones incluidas
  return await User.findByPk(id, {
    include: [
      { model: Role, as: "role" },
      { model: Status, as: "status" }
    ]
  });
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error(MESSAGES.USUARIO_NO_ENCONTRADO);

  // Obtener el status "inactive"
  const inactiveStatus = await Status.findOne({ where: { name: STATUS.INACTIVE } });
  if (!inactiveStatus) throw new Error(MESSAGES.ESTADO_INACTIVE_NO_ENCONTRADO);

  // Actualizar el usuario a inactivo
  await user.update({ statusId: inactiveStatus.id });

  return true;
};