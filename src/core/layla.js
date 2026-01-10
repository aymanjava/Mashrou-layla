const login = require("fca-unofficial");
const fs = require("fs-extra");
const path = require("path");

const config = require("../config/bot.config");
const owner = require("../config/owner.config");
const { loadCommands, loadEvents } = require("./loader");

async function startBot() {
  const appStatePath = path.join(__dirname, "../../appstate/appstate.json");

  if (!fs.existsSync(appStatePath)) {
    console.error("❌ appstate.json غير موجود");
    process.exit(1);
  }

  const appState = require(appStatePath);

  login(
    { appState },
    {
      listenEvents: true,
      selfListen: false,
      logLevel: "silent"
    },
    (err, api) => {
      if (err) {
        console.error("❌ فشل تسجيل الدخول:", err);
        process.exit(1);
      }

      api.setOptions({
        forceLogin: true,
        listenEvents: true
      });

      global.Layla = {
        api,
        commands: new Map(),
        events: new Map(),
        config,
        owner
      };

      loadCommands();
      loadEvents();

      console.log("🎶 Layla is alive...");
      api.listenMqtt(require("./listener"));
    }
  );
}

module.exports = { startBot };
