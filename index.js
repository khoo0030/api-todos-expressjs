const express = require('express');
const app = express();
const {Todo} = require('./models');

// import middleware
app.use(express.json()); // to read request body

// import routes
app.get('/api/v1/todos', async (req, res) => {
  const todos = await Todo.findAll();

  return res.status(200).json(todos);
});

app.post('/api/v1/todos', async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title
  });

  return res.status(201).json(todo);
});

app.get('/api/v1/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  return res.status(200).json(todo);
});

app.put('/api/v1/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  todo.title = req.body.title;
  await todo.save();

  return res.status(200).json(todo);
});

app.delete('/api/v1/todos/:id', async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  await todo.destroy();

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

module.exports = server;
