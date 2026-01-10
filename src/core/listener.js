const antiSpam = require("../utils/antiSpam");
const autoReply = require("../utils/autoReply");
const modes = require("../utils/modes");
const blacklist = require("../utils/blacklist");

module.exports = async function listener(err, event) {
  if (err) return;

  const { api, events, config } = global.Layla;

  // تجاهل البوت نفسه
  if (event.senderID === api.getCurrentUserID()) return;

  // تحقق Blacklist
  if (blacklist.isBlacklisted(event.senderID)) return;

  // تحقق Silent / Maintenance Mode
  if (modes.isSilent() || modes.isMaintenance()) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
  }

  // Anti-spam
  if (antiSpam.check(event.senderID)) return;

  // Events
  if (events.has(event.type)) {
    try {
      events.get(event.type).execute({ api, event });
    } catch (e) {
      console.error("Event error:", e);
    }
  }

  // Commands (جاهزة للتفعيل لاحقًا)
  if (event.type === "message" && event.body) {
    const prefix = config.prefix;
    if (!event.body.startsWith(prefix)) return;

    const args = event.body.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = global.Layla.commands.get(commandName);
    if (command) {
      try {
        command.execute({ api, event, args });
      } catch (e) {
        api.sendMessage("⚠️ خطأ داخلي.", event.threadID);
        console.error("Command error:", e);
      }
    }
  }

  // Auto-reply ذكي
  if (event.body) {
    const reply = autoReply.getReply(event.body);
    if (reply) api.sendMessage(reply, event.threadID);
  }
};
