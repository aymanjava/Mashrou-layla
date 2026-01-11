const login = require("fca-unofficial"); 
const express = require('express');
const OpenAI = require('openai');

// --- خادم الويب ---
const app = express();
app.get('/', (req, res) => res.send('Layla Group Bot is Active!'));
app.listen(process.env.PORT || 3000);

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const appStateData = process.env.APP_STATE;

login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) return console.error("❌ فشل الدخول:", err);

    // إعدادات البوت ليعمل بشكل جيد في المجموعات
    api.setOptions({
        listenEvents: true,
        selfListen: false, // لا يرد على نفسه
        forceLogin: true,
        online: true
    });

    console.log("✅ ليلى جاهزة للعمل في المجموعات والخاص!");

    api.listenMqtt(async (err, message) => {
        if (err || !message.body) return;

        const input = message.body.toLowerCase();
        
        // --- شرط الرد في المجموعات ---
        // سيرد البوت في حالتين:
        // 1. إذا بدأت الرسالة بكلمة "ليلى" أو ".ليلى"
        // 2. إذا كانت الرسالة في "خاص" (Private)
        const isGroup = message.threadID !== message.senderID;
        const botName = "ليلى";

        if (input.includes(botName) || !isGroup) {
            try {
                // إظهار علامة الكتابة في المجموعة
                api.sendTypingIndicator(message.threadID);

                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "أنتِ ليلى، مساعدة ذكية في مجموعة مسنجر. ردودك قصيرة ومفيدة ومناسبة لجو المجموعات." },
                        { role: "user", content: message.body }
                    ],
                });

                const reply = completion.choices[0].message.content;
                
                // الرد كـ "Reply" على الشخص في المجموعة
                api.sendMessage({ body: reply, mentions: [{ tag: message.senderID, id: message.senderID }] }, message.threadID, message.messageID);

            } catch (error) {
                console.error("❌ خطأ OpenAI:", error);
            }
        }
    });
});
