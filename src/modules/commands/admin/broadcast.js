module.exports = {
    config: {
        name: "اذاعة",
        category: "admin"
    },
    run: async ({ api, event, args }) => {
        const adminID = "61577861540407";
        if (event.senderID !== adminID) return;

        const msg = args.join(" ");
        if (!msg) return api.sendMessage("⚠️ اكتب الرسالة التي تريد بثها.", event.threadID);

        const allThreads = await api.getThreadList(100, null, ["INBOX"]);
        let count = 0;

        for (const thread of allThreads) {
            if (thread.isGroup && thread.threadID !== event.threadID) {
                api.sendMessage(`📢 إشعار ملكي من المطور أيمن:\n\n${msg}`, thread.threadID);
                count++;
            }
        }
        api.sendMessage(`✅ تم إرسال البث إلى ${count} مجموعة.`, event.threadID);
    }
};
