module.exports = {
  config: {
    name: "بث",
    version: "2.5.0",
    hasPermssion: 2, // للمطور أيمن فقط
    credits: "Ayman",
    description: "📢 إرسال رسالة ملكية لجميع المجموعات المشترك بها البوت",
    commandCategory: "admin",
    usages: "[الرسالة]",
    cooldowns: 10
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    // التحقق من هوية المطور (أيمن)
    const adminID = "61577861540407";
    if (senderID !== adminID) {
      return api.sendMessage("⚠️ هذا الأمر ملكي، مخصص فقط للمطور أيمن.", threadID, messageID);
    }

    const messageToBroadcast = args.join(" ");
    if (!messageToBroadcast) {
      return api.sendMessage("⚠️ أيمن، من فضلك اكتب الرسالة التي تريد بثها للعالم.", threadID, messageID);
    }

    // جلب قائمة بجميع المجموعات
    const allThreads = await api.getThreadList(100, null, ["INBOX"]);
    let count = 0;
    let failed = 0;

    // تصفية المجموعات فقط (تجاهل الدردشات الشخصية إذا أردت)
    const groups = allThreads.filter(t => t.isGroup && t.threadID !== threadID);

    api.sendMessage(`🚀 بدأ البث الملكي الآن إلى ${groups.length} مجموعة...`, threadID);

    for (const group of groups) {
      try {
        await api.sendMessage(
          `📢 | إعلان من المطور أيمن\n────────────────\n${messageToBroadcast}\n────────────────\n🖤 مشروع ليلى | القوة والذكاء`,
          group.threadID
        );
        count++;
      } catch (err) {
        failed++;
      }
    }

    return api.sendMessage(
      `✅ تم انتهاء البث بنجاح!\n\n📊 الإحصائيات:\n- المجموعات المستلمة: ${count}\n- فشل الإرسال: ${failed}\n👑 السلطة المطلقة لأيمن.`,
      threadID,
      messageID
    );
  }
};
