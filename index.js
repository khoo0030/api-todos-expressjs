const express = require('express');
const app = express();
const {Todo} = require('./models');

// import middleware

// import routes
app.get('/', async (req, res) => {
  const todos = await Todo.findAll();
  // return res.json({message: 'hello world!'});
  return res.status(200).json(todos);
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
