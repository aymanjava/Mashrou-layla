const path = require("path");
const fileDB = require("../utils/fileDB");
const { mimicAdvanced, musicReaction, fanMessage, ownerAlert } = require("../utils");

module.exports = {
  name: "message",
  execute({ api, event }) {
    if (!event.body) return;
    if (event.senderID === api.getCurrentUserID()) return;

    // تحديث قاعدة المستخدمين والثريدات
    const usersPath = path.join(__dirname, "../database/users.json");
    const threadsPath = path.join(__dirname, "../database/threads.json");

    const users = fileDB.read(usersPath);
    const threads = fileDB.read(threadsPath);

    if (!users[event.senderID]) users[event.senderID] = { id: event.senderID, messages: 0, firstSeen: Date.now() };
    if (!threads[event.threadID]) threads[event.threadID] = { id: event.threadID, messages: 0, createdAt: Date.now() };

    users[event.senderID].messages++;
    threads[event.threadID].messages++;

    fileDB.write(usersPath, users);
    fileDB.write(threadsPath, threads);

    // أنظمة تفاعلية
    mimicAdvanced.reply(event.body, api, event.threadID);
    musicReaction.check(event.body, api, event.threadID);
    fanMessage.reply(event.body, api, event.threadID);
    ownerAlert.alert(event.body, api, event.threadID);
  }
};
