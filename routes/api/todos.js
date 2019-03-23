const {Todo} = require('../../models');
const httpStatus = require('http-status-codes');

// create an express application
const express = require('express');

// express router
const router = express.Router();

// import routes
router.get('/', async (req, res) => {
  let todos;

  try {
    todos = await Todo.findAll();
  } catch (e) {
    console.log(e);
  }

  return res.status(httpStatus.OK).json(todos);
});

router.post('/', async (req, res) => {
  let todo;

  try {
    todo = await Todo.create({title: req.body.title});
  } catch (e) {
    console.log(e);
  }

  return res.status(httpStatus.CREATED).json(todo);
});

router.get('/:id', async (req, res) => {
  let todo

  try {
    todo = await Todo.findByPk(req.params.id);
  } catch (e) {
    console.log(e);
  }

  return res.status(httpStatus.OK).json(todo);
});

router.put('/:id', async (req, res) => {
  let todo;

  try {
    todo = await Todo.findByPk(req.params.id);

    todo.title = req.body.title;
    await todo.save();
  } catch (e) {
    console.log(e);
  }

  return res.status(httpStatus.OK).json(todo);
});

router.delete('/:id', async (req, res) => {
  let todo;

  try {
    todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
  } catch (e) {
    console.log(e);
  }
  return res.status(httpStatus.OK).json(todo);
});

module.exports = router;
