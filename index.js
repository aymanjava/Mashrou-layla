const login = require("fca-unofficial");
const fs = require("fs-extra");
const path = require("path");
const loader = require("./src/core/loader");
const listener = require("./src/core/listener");

// التأكد من وجود ملف الـ AppState
const appStatePath = "./appstate/appstate.json";

if (!fs.existsSync(appStatePath)) {
    console.error("❌ خطأ: ملف appstate.json غير موجود في مجلد appstate!");
    process.exit(1);
}

const appState = fs.readJsonSync(appStatePath);

login({ appState }, (err, api) => {
    if (err) return console.error("❌ فشل تسجيل الدخول:", err);

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true,
        forceLogin: true
    });

    // تحميل الأوامر والأحداث
    const { commands, events } = loader(api);

    // بدء الاستماع
    api.listenMqtt(async (err, event) => {
        if (err) return;
        const handle = listener(api, commands, events);
        handle(event);
    });

    console.log("🚀 [ LAYLA ] النظام جاهز للعمل تحت إشراف أيمن!");
});
