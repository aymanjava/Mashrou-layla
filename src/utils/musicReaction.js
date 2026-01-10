// تفاعل مع كلمات الموسيقى
module.exports = {
  check(message, api, threadID) {
    if (message.includes("أغنية") || message.includes("موسيقى")) {
      api.sendMessage("🎶 ليلى تسمع الموسيقى… شاركني الإيقاع!", threadID);
    }
  }
};
