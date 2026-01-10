module.exports = async function listener(err, event) {
  if (err) return console.error("Listener error:", err);

  const { api, events, commands, config } = global.Layla;

  // Events
  if (events.has(event.type)) {
    try {
      await Promise.resolve(events.get(event.type).execute({ api, event }));
    } catch (e) {
      console.error("Event error:", e);
      try { api.sendMessage("⚠️ خطأ في الحدث.", event.threadID); } catch {}
    }
  }

  // Commands
  if (event.type === "message" && event.body) {
    if (!event.body.startsWith(config.prefix)) return;

    const args = event.body.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commands.has(commandName)) return;

    try {
      await Promise.resolve(commands.get(commandName).execute({ api, event, args }));
    } catch (e) {
      console.error("Command error:", e);
      try { api.sendMessage("⚠️ خطأ داخلي في الأمر.", event.threadID); } catch {}
    }
  }
};
