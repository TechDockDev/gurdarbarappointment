import { sequelize } from "../utils/db.mjs";
import { DataTypes } from "sequelize";
import userModel from "./users.mjs";
import ProviderModel from "./service_providers.mjs";
import appointmentStatusModel from "./appointment_statuses.mjs";

const appointmentModel = sequelize.define(
  "gurudwara_appointments",
  {
    gurudwara_appointment_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gurudwara_appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    appointment_notes: {
      type: DataTypes.STRING,
    },
    cancellation_reason: {
      type: DataTypes.STRING,
    },
    cancelled_by: {
      type: DataTypes.ENUM("sangat", "gurudwara_sahib"),
    },
  },
  { timestamps: true }
);

appointmentModel.belongsTo(appointmentStatusModel, {
  foreignKey: {
    name: "appointment_status_id",
    type: DataTypes.INTEGER,
  },
});

appointmentModel.belongsTo(userModel, {
  foreignKey: { name: "sangat_id", allowNull: false, type: DataTypes.UUID },
});

appointmentModel.belongsTo(ProviderModel, {
  foreignKey: {
    name: "account_manager_id",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

export default appointmentModel;
