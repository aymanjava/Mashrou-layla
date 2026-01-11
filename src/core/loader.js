const fs = require('fs-extra');
const path = require('path');

module.exports = (api) => {
    const commands = new Map();
    const commandsPath = path.join(__dirname, '../modules/commands');

    // وظيفة للبحث داخل المجلدات الفرعية
    const loadCommands = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                loadCommands(filePath); // إذا وجد مجلد يدخله (مثل admin)
            } else if (file.endsWith('.js')) {
                const command = require(filePath);
                if (command.config && command.config.name) {
                    commands.set(command.config.name, command);
                    console.log(`✅ تم تحميل الأمر: [${command.config.name}] من ${file}`);
                }
            }
        }
    };

    loadCommands(commandsPath);
    return commands;
};
