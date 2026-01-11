const config = require('../../config/bot.config.js');

module.exports = (api, commands, events) => {
    return async (event) => {
        // 1. معالجة الأوامر النصية
        if (event.body && event.body.startsWith(config.prefix)) {
            const args = event.body.slice(config.prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = commands.get(commandName);

            if (command) {
                try {
                    await command.run({ api, event, args });
                } catch (e) {
                    api.sendMessage("❌ حدث لحن خاطئ (خطأ في التنفيذ).", event.threadID);
                }
            }
        }

        // 2. معالجة الأحداث (دخول/خروج/تفاعل)
        if (event.logMessageType === "log:subscribe") {
            if (events.has("user_join")) events.get("user_join")({ api, event });
        }
        if (event.logMessageType === "log:unsubscribe") {
            if (events.has("user_leave")) events.get("user_leave")({ api, event });
        }
    };
};
