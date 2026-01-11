const fs = require('fs-extra');
const path = require('path');

module.exports = (api) => {
    const commands = new Map();
    const events = new Map();

    const cmdPath = path.join(__dirname, '../modules/commands');
    const eventPath = path.join(__dirname, '../modules/events');

    // وظيفة التحميل التلقائي من المجلدات الفرعية
    const loadFiles = (dir, collection) => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                loadFiles(fullPath, collection);
            } else if (file.endsWith('.js')) {
                const module = require(fullPath);
                const name = module.config?.name || module.name;
                if (name) collection.set(name, module);
            }
        });
    };

    loadFiles(cmdPath, commands);
    loadFiles(eventPath, events);

    console.log(`🚀 [ LAYLA ] تم تحميل ${commands.size} أمر و ${events.size} حدث.`);
    return { commands, events };
};
