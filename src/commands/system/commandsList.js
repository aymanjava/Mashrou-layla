module.exports = {
  name: "اوامر",
  description: "📜 عرض جميع أوامر بوت ليلى",
  execute({ api, event }) {
    const commands = Array.from(global.Layla.commands.keys());
    let msg = "🎶 قائمة أوامر ليلى:\n\n";
    for (const cmd of commands) {
      msg += `• ${global.Layla.config.prefix}${cmd}\n`;
    }
    api.sendMessage(msg, event.threadID);
  }
};
