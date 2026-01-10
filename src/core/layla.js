const { config } = require("./config.json");
const moods = require("./moods");
const fca = require("@dongdev/fca-unofficial");
const fs = require("fs-extra");
const path = require("path");

async function startBot() {
  const session = "./session.json"; // ملف الجلسة
  const client = await fca.create({
    session: session,
    logLevel: "silent"
  });

  console.log("✅ بوت ليلى شغّال الآن!");

  client.listenMqtt(async (err, event) => {
    if (err) return console.error(err);

    // مثال أمر المزاج
    if (event.body && event.body.startsWith(config.prefix + "مزاج")) {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      return client.sendMessage(`🎶 مزاج ليلى الآن: ${mood}`, event.threadID, event.messageID);
    }

    // استمع للأوامر الأخرى هنا...
  });
}

startBot().catch(console.error);
