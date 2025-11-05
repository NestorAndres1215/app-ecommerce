import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Role from "./Role.js";
import Status from "./Status.js";

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  email: { // <-- agregado
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  registerDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM("masculino", "femenino", "otro"),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  tableName: "users",
  timestamps: false
});

// Relaciones
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

User.belongsTo(Status, { foreignKey: "statusId", as: "status" });
Status.hasMany(User, { foreignKey: "statusId", as: "users" });

export default User;
