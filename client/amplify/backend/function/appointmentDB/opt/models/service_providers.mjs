import serviceProviderTypesModel from "./service_provider_types.mjs";
import { sequelize } from "../utils/db.mjs";
import { DataTypes } from "sequelize";

const ProviderModel = sequelize.define(
  "account_manager",
  {
    account_manager_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    account_manager_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_manager_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    account_manager_phone: {
      type: DataTypes.STRING,
    },
    profile_avatar: {
      type: DataTypes.STRING,
    },
    account_manager_address: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

ProviderModel.belongsTo(serviceProviderTypesModel, {
  foreignKey: "gurudwara_id",
  type: DataTypes.INTEGER,
  allowNull: false,
});

export default ProviderModel;
