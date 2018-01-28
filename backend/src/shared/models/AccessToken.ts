import * as Sequelize from "sequelize";

import { getAge } from "../utils/utils";

import Config from "../../shared/config/Config";

//export interface PrimaryKey extends Number {}; // primary key is a uuid thus a string.

export interface Attributes {
    id: number;
    uid: string;
    public_name: string;
    //password: string;
    //salt: string;
}

export default function createModel(sequelize, Sequelize) {
    let AccessToken = sequelize.define("AccessToken", {
      token: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
        primaryKey: true
      },
      validUntil: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      classMethods: {
        associate: function(models) {
          AccessToken.belongsTo(models.User);
        }
      }
    }
  );
    return AccessToken;
}