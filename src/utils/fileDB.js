const fs = require('fs-extra');

module.exports = {
    read: (path) => {
        if (!fs.existsSync(path)) fs.writeJsonSync(path, {});
        return fs.readJsonSync(path);
    },
    write: (path, data) => {
        fs.writeJsonSync(path, data, { spaces: 4 });
    }
};
