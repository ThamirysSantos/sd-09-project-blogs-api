const { validateUser, userLogin } = require('../services/user');

const CODE_201 = 201;
const CODE_200 = 200;
const CODE_409 = 409;
const CODE_400 = 400;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createNewUser = await validateUser(displayName, email, password, image);
    return res.status(CODE_201).json(createNewUser);
  } catch (err) {
    if (err.message === 'User already registered') {
      return res.status(CODE_409).json({ message: err.message });
    }
    return res.status(CODE_400).json({
      message: err.message,
    });
  }
};

const newLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userLogin(email, password);
    return res.status(CODE_200).json({ token: userData });
  } catch (err) {
    return res.status(CODE_400).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  newLogin,
};
