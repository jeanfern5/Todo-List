const express = require('express'); // import the express package

const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from Express');
});

// watch for connections on port 8080
server.listen(8080, () =>
  console.log('\nServer running on http://localhost:8080\n')
);