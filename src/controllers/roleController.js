import roleService from "../services/roleService.js";

export const listRoles = async (req, res) => {
  const roles = await roleService.getAllRoles();
  res.render("roles/list", { roles, message: req.flash("message") });
};

export const createRoleForm = (req, res) => {
  res.render("roles/create");
};

export const createRole = async (req, res) => {
  const { name } = req.body;
  await roleService.createRole({ name });
  req.flash("message", "Rol creado correctamente");
  res.redirect("/roles");
};

export const editRoleForm = async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);
  res.render("roles/edit", { role });
};

export const updateRole = async (req, res) => {
  const { name } = req.body;
  await roleService.updateRole(req.params.id, { name });
  req.flash("message", "Rol actualizado correctamente");
  res.redirect("/roles");
};

export const deleteRole = async (req, res) => {
  await roleService.deleteRole(req.params.id);
  req.flash("message", "Rol eliminado");
  res.redirect("/roles");
};
