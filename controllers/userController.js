const express = require('express');
const mdwLogin = require('../middlewares/mdwLogin');
const mdwUser = require('../middlewares/mdwUser');

const userRouter = express.Router();

userRouter.get('/', mdwLogin.tokenValidator, mdwUser.getAllUsers);

userRouter.post('/', mdwUser.userObjectValidator, mdwUser.postUser);

module.exports = userRouter;