import sequelize from "../config/database.js";
import User from "./User.js";
import Role from "./Role.js";
import Status from "./Status.js";

const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");

    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas correctamente");
  } catch (error) {
    console.error("❌ Error al conectar o sincronizar:", error);
  }
};

export { sequelize, User, Role, Status, syncDB };
