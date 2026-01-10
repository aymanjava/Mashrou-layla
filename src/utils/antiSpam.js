// Anti-spam system – يمنع الرسائل المتكررة بسرعة
const recentMessages = new Map();
const SPAM_INTERVAL = 3000; // 3 ثواني بين الرسائل

module.exports = {
  check(senderID) {
    const now = Date.now();
    if (recentMessages.has(senderID)) {
      const last = recentMessages.get(senderID);
      if (now - last < SPAM_INTERVAL) return true;
    }
    recentMessages.set(senderID, now);
    return false;
  }
};
