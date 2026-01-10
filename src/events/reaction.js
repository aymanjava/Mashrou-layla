module.exports = {
  name: "message_reaction",
  execute({ api, event }) {
    if (event.reaction === "❤️") {
      api.sendMessage(
        "🖤 بعض القلوب تُفهم بدون كلام.",
        event.threadID
      );
    }
  }
};
