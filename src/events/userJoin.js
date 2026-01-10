module.exports = {
  name: "user_join",
  execute({ api, event }) {
    api.sendMessage(`🎶 مرحبًا بك في الثريد! ليلى ترحب بك ✨`, event.threadID);
  }
};
