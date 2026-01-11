const fs = require('fs');
const path = require('path');

class EventController {
    constructor(bot) {
        this.bot = bot;
        this.events = new Map();
        this.loadEvents();
    }

    loadEvents() {
        const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(f => f.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
            this.events.set(event.name, event);
        }
        console.log(`[EventController] تم تحميل ${this.events.size} حدث.`);
    }

    async handle(eventName, eventData) {
        if (this.events.has(eventName)) {
            try {
                await this.events.get(eventName).execute(this.bot, eventData);
            } catch (err) {
                console.error(`[EventController] خطأ في حدث ${eventName}:`, err);
            }
        }
    }
}

module.exports = EventController;
