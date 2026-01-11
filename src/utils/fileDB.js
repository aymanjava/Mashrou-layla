const fs = require('fs');
const path = require('path');

function readJSON(file) {
  const fullPath = path.join(__dirname, '../../database', file);
  if (!fs.existsSync(fullPath)) return {};
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

function writeJSON(file, data) {
  const fullPath = path.join(__dirname, '../../database', file);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };
