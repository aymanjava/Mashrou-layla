const { emojiReaction } = require("../utils");

module.exports = {
  name: "message_reaction",
  execute({ api, event }) {
    if (!event.reaction) return;
    emojiReaction.check(event.reaction, api, event.threadID);
  }
};
