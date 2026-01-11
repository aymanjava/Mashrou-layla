class Listener {
  constructor(bot) {
    this.bot = bot;
  }

  listenAll() {
    this.bot.client.on('message', async (event) => {
      await this.bot.events.handleEvent('message', event);
    });

    this.bot.client.on('event', async (event) => {
      await this.bot.events.handleEvent(event.type, event);
    });
  }
}

module.exports = Listener;
