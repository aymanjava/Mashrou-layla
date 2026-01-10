const modes = require("../../utils/modes");
module.exports = {
  name: "maintenance",
  description: "⚙️ تفعيل أو تعطيل وضع الصيانة",
  execute({ api, event }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    const state = modes.toggleMaintenance();
    api.sendMessage(`⚙️ Maintenance Mode ليلى: ${state ? "مفعّل" : "موقوف"}`, event.threadID);
  }
};
