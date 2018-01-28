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

export interface IClientShare {
  realName: boolean;
  publicPhoneNumber: boolean;
  age: boolean;
}

export default function createModel(sequelize, Sequelize) {
    let Client = sequelize.define("Client", {
      userId: {
        type: Sequelize.BIGINT, 
        allowNull: false,
        primaryKey: true
      },
      // all Workers can see
      publicName: {
        type: Sequelize.STRING
      },
      // Client can see and share with Workers
      publicPhoneNumber: {
        type: Sequelize.STRING,
        unique: true
      },
      // Client can see and share with Workers
      realName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM("man", "woman"),
        defaultValue: "man"
      },
      forMen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      forWomen: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      // all Workers can see
      profileImage: {
        type: Sequelize.UUID,
        unique: true,
      },
      // no one can see
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true
      },
      // Client can see, but not share
      share: {
        type: Sequelize.JSON
      },
      // no one can see
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // no one can see
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      classMethods: {
        associate: function(models) {
          Client.belongsTo(models.User, {
            foreignKey: "userId", // fk in current model
            targetKey: "id" // reference primary key in other model
          });
        }
      },
      instanceMethods: {
        getJsonObjectForUser: function() {
          const {  uid, publicName, realName, publicPhoneNumber, profileImage, phoneNumber } = this;
          return { uid, publicName, realName, publicPhoneNumber, profileImage, phoneNumber };
        },
        getJsonObjectForOthers: function() {
          const {               uid, publicName, images, profileImage } = this;
          let toReturn: any = { uid, publicName, images, profileImage };
          const share = this.share;
          if (share.publicPhoneNumber) {
            toReturn = { ...toReturn, publicPhoneNumber: this.publicPhoneNumber };
          }
          if (share.realName)  {
            toReturn = { ...toReturn, realName: this.realName };
          }
          if (share.age)  {
            const age = getAge(this.getUser().dateOfBirth);
            toReturn = { ...toReturn, age };
          }
          return toReturn;
        },
      }
    }
  );
  return Client;
}