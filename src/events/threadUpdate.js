module.exports = {
  name: "thread_update",
  execute({ api, event }) {
    api.sendMessage(`🔥 تم تعديل إعدادات الثريد… ليلى لاحظت!`, event.threadID);
  }
};
