const fs = require('fs').promises;
const path = require('path');
const verify = require('../validation/index');

const filePath = path.join(__dirname, '..', 'talker.json');

const createTalker = async (req, res) => {
  const talkers = await fs.readFile(filePath, 'utf8')
    .then((result) => JSON.parse(result));

  const id = talkers.length + 1;
  const newUser = { id, ...req.body };

  talkers.push(newUser);
  await fs.writeFile(filePath, JSON.stringify(talkers));
    return res.status(201).json(newUser);
};

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!parseInt(age, 10)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (parseInt(age, 10) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const validateData = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.watchedAt || talk.watchedAt === null) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!verify.verifyData(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.rate && talk.rate !== 0) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (parseInt(talk.rate, 10) <= 0 || parseInt(talk.rate, 10) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  createTalker, authMiddleware, validateName, validateAge, validateTalk, validateData, validateRate,
};