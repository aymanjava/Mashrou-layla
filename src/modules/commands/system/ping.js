module.exports = {
    config: { name: "بينج", category: "system" },
    run: async ({ api, event }) => {
        api.sendMessage("🚀 النبض مستقر.. ليلى في الخدمة!", event.threadID);
    }
};
