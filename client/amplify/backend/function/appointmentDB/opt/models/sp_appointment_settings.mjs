import { sequelize } from "../utils/db.mjs";
import { DataTypes } from "sequelize";
import ProviderModel from "./service_providers.mjs";

const spAppointmentSettings = sequelize.define(
  "gurudwara_appointment_settings",
  {
    gurudwara_settings_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gurudwara_setting: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

spAppointmentSettings.belongsTo(ProviderModel, {
  foreignKey: {
    name: "account_manager_id",
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
});

export default spAppointmentSettings;
