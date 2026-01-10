module.exports = {
  name: "eval",
  description: "💻 تنفيذ كود جافاسكريبت مباشر",
  execute({ api, event, args }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    try {
      const code = args.join(" ");
      let result = eval(code);
      if (typeof result !== "string") result = require("util").inspect(result);
      api.sendMessage("✅ Result:\n" + result, event.threadID);
    } catch (e) {
      api.sendMessage("❌ Error:\n" + e.message, event.threadID);
    }
  }
};
