const fs = require('fs-extra');
const path = require('path');

module.exports = (api) => {
    const commands = new Map();
    const cmdPath = path.join(__dirname, '../modules/commands');

    // وظيفة البحث العميق في المجلدات
    const loadCommands = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                loadCommands(fullPath); // يدخل للمجلدات الفرعية (admin/fun/...)
            } else if (file.endsWith('.js')) {
                const cmd = require(fullPath);
                if (cmd.config && cmd.config.name) {
                    commands.set(cmd.config.name, cmd);
                }
            }
        });
    };

    loadCommands(cmdPath);
    console.log(`🚀 [ LAYLA MEGA ] تم تفعيل ${commands.size} أمر من المجلدات!`);
    return { commands };
};
