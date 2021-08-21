const router = require('express').Router();
const { UserController } = require('../controllers');
const validators = require('../validators');

router.post('/user', validators.createUser, UserController.createUser);
router.post('/login', validators.login, UserController.login);

module.exports = router;