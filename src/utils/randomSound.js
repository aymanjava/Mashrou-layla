// يرسل أصوات أو تأثيرات موسيقية نصية
const sounds = ["🎵", "🎶", "♬", "♪"];
module.exports = {
  play(api, threadID) {
    api.sendMessage(sounds[Math.floor(Math.random() * sounds.length)], threadID);
  }
};
