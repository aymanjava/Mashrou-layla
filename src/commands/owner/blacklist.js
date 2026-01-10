const blacklist = require("../../utils/blacklist");
module.exports = {
  name: "blacklist",
  description: "🚫 إضافة أو إزالة مستخدم من القائمة السوداء",
  execute({ api, event, args }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    const action = args[0];
    const userID = args[1];
    if (!action || !userID) return api.sendMessage("⚠️ استخدم: blacklist add/remove <userID>", event.threadID);
    if (action === "add") {
      blacklist.add(userID);
      api.sendMessage(`🚫 تم حظر ${userID}`, event.threadID);
    } else if (action === "remove") {
      blacklist.remove(userID);
      api.sendMessage(`✅ تم رفع الحظر عن ${userID}`, event.threadID);
    }
  }
};
