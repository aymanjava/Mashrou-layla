// يحاكي الكتابة قبل الرد (تفاعل طبيعي)
module.exports = {
  simulate(api, threadID, callback) {
    api.sendTyping(threadID, true);
    setTimeout(() => {
      api.sendTyping(threadID, false);
      if (callback) callback();
    }, Math.floor(Math.random() * 1500) + 500);
  }
};
