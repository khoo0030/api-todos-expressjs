const {Todo} = require('../../models');
const httpStatus = require('http-status-codes');
const exceptions = require('../../app/http/exception');

// create an express application
const express = require('express');

// express router
const router = express.Router();

// express validator
const {check, validationResult} = require('express-validator/check');

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

router.post('/', [
  check('title')
  .isString().withMessage('title must be string')
  .isLength({min: 1, max: 255}).withMessage('title must be between 1 and 255 characters'),
], async (req, res) => {
  let todo;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(exceptions.validationError(errors.array()));
    }

    todo = await Todo.create({title: req.body.title});
  } catch (e) {
    console.log(e);
  }

  return res.status(httpStatus.CREATED).json(todo);
});

router.get('/:id', async (req, res) => {
  let todo;

  try {
    todo = await Todo.findByPk(req.params.id);

    if (todo === null) {
      return res.status(httpStatus.NOT_FOUND).json(exceptions.httpNotFound);
    }
  } catch (e) {
    console.log(e);
  }

  return res.status(httpStatus.OK).json(todo);
});

router.put('/:id', [
  check('title')
  .isString().withMessage('title must be string')
  .isLength({min: 1, max: 255}).withMessage('title must be between 1 and 255 characters'),
], async (req, res) => {
  let todo;

  try {
    todo = await Todo.findByPk(req.params.id);

    if (todo === null) {
      return res.status(httpStatus.NOT_FOUND).json(exceptions.httpNotFound);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(exceptions.validationError(errors.array()));
    }

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

    if (todo === null) {
      return res.status(httpStatus.NOT_FOUND).json(exceptions.httpNotFound);
    }

    await todo.destroy();
  } catch (e) {
    console.log(e);
  }
  return res.status(httpStatus.OK).json(todo);
});

module.exports = router;
