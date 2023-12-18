import { sequelize } from "../utils/db.mjs";
import { DataTypes } from "sequelize";

const appointmentStatusModel = sequelize.define("appointment_statuses", {
  appointment_status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  appointment_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default appointmentStatusModel;
