// يرسل رسائل سرية عند كلمات معينة
module.exports = {
  check(message, api, threadID) {
    if (message.toLowerCase().includes("سر")) {
      api.sendMessage("🖤 هذه الرسالة سر… لا تخبر أحدًا عن ليلى!", threadID);
    }
  }
};
