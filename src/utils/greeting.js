// يرد على تحية المستخدم ويذكر اسم البوت
module.exports = {
  greet(message, api, threadID) {
    const text = message.toLowerCase();
    if (text.includes("مرحبا") || text.includes("هلا")) {
      api.sendMessage(`🎶 مرحبًا! أنا ليلى، البوت الفني الخاص بك.`, threadID);
    }
  }
};
