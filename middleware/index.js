const getAllTalkers = require('./getAllTalkers');
const getTalkerById = require('./getTalkersById');
const updatedTalker = require('./editTalker');
const deleteTalker = require('./deleteTalker');
const { login, emailValidation, passwordValidation } = require('./login');
const {
  createTalker,
  authMiddleware,
  validateName,
  validateAge,
  validateTalk,
  validateData,
  validateRate,
} = require('./createTalker');

module.exports = {
  getAllTalkers,
  getTalkerById,
  login,
  emailValidation,
  passwordValidation,
  createTalker,
  authMiddleware,
  validateName,
  validateAge,
  validateTalk,
  validateData,
  validateRate,
  updatedTalker,
  deleteTalker,
};