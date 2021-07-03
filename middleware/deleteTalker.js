const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'talker.json');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(filePath, 'utf8')
    .then((data) => JSON.parse(data));

  const updateTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(filePath, JSON.stringify(updateTalkers));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;