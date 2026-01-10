module.exports = {
  name: "restart",
  description: "🔄 إعادة تشغيل البوت",
  execute({ api, event }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    api.sendMessage("♻️ جاري إعادة التشغيل…", event.threadID);
    process.exit(0);
  }
};
