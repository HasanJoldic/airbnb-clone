module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clients', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clients');
  }
};