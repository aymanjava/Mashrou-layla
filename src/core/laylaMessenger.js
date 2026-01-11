const login = require("fca-unofficial");
const express = require('express');
const OpenAI = require('openai');

// --- خادم ويب بسيط ---
const app = express();
app.get('/', (req, res) => res.send('Layla Bot is Active!'));
app.listen(process.env.PORT || 3000);

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const appStateData = process.env.APP_STATE;

login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) return console.error("❌ فشل الدخول:", err);

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true
    });

    console.log("✅ ليلى تعمل الآن بدون أنظمة خارجية!");

    api.listenMqtt(async (err, message) => {
        if (err || !message.body || message.senderID === api.getCurrentUserID()) return;

        const body = message.body.toLowerCase();
        const threadID = message.threadID;

        // 1. ترحيب الأعضاء الجدد في الكروبات
        if (message.type === "event" && message.logMessageType === "log:subscribe") {
            const name = message.logMessageData.addedParticipants[0].fullName;
            return api.sendMessage(`🎵 أهلاً بك يا ${name} نورت المجموعة! أنا ليلى مساعدتكم الذكية.`, threadID);
        }

        // 2. ردود سريعة مدمجة (بدون ملفات خارجية)
        const quickReplies = {
            "مرحبا": "أهلاً بك.. كيف أساعدك اليوم؟ 🖤",
            "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته.. نورت 🎶",
            "بوت": "اسمي ليلى.. اسألني أي شيء بذكر اسمي أو في الخاص."
        };

        if (quickReplies[body]) {
            return api.sendMessage(quickReplies[body], threadID);
        }

        // 3. ذكاء ليلى (OpenAI)
        // ترد إذا ذكرت "ليلى" في الكروب أو إذا كانت المحادثة خاصة
        const isGroup = threadID !== message.senderID;
        if (body.includes("ليلى") || !isGroup) {
            try {
                api.sendTypingIndicator(threadID);
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "أنتِ ليلى، مساعدة ذكية ولطيفة. تردين باللغة العربية بأسلوب فني هادئ." },
                        { role: "user", content: message.body }
                    ],
                });

                const reply = completion.choices[0].message.content;
                api.sendMessage(reply, threadID, message.messageID);
            } catch (e) {
                console.error("OpenAI Error:", e);
            }
        }
    });
});
