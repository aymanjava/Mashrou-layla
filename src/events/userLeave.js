module.exports = {
  name: "user_leave",
  execute({ api, event }) {
    api.sendMessage(`🖤 انتهى الرحيل… ليلى ودّعتك`, event.threadID);
  }
};
