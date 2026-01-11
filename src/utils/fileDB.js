const fs = require('fs');
const path = require('path');

module.exports = {
    read: (file) => {
        const filePath = path.join(__dirname, `../database/${file}.json`);
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    },
    write: (file, data) => {
        const filePath = path.join(__dirname, `../database/${file}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    },
    append: (file, key, value) => {
        const db = module.exports.read(file);
        db[key] = value;
        module.exports.write(file, db);
    }
};
