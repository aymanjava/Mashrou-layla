const { changeMood, getMood } = require("../../utils/laylaMood");

module.exports = {
  name: "mood",
  description: "🎭 اعرض مزاج ليلى الحالي أو غيّره",
  execute({ api, event }) {
    const newMood = changeMood();
    api.sendMessage(`🎶 مزاجي الآن: ${newMood}`, event.threadID);
  }
};
