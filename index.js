const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', require('./routes/users.routes'));

module.exports = app;
