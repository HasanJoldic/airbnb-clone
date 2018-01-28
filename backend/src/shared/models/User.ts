import * as Sequelize from "sequelize";

import { getAge } from "../utils/utils";

import Config from "../../shared/config/Config";
import storage from "./storage";


//export interface PrimaryKey extends Number {}; // primary key is a uuid thus a string.

export interface Attributes {
    id: number;
    uid: string;
    public_name: string;
    //password: string;
    //salt: string;
}

export default function createModel(sequelize, Sequelize) {
    let User = sequelize.define("User", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
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
          User.hasMany(models.AccessToken, {
            onDelete: "CASCADE"
          });
          User.hasOne(models.Client, {
            onDelete: "CASCADE"
          });
          User.hasOne(models.Provider, {
            onDelete: "CASCADE"
          });
          //User.hasMany(models.PasswordResetToken, {
          //  onDelete: "CASCADE"
          //});
        },
      },
      instanceMethods: {
      }
    }
  );
  return User;
}