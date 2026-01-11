require("dotenv").config();
const login = require("fca-unofficial");
const fs = require("fs-extra");
const loader = require("./src/core/loader");
const listener = require("./src/core/listener");

// قراءة الـ AppState من المجلد الجديد
const appState = JSON.parse(fs.readFileSync("./appstate/appstate.json", "utf8"));

login({ appState }, (err, api) => {
    if (err) return console.error("❌ فشل تسجيل الدخول:", err);

    api.setOptions({ listenEvents: true, selfListen: false, online: true });

    // تحميل الأوامر من المجلدات
    const { commands, events } = loader(api);

    // الاستماع والرد
    api.listenMqtt(async (err, event) => {
        if (err) return;
        const handle = listener(api, commands, events);
        handle(event);
    });

    console.log("✅ ليلى العملاقة متصلة الآن!");
});
