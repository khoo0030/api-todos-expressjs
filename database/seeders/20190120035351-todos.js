'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('todos', [
      {title: ' Todo 1', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 2', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 3', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 4', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 5', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 6', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 7', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 8', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 9', created_at: '2018-07-07', updated_at: '2018-07-07'},
      {title: ' Todo 10', created_at: '2018-07-07', updated_at: '2018-07-07'},
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
