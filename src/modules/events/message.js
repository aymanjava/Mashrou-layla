module.exports = {
  name: 'message',
  async execute(bot, event) {
    if (!event.body) return;
    await bot.commands.handle(event);
  }
};
