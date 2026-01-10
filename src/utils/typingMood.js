// يحاكي الكتابة حسب المزاج
const { getMood } = require("./laylaMood");
module.exports = {
  simulate(api, threadID, callback) {
    const mood = getMood();
    const delay = mood === "🔥 جريء" ? 500 : mood === "🖤 حزين" ? 2000 : 1000;
    api.sendTyping(threadID, true);
    setTimeout(() => {
      api.sendTyping(threadID, false);
      if (callback) callback();
    }, delay);
  }
};
