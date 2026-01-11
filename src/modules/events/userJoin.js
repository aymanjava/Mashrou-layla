module.exports = {
    name: "user_join",
    execute: ({ api, event }) => {
        api.sendMessage("🎶 أهلاً بك في عالم ليلى! نورت المجموعة 🖤", event.threadID);
    }
};
