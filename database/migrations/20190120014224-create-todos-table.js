'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/sequelize.config')[env];

const options = {
  charset: config.define.charset,
  collate: config.define.dialectOptions.collate,
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    }, options);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos');
  }
};
