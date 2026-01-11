module.exports = () => {
  const moods = ["🔥", "🖤", "🎶", "😈"];
  return moods[Math.floor(Math.random() * moods.length)];
};
