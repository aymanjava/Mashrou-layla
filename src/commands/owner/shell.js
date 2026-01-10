const { exec } = require("child_process");

module.exports = {
  name: "shell",
  description: "🖥️ تنفيذ أوامر شل",
  execute({ api, event, args }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    const command = args.join(" ");
    if (!command) return api.sendMessage("⚠️ اكتب الأمر أولًا", event.threadID);
    exec(command, (err, stdout, stderr) => {
      if (err) return api.sendMessage("❌ Error:\n" + err.message, event.threadID);
      api.sendMessage("✅ Output:\n" + (stdout || stderr), event.threadID);
    });
  }
};
