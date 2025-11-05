import Status from "../models/Status.js";

const getAllStatus = () => Status.findAll();
const getStatusById = (id) => Status.findByPk(id);
const createStatus = (data) => Status.create(data);
const updateStatus = (id, data) => Status.update(data, { where: { id } });
const deleteStatus = (id) => Status.destroy({ where: { id } });

export default {
  getAllStatus,
  getStatusById,
  createStatus,
  updateStatus,
  deleteStatus
};
