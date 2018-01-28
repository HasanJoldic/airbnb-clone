'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AccessTokens', {
      userId: {
        type: Sequelize.BIGINT,
        references: {
            model: "Users",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AccessTokens');
  }
};