const express = require('express');
const app = express();
const {Todo} = require('./models');

// import middleware
app.use(express.json()); // to read request body

// import routes
app.get('/api/v1/todos', async (req, res) => {
  let todos;

  try {
    todos = await Todo.findAll();
  } catch (e) {
    console.log(e);
  }

  return res.status(200).json(todos);
});

app.post('/api/v1/todos', async (req, res) => {
  let todo;

  try {
    todo = await Todo.create({title: req.body.title});
  } catch (e) {
    console.log(e);
  }

  return res.status(201).json(todo);
});

app.get('/api/v1/todos/:id', async (req, res) => {
  let todo

  try {
    todo = await Todo.findByPk(req.params.id);
  } catch (e) {
    console.log(e);
  }

  return res.status(200).json(todo);
});

app.put('/api/v1/todos/:id', async (req, res) => {
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

app.delete('/api/v1/todos/:id', async (req, res) => {
  let todo;

  try {
    todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
  } catch (e) {
    console.log(e);
  }
  return res.status(200).json(todo);
});

// listener
let port = 3000;
if (process.env.NODE_ENV === 'test') {
  port = 2999;
}

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

function stop() {
  server.close();
}

module.exports = server;
module.exports.stop = stop;
