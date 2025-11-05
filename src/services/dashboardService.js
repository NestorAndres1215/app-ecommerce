import User from "../models/User.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";

/**
 * Devuelve la vista correspondiente según el rol del usuario
 * @param {string} role - Rol del usuario ("admin" o "user")
 * @returns {string} - Ruta de la vista EJS
 */
export const getDashboardView = (roleName) => {
  return roleName === "admin" ? "dashboard/admin" : "dashboard/user";
};

/**
 * Obtiene todos los usuarios con su rol y estado
 * Solo para admin
 * @returns {Promise<Array>} - Lista de usuarios
 */
export const getAllUsersWithRolesAndStatus = async () => {
  const users = await User.findAll({
    include: [
      { model: Role, as: "role" },
      { model: Status, as: "status" }
    ],
    order: [["id", "ASC"]]
  });
  return users;
};

/**
 * Obtiene información básica del usuario logueado
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>}
 */
export const getUserDashboardData = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      { model: Role, as: "role" },
      { model: Status, as: "status" }
    ]
  });
  return user;
};
