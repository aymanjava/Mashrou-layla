const loader = require('./loader');
const { EventController } = require('../handlers/EventController');
const { SpamController } = require('../handlers/SpamController');
const { AutoReplyController } = require('../handlers/AutoReplyController');
const { MoodController } = require('../handlers/MoodController');
const { CommandController } = require('../handlers/CommandController');
const utils = require('../utils/fileDB');

module.exports = class Listener {
    constructor(bot) {
        this.bot = bot;
        this.commands = loader.loadCommands();
        this.events = loader.loadEvents();
        this.features = loader.loadFeatures();
    }

    async start() {
        console.log('🟢 Listener is now running...');

        this.bot.listen(async (event) => {
            try {
                // 1️⃣ فلترة السبام
                if(await SpamController.isSpam(event.senderID)) return;

                // 2️⃣ تحديد المزاج
                const mood = MoodController.updateMood(event);

                // 3️⃣ تنفيذ الأوامر
                if(event.body && event.body.startsWith('!')) {
                    await CommandController.handle(event, this.commands);
                }

                // 4️⃣ الردود التلقائية
                await AutoReplyController.handle(event);

                // 5️⃣ تمرير الحدث للأحداث العامة
                if(this.events[event.type]) {
                    await EventController.handle(event, this.events[event.type]);
                }

            } catch (err) {
                console.error('Listener Error:', err);
            }
        });
    }
};
