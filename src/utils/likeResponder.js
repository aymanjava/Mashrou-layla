// يرد على الإعجابات برسائل فنية
module.exports = {
  reaction(reaction, api, threadID) {
    if (reaction === "❤️") api.sendMessage("🎶 ليلى شعرت بالحب… شكراً!", threadID);
    if (reaction === "😂") api.sendMessage("🖤 ضحكتني… أنت وموسيقاك!", threadID);
  }
};
