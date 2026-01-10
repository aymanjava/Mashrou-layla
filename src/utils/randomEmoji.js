// يضيف رموز تعبيرية فنية عشوائية للردود
const emojis = ["🎶", "🖤", "🔥", "🎭", "🌙"];
module.exports = {
  get() {
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
};
