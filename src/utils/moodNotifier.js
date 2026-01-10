// يرسل إشعارات مزاج البوت كل فترة
const { getMood } = require("./laylaMood");
module.exports = {
  notify(api, threadID) {
    const mood = getMood();
    api.sendMessage(`🎵 ليلى الآن في مزاج: ${mood}`, threadID);
  }
};
