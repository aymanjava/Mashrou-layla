module.exports = {
    config: {
        name: "معلومات",
        category: "system",
        description: "عرض معلومات البوت"
    },
    run: async ({ api, event }) => {
        return api.sendMessage("🤖 أنا ليلى، أعمل بنظام الهاندل المتطور V2.\nكل الأوامر تعمل الآن من المجلدات المخصصة!", event.threadID);
    }
};
