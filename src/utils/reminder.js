// تذكير المستخدم برسائل ذكية
const reminders = {};

module.exports = {
  set(userID, text, delay, api, threadID) {
    if (reminders[userID]) clearTimeout(reminders[userID]);
    reminders[userID] = setTimeout(() => {
      api.sendMessage(`⏰ ليلى تذكرك: ${text}`, threadID);
    }, delay);
  }
};
