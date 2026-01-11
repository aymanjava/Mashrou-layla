const login = require("fca-unofficial");
const fs = require("fs-extra");
const path = require("path");
const loader = require("./src/core/loader");
const listener = require("./src/core/listener");
const express = require('express');

// سيرفر للبقاء أونلاين
const app = express();
app.get('/', (req, res) => res.send('Layla is Online!'));
app.listen(process.env.PORT || 3000);

const appStatePath = path.join(__dirname, "./appstate/appstate.json");

if (!fs.existsSync(appStatePath)) {
    console.error("❌ ملف appstate.json غير موجود!");
    process.exit(1);
}

const appState = fs.readJsonSync(appStatePath);

login({ appState }, (err, api) => {
    if (err) return console.error(err);

    api.setOptions({ listenEvents: true, selfListen: false, online: true });

    const { commands, events } = loader(api);
    const handle = listener(api, commands, events);

    api.listenMqtt((err, event) => {
        if (err) return;
        handle(event);
    });

    console.log("✅ [ LAYLA ] البوت يعمل الآن بنظام المجلدات الاحترافي.");
});
