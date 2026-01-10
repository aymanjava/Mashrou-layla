// يحاكي المستخدم بذكاء إذا ذكر ليلى
module.exports = {
  reply(message, api, threadID) {
    if (message.toLowerCase().includes("ليلى")) {
      const responses = [
        "🎭 نعم؟ سمعت اسمي؟",
        "🔥 ها أنا… ليلى بينك وبين الموسيقى",
        "🖤 أنت تحاول تحاكي ليلى؟ ههه"
      ];
      api.sendMessage(responses[Math.floor(Math.random() * responses.length)], threadID);
    }
  }
};
