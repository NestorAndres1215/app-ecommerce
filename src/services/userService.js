import User from "../models/User.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  return await User.findAll({
    include: [
      { model: Role, as: "role", where: { name: "admin" } }, // solo admins
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
  if (userExists) throw new Error("El correo ya está registrado");

  const usernameExists = await User.findOne({ where: { username } });
  if (usernameExists) throw new Error("El username ya está registrado");

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
    roleId: roleId || (await Role.findOne({ where: { name: "user" } })).id,
    statusId: statusId || (await Status.findOne({ where: { name: "active" } })).id
  });

  return newUser;
};
export const updateUser = async (id, data) => {
  const { password, roleId, statusId } = data;

  // 1️⃣ Buscar usuario SIN include
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");

  // 2️⃣ Actualizar contraseña si viene
  if (password?.trim()) {
    data.password = await bcrypt.hash(password, 10);
  } else {
    delete data.password;
  }

  // 3️⃣ Validar y actualizar rol si viene
  if (roleId) {
    const role = await Role.findByPk(roleId);
    if (!role) throw new Error("Rol no válido");
    data.roleId = role.id;
  }

  // 4️⃣ Validar y actualizar estado si viene
  if (statusId) {
    const status = await Status.findByPk(statusId);
    if (!status) throw new Error("Estado no válido");
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
  if (!user) throw new Error("Usuario no encontrado");

  // Obtener el status "inactive"
  const inactiveStatus = await Status.findOne({ where: { name: "inactive" } });
  if (!inactiveStatus) throw new Error("Estado 'inactive' no encontrado");

  // Actualizar el usuario a inactivo
  await user.update({ statusId: inactiveStatus.id });

  return true;
};