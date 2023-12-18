import { sequelize } from "../utils/db.mjs";
import { DataTypes } from "sequelize";

const userModel = sequelize.define(
  "sangat",
  {
    sangat_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    profile_avatar: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    getterMethods: {
      fullName() {
        return this.first_name + " " + this.last_name;
      },
    },
  }
);

userModel.beforeSave(async (user, options) => {
  user.email = user.email.toLowerCase();
});

export default userModel;
