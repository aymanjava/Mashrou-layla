module.exports = async function listener(err, event) {
  if (err) return;

  const { api, events, config, commands } = global.Layla;

  // Events
  if (events.has(event.type)) {
    try {
      events.get(event.type).execute({ api, event });
    } catch (e) {
      console.error("❌ Event error:", e);
    }
  }

  // Commands
  if (event.type === "message" && event.body) {
    if (!event.body.startsWith(config.prefix)) return;

    const args = event.body.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (!command) return;

    try {
      command.execute({ api, event, args });
    } catch (e) {
      api.sendMessage("⚠️ حدث خطأ داخلي.", event.threadID);
      console.error("❌ Command error:", e);
    }
  }
};
