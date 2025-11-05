import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Status = sequelize.define("Status", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  tableName: "status",
  timestamps: false
});

export default Status;
