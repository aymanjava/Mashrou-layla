const path = require("path");
const fileDB = require("../utils/fileDB");

module.exports = {
  name: "message",
  execute({ api, event }) {
    if (!event.body) return;
    if (event.senderID === api.getCurrentUserID()) return;

    const usersPath = path.join(__dirname, "../database/users.json");
    const threadsPath = path.join(__dirname, "../database/threads.json");

    const users = fileDB.read(usersPath);
    const threads = fileDB.read(threadsPath);

    if (!users[event.senderID]) {
      users[event.senderID] = {
        id: event.senderID,
        messages: 0,
        firstSeen: Date.now()
      };
    }

    if (!threads[event.threadID]) {
      threads[event.threadID] = {
        id: event.threadID,
        messages: 0,
        createdAt: Date.now()
      };
    }

    users[event.senderID].messages++;
    threads[event.threadID].messages++;

    fileDB.write(usersPath, users);
    fileDB.write(threadsPath, threads);

    // رد شخصية بسيط
    if (event.body.includes("ليلى")) {
      api.sendMessage("🎶 أنا هنا… بس بهدوء.", event.threadID);
    }
  }
};
