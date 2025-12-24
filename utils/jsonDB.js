const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db');

const saveDB = async (resourceName, data) => {
  await writeFile(
    `${DB_PATH}/${resourceName}.json`,
    JSON.stringify(data, null, 2),
    'utf-8'
  );
};

const loadDB = async (resourceName) => {
  try {
    const result = await readFile(`${DB_PATH}/${resourceName}.json`, 'utf-8');
    return JSON.parse(result);
  } catch (error) {
    if (error.code === 'ENOENT') {
      saveDB(resourceName, []);
    }
    return [];
  }
};

module.exports = {
  saveDB,
  loadDB
};
