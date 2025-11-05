import statusService from "../services/statusService.js";

export const listStatus = async (req, res) => {
  const statuses = await statusService.getAllStatus();
  res.render("status/list", { statuses, message: req.flash("message") });
};

export const createStatusForm = (req, res) => {
  res.render("status/create");
};

export const createStatus = async (req, res) => {
  const { name } = req.body;
  await statusService.createStatus({ name });
  req.flash("message", "Estado creado correctamente");
  res.redirect("/status");
};

export const editStatusForm = async (req, res) => {
  const status = await statusService.getStatusById(req.params.id);
  res.render("status/edit", { status });
};

export const updateStatus = async (req, res) => {
  const { name } = req.body;
  await statusService.updateStatus(req.params.id, { name });
  req.flash("message", "Estado actualizado correctamente");
  res.redirect("/status");
};

export const deleteStatus = async (req, res) => {
  await statusService.deleteStatus(req.params.id);
  req.flash("message", "Estado eliminado");
  res.redirect("/status");
};
