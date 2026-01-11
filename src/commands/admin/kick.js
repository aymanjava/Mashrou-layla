module.exports = {
  config: {
    name: "مح",
    version: "2.0.0",
    hasPermssion: 1, 
    credits: "Ayman",
    description: "👑 إزالة عضو من المجموعة (بالرد أو التاغ أو الآيدي)",
    commandCategory: "admin",
    usages: "[رد/تاغ/آيدي]",
    cooldowns: 2
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, senderID, mentions, type, messageReply } = event;

    // التحقق من أن المستخدم هو المطور أيمن
    const adminID = "61577861540407"; 
    if (senderID !== adminID) {
      return api.sendMessage("⚠️ هذا الأمر من صلاحيات أيمن فقط.", threadID, messageID);
    }

    let victimID;

    // تحديد الشخص المراد إزالته
    if (type === "message_reply") {
      victimID = messageReply.senderID;
    } else if (Object.keys(mentions).length > 0) {
      victimID = Object.keys(mentions)[0];
    } else if (args[0] && !isNaN(args[0])) {
      victimID = args[0];
    } else {
      return api.sendMessage("❌ قم بالرد على رسالة الشخص أو منشنته لتنفيذ 'مح'.", threadID, messageID);
    }

    // حماية المطور والبوت
    if (victimID === adminID) {
      return api.sendMessage("❌ غير مسموح بمح المطور أيمن.", threadID, messageID);
    }
    if (victimID === api.getCurrentUserID()) {
      return api.sendMessage("❌ لا يمكنني مح نفسي من هنا.", threadID, messageID);
    }

    // تنفيذ الإزالة
    return api.removeUserFromGroup(victimID, threadID, (err) => {
      if (err) {
        return api.sendMessage("❌ فشل الإجراء: تأكد من رفعي لرتبة مسؤول أولاً.", threadID, messageID);
      } else {
        return api.sendMessage("✅ تمت الإزالة بنجاح.", threadID);
      }
    });
  }
};
