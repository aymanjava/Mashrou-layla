const os = require('os');
module.exports = {
    config: { name: "نظام", category: "system" },
    run: async ({ api, event }) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        
        const infoMsg = `🖥️ حالة نظام ليلى العملاق:\n` +
                        `• الوقت التشغيلي: ${hours} ساعة\n` +
                        `• استهلاك الرام: ${mem} MB\n` +
                        `• المنصة: ${os.platform()}\n` +
                        `• السرعة: ${Date.now() - event.timestamp}ms`;
        api.sendMessage(infoMsg, event.threadID);
    }
};
