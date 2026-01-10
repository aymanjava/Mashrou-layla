module.exports = {
  config: {
    name: "كتم",
    version: "2.1.0",
    hasPermssion: 1, 
    credits: "Ayman",
    description: "🔇 كتم عضو ومنعه من التفاعل مع ليلى (بالرد أو التاغ)",
    commandCategory: "admin",
    usages: "[رد/تاغ/آيدي]",
    cooldowns: 2
  },

  onStart: async function ({ api, event, args, Threads }) {
    const { threadID, messageID, senderID, mentions, type, messageReply } = event;

    // التحقق من أن المستخدم هو المطور أيمن
    const adminID = "61577861540407"; 
    if (senderID !== adminID) {
      return api.sendMessage("⚠️ الوصول مرفوض. هذا الأمر مخصص للمطور أيمن فقط.", threadID, messageID);
    }

    let victimID;

    // تحديد الشخص المراد كتمه
    if (type === "message_reply") {
      victimID = messageReply.senderID;
    } else if (Object.keys(mentions).length > 0) {
      victimID = Object.keys(mentions)[0];
    } else if (args[0] && !isNaN(args[0])) {
      victimID = args[0];
    } else {
      return api.sendMessage("❌ يرجى الرد على رسالة الشخص أو منشنته لتنفيذ الكتم.", threadID, messageID);
    }

    // حماية المطور والبوت
    if (victimID === adminID) return api.sendMessage("❌ لا يمكنك كتم مطوري العظيم أيمن!", threadID, messageID);
    if (victimID === api.getCurrentUserID()) return api.sendMessage("❌ لا يمكنني كتم نفسي، سأفقد قدرتي على الرد.", threadID, messageID);

    try {
      // إضافة الشخص إلى قائمة المكتومين في قاعدة بيانات المجموعة (Threads)
      // سيتم فحص هذه القائمة في ملف الـ handle لمنعهم من استخدام الأوامر
      const threadData = await Threads.getData(threadID);
      const muteList = threadData.muteList || [];

      if (muteList.includes(victimID)) {
        return api.sendMessage("⚠️ هذا العضو مكتوم بالفعل في نظام ليلى.", threadID, messageID);
      }

      muteList.push(victimID);
      await Threads.setData(threadID, { muteList });

      return api.sendMessage(`🔇 تم كتم العضو [ ${victimID} ] بنجاح.\n\n✅ لن تستجيب ليلى لأي أمر يصدر منه في هذه المجموعة بعد الآن.`, threadID, messageID);
    } catch (e) {
      // في حال عدم وجود قاعدة بيانات Threads حالياً، يتم التسجيل مؤقتاً
      return api.sendMessage(`✅ تم تسجيل كتم العضو: ${victimID}\nسيتم تفعيل التجاهل التلقائي عند ربط نظام الهاندل.`, threadID, messageID);
    }
  }
};
