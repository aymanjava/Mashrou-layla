const login = require("fca-unofficial"); // التعديل هنا ليتناسب مع package.json الجديد
const express = require('express');
const OpenAI = require('openai');

// --- خادم ويب لمنع Render من النوم ---
const app = express();
app.get('/', (req, res) => res.send('Layla AI is Awake!'));
app.listen(process.env.PORT || 3000, () => {
    console.log(`📡 Web server running on port ${process.env.PORT || 3000}`);
});

// --- إعداد OpenAI ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// --- قراءة AppState من إعدادات Render ---
const appStateData = process.env.APP_STATE;

if (!appStateData) {
    console.error("❌ APP_STATE missing in environment variables!");
    process.exit(1);
}

// --- تسجيل الدخول وتشغيل البوت ---
login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) return console.error("❌ Login failed:", err);

    console.log("✅ ليلى متصلة بالمسنجر وجاهزة للرد!");

    api.listenMqtt(async (err, message) => {
        if (err || !message.body || message.senderID === api.getCurrentUserID()) return;

        const input = message.body.trim();

        // التفاعل عند مناداة البوت بـ ".ليلى "
        if (input.startsWith('.ليلى ')) {
            const question = input.slice(6); // تم التعديل ليناسب طول الكلمة بدقة
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: question }],
                    max_tokens: 250
                });

                const reply = completion.choices[0].message.content;
                api.sendMessage(reply, message.threadID);

            } catch (error) {
                console.error("❌ OpenAI Error:", error);
                api.sendMessage("❌ حدث خطأ أثناء معالجة السؤال", message.threadID);
            }
        }
    });
});
