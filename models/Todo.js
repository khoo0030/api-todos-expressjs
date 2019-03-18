'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deleted_at: {
      type: DataTypes.STRING
    },
  }, {
    // model options
    createdAt: 'created_at', // required to rename timestamp attribute createdAt
    updatedAt: 'updated_at', // required to rename timestamp attribute updatedAt
    tableName: 'todos', // set the table name, use this when model name does not fit sequelize convention
  });

  Todo.associate = function (models) {
    // associations can be defined here
  };

  return Todo;
};