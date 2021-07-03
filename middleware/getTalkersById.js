const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'talker.json');

const getTalkersById = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(filePath, 'utf8')
   .then((result) => JSON.parse(result));

  const talkerById = talkers.find((valueId) => valueId.id === Number(id));
  if (!talkerById) {
    return res.status(404).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).send(talkerById);
};

module.exports = getTalkersById;