'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1234,
      password: 'passw0rd',
      dateOfBirth: new Date(),
      uid: "test-uid1",
      email: "joldic.hasan@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2345,
      password: 'passw0rd',
      dateOfBirth: new Date(),
      uid: "test-uid2",
      email: "tweezer.beezer@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
