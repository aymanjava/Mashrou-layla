// يرد وفق المزاج الحالي للبوت
const moods = ["🖤 حزين", "🎶 هادئ", "🔥 جريء", "🎭 ساخر", "🌙 شاعري"];
module.exports = {
  reply(api, threadID) {
    const mood = moods[Math.floor(Math.random() * moods.length)];
    api.sendMessage(`🎵 مزاج ليلى الآن: ${mood}`, threadID);
  }
};
