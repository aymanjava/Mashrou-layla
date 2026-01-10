module.exports = {
  config: {
    name: "مسح",
    version: "2.5.0",
    hasPermssion: 1, 
    credits: "Ayman",
    description: "🧹 تنظيف المحادثة (مسح عدد معين أو بالرد)",
    commandCategory: "admin",
    usages: "[عدد الرسائل] أو [بالرد]",
    cooldowns: 2
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, senderID, type, messageReply } = event;

    // التحقق من أن المستخدم هو المطور أيمن
    const adminID = "61577861540407";
    if (senderID !== adminID) {
      return api.sendMessage("⚠️ تنظيف المحادثة من صلاحيات أيمن فقط.", threadID, messageID);
    }

    // الحالة الأولى: مسح بالرد على رسالة معينة
    if (type === "message_reply") {
      return api.unsendMessage(messageReply.messageID, (err) => {
        if (err) return api.sendMessage("❌ فشلت الإزالة. تأكد من أنني مسؤول (Admin) لمسح رسائل الآخرين.", threadID, messageID);
      });
    }

    // الحالة الثانية: مسح عدد معين من الرسائل
    const num = parseInt(args[0]);
    if (isNaN(num) || num <= 0) {
      return api.sendMessage("🧹 حدد عدد الرسائل لمسحها (مثال: مسح 10) أو قم بالرد على رسالة.", threadID, messageID);
    }

    // الحد الأقصى للمسح في المرة الواحدة (لحماية الحساب من الحظر)
    if (num > 50) return api.sendMessage("⚠️ الحد الأقصى للمسح هو 50 رسالة في المرة الواحدة.", threadID, messageID);

    // جلب تاريخ الرسائل ومسحها
    api.getThreadHistory(threadID, num, null, (err, history) => {
      if (err) return api.sendMessage("❌ تعذر جلب الرسائل لمسحها.", threadID, messageID);
      
      let deletedCount = 0;
      history.forEach(msg => {
        // مسح رسائل البوت فقط إذا لم يكن أدمن، أو مسح الجميع إذا كان أدمن
        api.unsendMessage(msg.messageID, () => {
          deletedCount++;
        });
      });
      
      return api.sendMessage(`🧹 تم تنظيف المحادثة وسحب ${num} رسالة بنجاح.`, threadID);
    });
  }
};
