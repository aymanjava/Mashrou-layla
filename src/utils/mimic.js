// يحاكي المستخدم إذا ذكر اسم ليلى
module.exports = {
  mimic(message, api, threadID) {
    if (message.toLowerCase().includes("ليلى")) {
      api.sendMessage(`🎭 ههه… نعم؟ سمعت اسمي؟`, threadID);
    }
  }
};
