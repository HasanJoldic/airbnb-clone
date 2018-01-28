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
    let RegistrationToken = sequelize.define("RegistrationToken", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false
      },
      userType: {
        type: Sequelize.ENUM("provider", "client"),
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING
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
      instanceMethods: {
      }
    }
  );
    return RegistrationToken;
}