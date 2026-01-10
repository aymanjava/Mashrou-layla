// يودع المستخدم برسالة ودية
module.exports = {
  bye(message, api, threadID) {
    if (message.toLowerCase().includes("وداعًا") || message.toLowerCase().includes("باي")) {
      api.sendMessage("🖤 إلى اللقاء… ليلى تتابعك من بعيد.", threadID);
    }
  }
};
