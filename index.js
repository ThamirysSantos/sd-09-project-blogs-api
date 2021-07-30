require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./middlewares/error');
const UserController = require('./controllers/UserController');
const bodyParser = require('body-parser').json();

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser);

app.post('/user', UserController.createUser);

app.use(errorMiddleware);