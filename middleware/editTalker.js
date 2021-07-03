const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'talker.json');

const updatedTalker = async (req, res) => {
  const talkerList = await fs.readFile(filePath, 'utf8')
    .then((data) => JSON.parse(data));

  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const editedTalker = { id: Number(id), name, age, talk: { watchedAt, rate } };

  const editedList = talkerList.map((data) => {
    if (editedTalker.id === data.id) return editedTalker;
    return data;
  });

  await fs.writeFile(filePath, JSON.stringify(editedList));
  return res.status(200).json(editedTalker);
};

module.exports = updatedTalker;
