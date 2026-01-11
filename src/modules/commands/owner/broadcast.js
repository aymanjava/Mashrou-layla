module.exports = {
    config: { name: "اذاعة", category: "owner" },
    run: async ({ api, event, args }) => {
        const msg = args.join(" ");
        if (!msg) return api.sendMessage("اكتب الرسالة بعد الأمر!", event.threadID);
        
        const allThreads = await api.getThreadList(100, null, ["INBOX"]);
        allThreads.forEach(thread => {
            if (thread.isGroup) api.sendMessage(`📢 إشعار من المطور:\n\n${msg}`, thread.threadID);
        });
        api.sendMessage("✅ تم الإرسال لجميع المجموعات.", event.threadID);
    }
};
