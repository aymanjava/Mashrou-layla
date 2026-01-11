class EventController {
  constructor(bot) {
    this.bot = bot;
    this.events = new Map();
  }

  register(event) {
    this.events.set(event.name, event);
  }

  async handleEvent(eventName, payload) {
    if (this.events.has(eventName)) {
      try {
        await this.events.get(eventName).execute(this.bot, payload);
      } catch (err) {
        console.error(`Event ${eventName} error:`, err);
      }
    }
  }
}

module.exports = { EventController };
