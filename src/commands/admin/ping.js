module.exports = {
  config: {
    name: "بينج",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Ayman",
    description: "🏓 اختبار سرعة استجابة نظام ليلى",
    commandCategory: "system",
    usages: "",
    cooldowns: 5
  },

  onStart: async function ({ api, event }) {
    const startTime = Date.now();
    
    // إرسال رسالة أولية لقياس الوقت
    return api.sendMessage("جاري فحص النبض... ⏳", event.threadID, (err, info) => {
      const endTime = Date.now();
      const ping = endTime - startTime;
      
      // تعديل الرسالة بالنتيجة النهائية
      api.editMessage(
        `🏓 بونج!\n\n🚀 سرعة الاستجابة: ${ping}ms\n📡 الحالة: ليلى تعمل بأقصى كفاءة\n👑 المطور: أيمن`,
        info.messageID
      );
    }, event.messageID);
  }
};
