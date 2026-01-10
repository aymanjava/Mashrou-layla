// يكرر رسالة المستخدم بشكل فني
module.exports = {
  echo(message, api, threadID) {
    if (message.toLowerCase().includes("كرر")) {
      const content = message.split("كرر")[1] || "…";
      api.sendMessage(`🎶 ليلى تكرر: ${content.trim()}`, threadID);
    }
  }
};
