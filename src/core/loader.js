const fs = require('fs');
const path = require('path');

class Loader {
  constructor(bot) {
    this.bot = bot;
  }

  loadCommands() {
    const commandsPath = path.join(__dirname, '../modules/commands');
    const categories = fs.readdirSync(commandsPath);
    for (const category of categories) {
      const files = fs.readdirSync(path.join(commandsPath, category));
      for (const file of files) {
        const command = require(path.join(commandsPath, category, file));
        this.bot.commands.register(command);
      }
    }
  }

  loadEvents() {
    const eventsPath = path.join(__dirname, '../events');
    const files = fs.readdirSync(eventsPath);
    for (const file of files) {
      const event = require(path.join(eventsPath, file));
      this.bot.events.register(event);
    }
  }

  async loadAll() {
    this.loadCommands();
    this.loadEvents();
  }
}

module.exports = Loader;
