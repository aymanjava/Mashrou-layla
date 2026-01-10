// يرد على المعجبين برسائل فنية
module.exports = {
  reply(message, api, threadID) {
    if (message.toLowerCase().includes("ليلى أحبك")) {
      api.sendMessage("🖤 ليلى تشعر بالحب… شكراً لك!", threadID);
    }
  }
};
