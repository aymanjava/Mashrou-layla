const login = require("fca-unofficial");
const loader = require("./src/core/loader");
const listener = require("./src/core/listener");

login({ appState: JSON.parse(process.env.APP_STATE) }, (err, api) => {
    if (err) return console.error(err);

    // تحميل الأسلحة والأوامر
    const { commands, events } = loader(api);

    // تشغيل نظام الاستماع الذكي
    api.listenMqtt(async (err, event) => {
        if (err) return;
        
        // تمرير الأوامر والأحداث للمستمع
        const handle = listener(api, commands, events);
        handle(event);
    });
});
