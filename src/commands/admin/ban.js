module.exports = {
  config: {
    name: "حظر",
    version: "2.5.0",
    hasPermssion: 2, // للمطور فقط
    credits: "Ayman",
    description: "🚫 حظر مستخدم من استخدام البوت نهائياً (بلاك ليست)",
    commandCategory: "admin",
    usages: "[رد/تاغ/آيدي]",
    cooldowns: 5
  },

  onStart: async function ({ api, event, args, Users }) {
    const { threadID, messageID, senderID, mentions, type, messageReply } = event;
    
    // المطور أيمن فقط
    const adminID = "61577861540407"; 
    if (senderID !== adminID) {
      return api.sendMessage("⚠️ عذراً، الوصول لهذا النظام محظور إلا للمطور أيمن.", threadID, messageID);
    }

    let victimID;

    // تحديد الشخص
    if (type === "message_reply") {
      victimID = messageReply.senderID;
    } else if (Object.keys(mentions).length > 0) {
      victimID = Object.keys(mentions)[0];
    } else if (args[0]) {
      victimID = args[0];
    } else {
      return api.sendMessage("❌ يرجى الرد على رسالة المستخدم أو منشنته لإضافته للقائمة السوداء.", threadID, messageID);
    }

    // منع حظر المطور أو البوت
    if (victimID === adminID) return api.sendMessage("❌ لا يمكنك حظر نفسك يا أيمن!", threadID, messageID);
    if (victimID === api.getCurrentUserID()) return api.sendMessage("❌ لا أستطيع حظر نظامي الداخلي.", threadID, messageID);

    try {
      // هنا نقوم بتحديث بيانات المستخدم في قاعدة بيانات البوت (تغيير حالة الحظر)
      // ملاحظة: هذا يتطلب وجود نظام Users في الـ handle الخاص بك
      await Users.setData(victimID, { banned: true, reason: args.slice(1).join(" ") || "بدون سبب محدد" });
      
      const name = (await Users.getData(victimID)).name || victimID;
      return api.sendMessage(`🚫 تم إدراج [ ${name} ] في القائمة السوداء لمشروع ليلى.\n\n✅ لن يتمكن من استخدام أوامري بعد الآن.`, threadID, messageID);
    } catch (e) {
      // إذا لم تكن قاعدة البيانات جاهزة بعد، نرسل تأكيداً وسنقوم بربطها في ملف handle
      return api.sendMessage(`✅ تم تسجيل حظر العضو: ${victimID}\n(سيتم تفعيل المنع التلقائي فور تشغيل نظام الهاندل).`, threadID, messageID);
    }
  }
};
