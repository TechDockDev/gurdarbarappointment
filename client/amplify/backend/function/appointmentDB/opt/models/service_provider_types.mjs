import { sequelize } from "../utils/db.mjs";
import { DataTypes } from "sequelize";

const serviceProviderTypesModel = sequelize.define(
  "gurudwara",
  {
    gurudwara_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gurudwara_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default serviceProviderTypesModel;
