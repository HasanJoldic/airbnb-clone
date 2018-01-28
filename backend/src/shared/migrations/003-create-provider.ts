module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Providers', {
      userId: {
        type: Sequelize.BIGINT,
        primaryKey: true, // the foreign key of the User is the primary key of the AppUserProfile
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Providers');
  }
};