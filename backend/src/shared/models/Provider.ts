import * as Sequelize from "sequelize";

import Config from "../../shared/config/Config";
import { getAge } from "../../shared/utils/utils";

//export interface PrimaryKey extends Number {}; // primary key is a uuid thus a string.

export interface Attributes {
    id: number;
    uid: string;
    public_name: string;
    //password: string;
    //salt: string;
}

export default function createModel(sequelize, Sequelize) {
    let Provider = sequelize.define("Provider", {
      userId: {
        type: Sequelize.BIGINT, 
        allowNull: false,
        primaryKey: true
      },
      publicName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM("man", "woman"),
        defaultValue: "woman"
      },
      forMen: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      forWomen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      publicPhoneNumber: {
        type: Sequelize.STRING,
        unique: true
      },
      realName: {
        type: Sequelize.JSON
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      height: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING,
        get: function () {
            return this.getDataValue('description').split(';');
        },
        set: function (val) {
           this.setDataValue('description',val.join(';'));
        }
      },
      offers: {
        type: Sequelize.STRING,
        get: function () {
            return this.getDataValue('offers').split(';');
        },
        set: function (val) {
           this.setDataValue('offers',val.join(';'));
        }
      },
      place: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.UUID,
        get: function () {
            return this.getDataValue('images').split(';');
        },
        set: function (val) {
           this.setDataValue('images',val.join(';'));
        }
      },
      profileImage: {
        type: Sequelize.UUID,
      },
      email: {
        type: Sequelize.STRING,
        unique: true
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
            Provider.belongsTo(models.User, {
              foreignKey: "userId", // fk in current model
              targetKey: "id" // reference primary key in other model
            });
          }
        },
        instanceMethods: {
            getJsonObject: function() {
                return {
                    public_name: this.publicName
                };
            },
            getSearchJson: function() {
              const age = getAge(this.getUser().dateOfBirth);
              const {  publicName, gender, forMen, forWomen, publicPhoneNumber, height, description, offers, place, images, profileImage } = this;
              return { publicName, gender, forMen, forWomen, publicPhoneNumber, height, description, offers, place, images, profileImage, age };
            }
        }
    });

    return Provider;
}