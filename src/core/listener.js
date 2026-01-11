const config = require('../../config/bot.config.js');

module.exports = (api, commands) => {
    return async (event) => {
        if (!event.body || !event.body.startsWith(config.prefix)) return;

        const args = event.body.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName);

        if (command) {
            try {
                // تشغيل الأمر المختار
                await command.run({ api, event, args });
            } catch (e) {
                console.error(e);
                api.sendMessage("❌ عذراً، واجهت مشكلة في تنفيذ هذا الأمر.", event.threadID);
            }
        }
    };
};
