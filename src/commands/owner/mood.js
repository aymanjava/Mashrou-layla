const { getMood, changeMood } = require("../../utils/laylaMood");
module.exports = {
  name: "mood",
  description: "🎭 يغير أو يظهر مزاج ليلى",
  execute({ api, event, args }) {
    if (!global.Layla.utils.permissions.isOwner(event.senderID)) return;
    if (args[0] === "show") {
      api.sendMessage(`🎵 مزاج ليلى الآن: ${getMood()}`, event.threadID);
    } else if (args[0] === "change") {
      const newMood = changeMood();
      api.sendMessage(`🔥 تم تغيير مزاج ليلى: ${newMood}`, event.threadID);
    }
  }
};
