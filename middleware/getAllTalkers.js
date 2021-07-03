const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'talker.json');

const getAllTalkers = async (req, res) => {
  const talkers = await fs.readFile(filePath, 'utf8')
   .then((result) => JSON.parse(result));

  if (talkers.length === 0) return res.status(200).json([]);
  return res.status(200).json(talkers);
};

module.exports = getAllTalkers;