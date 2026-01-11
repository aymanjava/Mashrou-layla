module.exports = {
    config: {
        name: "فحص",
        category: "system"
    },
    run: async ({ api, event }) => {
        const time = new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);

        const statusMsg = `
🎼 نبض ليلى الآن:
────────────────
✅ الحالة: متصلة وتعمل.
⏰ الوقت: ${time}
⏳ وقت التشغيل: ${hours} ساعة و ${minutes} دقيقة.
🧠 الذاكرة: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
🖤 المزاج: موسيقي هادئ.
────────────────
🔹 مطور النظام: أيمن.
        `;
        api.sendMessage(statusMsg, event.threadID);
    }
};
