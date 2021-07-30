const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const User = require('./controllers/Users');
const Login = require('./controllers/Login');
const Category = require('./controllers/Categories');

const { JwtValidator } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user/:id', JwtValidator, rescue(User.getUserById));
app.post('/user', rescue(User.addUser));
app.get('/user', JwtValidator, rescue(User.getAllUsers));

app.post('/login', rescue(Login));

app.post('/categories', JwtValidator, rescue(Category.addCategory));

app.use((err, _req, res, _next) => res.status(err.code).json({ message: err.message }));
