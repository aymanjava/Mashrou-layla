const moods = [
  "🖤 حزين",
  "🎶 هادئ",
  "🔥 جريء",
  "🎭 ساخر",
  "🌙 شاعري"
];

let currentMood = moods[0];

module.exports = {
  getMood() {
    return currentMood;
  },
  changeMood() {
    currentMood = moods[Math.floor(Math.random() * moods.length)];
    return currentMood;
  }
};
