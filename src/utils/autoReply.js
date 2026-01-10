// Auto-reply system – يرد على كلمات محددة
const replies = {
  "مرحبا": "🎶 أهلا… كيفك اليوم؟",
  "ليلى": "🖤 أنا هنا… بس بهدوء",
  "حب": "🔥 الحب موسيقى الروح"
};

module.exports = {
  getReply(message) {
    for (const key in replies) {
      if (message.includes(key)) return replies[key];
    }
    return null;
  }
};
