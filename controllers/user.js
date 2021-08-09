const rescue = require('express-rescue');

const {
  validateUser,
  hasDuplicatedEmail,
  validateToken,
} = require('../middlewares/validations');
const userServices = require('../services/user');

const createUser = [
  validateUser,
  hasDuplicatedEmail,
  rescue(async (req, res) => {
    const token = await userServices.user(req.body);
    return res.status(201).json({ token });
  }),
];

const getUsers = [
  validateToken,
  rescue(async (_req, res) => {
    const users = await userServices.findAllUsers();
    return res.status(200).json(users);
  }),
];

const getUserById = [
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const user = await userServices.findById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  }),
];

module.exports = { createUser, getUsers, getUserById };