import * as userService from "../services/userService.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";

export const listUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.render("users/list", { users });
};

export const showCreateForm = async (req, res) => {
  const roles = await Role.findAll();
  const statuses = await Status.findAll();
  res.render("users/create", { roles, statuses });
};

export const createUser = async (req, res) => {
  try {
    await userService.createUser(req.body);
    req.flash("success_msg", "Usuario creado correctamente");
    res.redirect("/users");
  } catch (error) {
    req.flash("error_msg", error.message);
    res.redirect("/users/create");
  }
};

export const showEditForm = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  const roles = await Role.findAll();
  const statuses = await Status.findAll();
  res.render("users/edit", { user, roles, statuses });
};

export const updateUser = async (req, res) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    req.flash("success_msg", "Usuario actualizado correctamente");
    res.redirect("/users");
  } catch (error) {
    req.flash("error_msg", error.message);
    res.redirect(`/users/edit/${req.params.id}`);
  }
};

export const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  req.flash("success_msg", "Usuario eliminado correctamente");
  res.redirect("/users");
};
