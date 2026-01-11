const fs = require('fs');
const path = require('path');

module.exports = {
    log: (message) => {
        fs.appendFileSync(path.join(__dirname, '../logs/events.log'), `[${new Date().toISOString()}] ${message}\n`);
    },
    error: (err) => {
        fs.appendFileSync(path.join(__dirname, '../logs/error.log'), `[${new Date().toISOString()}] ${err}\n`);
    }
};
