const express = require('express');
const app = express();

// import middleware

// import routes
app.get('/', (req, res) => {
  return res.json({message: 'hello world!'});
});

// listener
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
