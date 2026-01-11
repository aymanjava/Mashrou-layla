const fs = require('fs');
const path = require('path');

function log(type, message) {
  const logPath = path.join(__dirname, '../../logs', `${type}.log`);
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
}

module.exports = { log };
