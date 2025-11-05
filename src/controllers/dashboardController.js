import * as dashboardService from "../services/dashboardService.js";

export const showDashboard = (req, res) => {
  const view = dashboardService.getDashboardView(req.session.user.role.name);
  res.render(view, { user: req.session.user });
};