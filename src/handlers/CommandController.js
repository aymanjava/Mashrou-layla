class CommandController {
  constructor(bot) {
    this.bot = bot;
    this.commands = new Map();
  }

  register(command) {
    this.commands.set(command.name, command);
  }

  async handle(message) {
    const args = message.body.split(' ');
    const cmdName = args.shift().toLowerCase();
    if (this.commands.has(cmdName)) {
      try {
        await this.commands.get(cmdName).execute(this.bot, message, args);
      } catch (err) {
        console.error('Command error:', err);
      }
    }
  }
}

module.exports = { CommandController };
