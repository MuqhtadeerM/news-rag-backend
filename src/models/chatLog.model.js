import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ChatLog = sequelize.define(
  "ChatLog",
  {
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userQuery: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    llmResponse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    responseTimeMs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
