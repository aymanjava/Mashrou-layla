module.exports = {
  name: "CommandController",

  async handle(event, ctx) {
    const body = event.body || "";
    if (!body.startsWith(".")) return;

    const [cmd, ...args] = body.slice(1).split(" ");
    const command = ctx.commands[cmd];
    if (!command) return;

    await command.run({
      api: ctx.api,
      event,
      args,
      utils: ctx.utils
    });
  }
};
