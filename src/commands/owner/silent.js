const modes = require("../../utils/modes");
module.exports = {
  name: "silent",
  description: "🤫 تفعيل أو تعطيل وضع الصمت",
  execute({ api, event }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    const state = modes.toggleSilent();
    api.sendMessage(`🤐 Silent Mode ليلى: ${state ? "مفعّل" : "موقوف"}`, event.threadID);
  }
};
