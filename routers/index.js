const express = require('express');
const middleware = require('../middleware');

const talkerRouter = express.Router();

talkerRouter.get('/', middleware.getAllTalkers);
talkerRouter.get('/:id', middleware.getTalkerById);

talkerRouter.post('/',
  middleware.authMiddleware,
  middleware.validateName,
  middleware.validateAge,
  middleware.validateTalk,
  middleware.validateData,
  middleware.validateRate,
  middleware.createTalker);

talkerRouter.put('/:id',
  middleware.authMiddleware,
  middleware.validateName,
  middleware.validateAge,
  middleware.validateTalk,
  middleware.validateData,
  middleware.validateRate,
  middleware.updatedTalker);

talkerRouter.delete('/:id', middleware.authMiddleware, middleware.deleteTalker);
talkerRouter.get('/search?q=searchTerm', middleware.authMiddleware);

module.exports = talkerRouter;