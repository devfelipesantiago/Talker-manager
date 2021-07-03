const crypto = require('crypto');
const { verifyEmail, verifyPassword } = require('../validation');

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailIsValid = verifyEmail(email);
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  const passwordIsValid = verifyPassword(password);
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (!passwordIsValid) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const login = (req, res) => {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token });
};

module.exports = { login, emailValidation, passwordValidation };