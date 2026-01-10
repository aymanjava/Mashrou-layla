module.exports = {
  name: "message",
  execute({ api, event }) {
    if (!event.body) return;

    // تجاهل رسائل البوت نفسه
    if (event.senderID === api.getCurrentUserID()) return;

    // رد تلقائي بسيط (شخصية)
    if (event.body.toLowerCase().includes("ليلى")) {
      api.sendMessage(
        "🎶 مو كل من نادى جاوبته… بسك ناديتني صح.",
        event.threadID
      );
    }
  }
};
