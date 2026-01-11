const fs = require('fs-extra');
const path = require('path');

module.exports = (api) => {
    const commands = new Map();
    const events = new Map();

    // تحميل الأوامر
    const cmdPath = path.join(__dirname, '../modules/commands');
    const loadCommands = (dir) => {
        fs.readdirSync(dir).forEach(file => {
            const str = path.join(dir, file);
            if (fs.statSync(str).isDirectory()) return loadCommands(str);
            if (!file.endsWith('.js')) return;
            const cmd = require(str);
            commands.set(cmd.config.name, cmd);
        });
    };

    // تحميل الأحداث (ترحيب، مغادرة، تفاعل)
    const eventPath = path.join(__dirname, '../events');
    fs.readdirSync(eventPath).forEach(file => {
        if (!file.endsWith('.js')) return;
        const event = require(path.join(eventPath, file));
        events.set(event.config.name, event);
    });

    loadCommands(cmdPath);
    console.log(`🚀 تم تفعيل العملاق: ${commands.size} أمر | ${events.size} حدث`);
    return { commands, events };
};
