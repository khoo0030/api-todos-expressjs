const express = require('express');
const app = express();
const helmet = require('helmet');
const todos = require('./routes/api/todos');

// use middleware
app.use(express.json()); // to read request body
app.use(helmet()); // for http headers

// use routes
app.use('/api/v1/todos', todos);

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
