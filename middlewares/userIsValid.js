const UserSchema = require('../schemas/UserSchema');

const userIsValid = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { code, message } = UserSchema.validate(displayName, email, password);

  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

const loginIsValid = (req, res, next) => {
  const { email, password } = req.body;
  const { code, message } = UserSchema.validateLogin(email, password);

  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

module.exports = { userIsValid, loginIsValid };