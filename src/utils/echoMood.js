// يعكس مزاج البوت عند كلمة "مزاج"
const moods = ["🖤 حزين", "🎶 هادئ", "🔥 جريء", "🎭 ساخر", "🌙 شاعري"];
module.exports = {
  check(message, api, threadID) {
    if (message.toLowerCase().includes("مزاج")) {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      api.sendMessage(`🎵 مزاج ليلى يعكس: ${mood}`, threadID);
    }
  }
};
