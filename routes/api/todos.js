const {Todo} = require('../../models');

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

  return res.status(200).json(todos);
});

router.post('/', async (req, res) => {
  let todo;

  try {
    todo = await Todo.create({title: req.body.title});
  } catch (e) {
    console.log(e);
  }

  return res.status(201).json(todo);
});

router.get('/:id', async (req, res) => {
  let todo

  try {
    todo = await Todo.findByPk(req.params.id);
  } catch (e) {
    console.log(e);
  }

  return res.status(200).json(todo);
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

  return res.status(200).json(todo);
});

router.delete('/:id', async (req, res) => {
  let todo;

  try {
    todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
  } catch (e) {
    console.log(e);
  }
  return res.status(200).json(todo);
});

module.exports = router;
