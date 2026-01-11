const fs = require('fs-extra');
const path = require('path');

module.exports = () => {
    const commands = new Map();
    const cmdPath = path.join(__dirname, '../modules/commands');

    const loadDir = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                loadDir(fullPath); // يدخل للمجلدات الفرعية
            } else if (file.endsWith('.js')) {
                const cmd = require(fullPath);
                if (cmd.config && cmd.config.name) {
                    commands.set(cmd.config.name, cmd);
                }
            }
        }
    };

    loadDir(cmdPath);
    console.log(`✅ تم تحميل ${commands.size} أمر بنجاح!`);
    return commands;
};
