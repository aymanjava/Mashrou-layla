// يقترح أغاني عشوائية
const songs = ["🎶 أغنية 1", "🎶 أغنية 2", "🎶 أغنية 3"];
module.exports = {
  suggest(api, threadID) {
    const song = songs[Math.floor(Math.random() * songs.length)];
    api.sendMessage(`🔥 ليلى توصي: ${song}`, threadID);
  }
};
