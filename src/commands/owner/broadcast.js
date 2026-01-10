const fs = require("fs");
const path = require("path");

module.exports = {
  name: "broadcast",
  description: "📢 إرسال رسالة لكل الثريدات",
  execute({ api, event, args }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    const threadsPath = path.join(__dirname, "../../database/threads.json");
    const threads = JSON.parse(fs.readFileSync(threadsPath));
    const message = args.join(" ");
    if (!message) return api.sendMessage("⚠️ اكتب الرسالة أولًا", event.threadID);
    for (const tID in threads) {
      api.sendMessage(message, tID);
    }
    api.sendMessage("✅ تم الإرسال لجميع الثريدات", event.threadID);
  }
};
