const config = require('../config/bot.config.js');

module.exports = (api, commands, events) => {
    return async (event) => {
        // 1. معالجة الأحداث (Events) مثل الدخول والمغادرة
        if (event.type === "event") {
            let handlerName = "";
            if (event.logMessageType === "log:subscribe") handlerName = "user_join";
            else if (event.logMessageType === "log:unsubscribe") handlerName = "user_leave";
            
            const eventHandler = events.get(handlerName);
            if (eventHandler) eventHandler.execute({ api, event });
        }

        // 2. معالجة الأوامر (Commands)
        if (!event.body || !event.body.startsWith(config.prefix)) return;

        const args = event.body.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = commands.get(commandName);

        if (command) {
            try {
                await command.run({ api, event, args });
            } catch (e) {
                api.sendMessage("❌ حدث خطأ في تنفيذ الأمر.", event.threadID);
            }
        }
    };
};
