const config = require('../config/bot.config.js');

module.exports = (api, commands) => {
    return async (event) => {
        if (!event.body || !event.body.startsWith(config.prefix)) return;

        const args = event.body.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName);

        if (command) {
            // فحص الصلاحيات (Admin/Owner)
            if (command.config.category === "owner" && event.senderID !== config.ownerID) {
                return api.sendMessage("⚠️ هذا الأمر مخصص للمطور فقط.", event.threadID);
            }

            try {
                await command.run({ api, event, args });
            } catch (error) {
                console.error(error);
                api.sendMessage("❌ حدث خطأ أثناء تنفيذ الأمر.", event.threadID);
            }
        }
    };
};
