import User from "../models/User.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";
import { ROLES } from "../utils/roles.js";

export const getDashboardView = (roleName) => {
  return roleName === ROLES.ADMIN ? "dashboard/admin" : "dashboard/user";
};

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

export const getUserDashboardData = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      { model: Role, as: "role" },
      { model: Status, as: "status" }
    ]
  });
  return user;
};
