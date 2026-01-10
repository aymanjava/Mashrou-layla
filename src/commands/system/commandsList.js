module.exports = {
  config: {
    name: "اوامر",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "Ayman",
    description: "📜 عرض القائمة الملكية لأوامر ليلى",
    commandCategory: "system",
    usages: "",
    cooldowns: 5
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    // تصميم القائمة بشكل فخم ومقسم حسب النوع
    const systemCmds = ["بينج", "اوامر", "معلومات", "تحديث", "اعدادات"];
    const funCmds = ["نكتة", "اقتباس", "حظ", "لغز", "رموز", "تحدي", "مزاج", "ابداع"];
    const adminCmds = ["مح", "حظر", "كتم", "بث", "مسح", "انذار", "وضع_خاص"];
    const musicCmds = ["لحن", "موسيقى", "تشغيل_اغنية", "البوم_ليلى"];

    let helpMessage = `👑 مـمـلـكـة لـيـلـى 👑\n`;
    helpMessage += `──────────────────\n`;
    helpMessage += `مرحباً بك في نظام الذكاء المتطور. إليك قائمة الأوامر المتاحة لك:\n\n`;

    helpMessage += `⚙️ ┇ الأجهزة والنظام:\n`;
    helpMessage += `» ${systemCmds.join(", ")}\n\n`;

    helpMessage += `🎭 ┇ الـتـرفـيـه والمزاج:\n`;
    helpMessage += `» ${funCmds.join(", ")}\n\n`;

    helpMessage += `🛡️ ┇ الإدارة والسيطرة:\n`;
    helpMessage += `» ${adminCmds.join(", ")}\n\n`;

    helpMessage += `🎵 ┇ الـفـن والموسيقى:\n`;
    helpMessage += `» ${musicCmds.join(", ")}\n\n`;

    helpMessage += `──────────────────\n`;
    helpMessage += `💡 إجمالي الأوامر: ${systemCmds.length + funCmds.length + adminCmds.length + musicCmds.length}\n`;
    helpMessage += `👤 المطور: أيـمـن\n`;
    helpMessage += `🆔 ID: 61577861540407\n`;
    helpMessage += `✨ استخدم الأوامر بذكاء كذكاء ليلى.`;

    return api.sendMessage(helpMessage, threadID, messageID);
  }
};
