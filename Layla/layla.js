const login = require("fca-project-orion");
const OpenAI = require('openai');
const express = require('express');

// منع Render من إيقاف البوت
const app = express();
app.get('/', (req, res) => res.send('Layla AI is Running!'));
app.listen(process.env.PORT || 3000);

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// سحب الـ AppState من إعدادات Render الأمنة
const appStateData = process.env.APP_STATE;

if (!appStateData) {
    console.error("❌ خطأ: لم يتم إضافة APP_STATE في إعدادات Render!");
    process.exit(1);
}

login({appState: JSON.parse(appStateData)}, (err, api) => {
    if(err) return console.error("❌ فشل تسجيل الدخول:", err);

    api.listenMqtt(async (err, message) => {
        if(err || !message.body || message.senderID === api.getCurrentUserID()) return;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message.body }],
            });
            api.sendMessage(completion.choices[0].message.content, message.threadID);
        } catch (error) {
            console.error("❌ خطأ ذكاء اصطناعي:", error);
        }
    });
});
