// يرسل تنبيه للـ Owner عند كلمات مهمة
const ownerID = global.Layla.owner.ownerID;
module.exports = {
  alert(message, api, threadID) {
    if (message.includes("خطأ") || message.includes("مشكلة")) {
      api.sendMessage(`⚠️ تنبيه من ليلى: رسالة مهمة في ثريد ${threadID}`, ownerID);
    }
  }
};
