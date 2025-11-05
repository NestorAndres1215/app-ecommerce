import Role from "../models/Role.js";

const getAllRoles = () => Role.findAll();
const getRoleById = (id) => Role.findByPk(id);
const createRole = (data) => Role.create(data);
const updateRole = (id, data) => Role.update(data, { where: { id } });
const deleteRole = (id) => Role.destroy({ where: { id } });

export default {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
