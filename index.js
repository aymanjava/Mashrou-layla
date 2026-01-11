const login = require('fca-unofficial');
const loader = require('./src/core/loader');
const listener = require('./src/core/listener');
const appState = JSON.parse(process.env.APP_STATE);

login({ appState }, (err, api) => {
    if (err) return console.error(err);

    console.log("🚀 جاري تحميل نظام ليلى المطور...");
    
    // 1. تحميل الأوامر
    const commands = loader(api);
    
    // 2. بدء الاستماع
    api.listenMqtt(async (err, event) => {
        if (err) return;
        const listen = listener(api, commands);
        await listen(event);
    });
});
