const login = require("fca-unofficial");
const OpenAI = require('openai');
const express = require('express');
require('dotenv').config();

// --- خادم ويب لمنع Render من إيقاف البوت ---
const app = express();
app.get('/', (req, res) => res.send('✅ Layla Group Bot is Running!'));
app.listen(process.env.PORT || 3000);

// --- إعداد OpenAI ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// --- قراءة AppState ---
const appStateData = process.env.APP_STATE;
if (!appStateData) {
    console.error("❌ APP_STATE missing in environment variables!");
    process.exit(1);
}

// --- تسجيل الدخول ---
login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) return console.error("❌ Login failed:", err);

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true
    });

    console.log("✅ ليلى جاهزة للعمل في المجموعات فقط!");

    api.listenMqtt(async (err, message) => {
        if (err || !message.body) return;

        const senderID = message.senderID;
        const threadID = message.threadID;
        const input = message.body.trim().toLowerCase();

        // --- شرط: البوت يشتغل فقط في المجموعات ---
        if (threadID === senderID) return;

        // --- أمر ذكاء اصطناعي: .لولو ---
        if (input.startsWith(".لولو")) {
            try {
                api.sendTypingIndicator(threadID);

                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "أنتِ ليلى، ذكية وترد بسرعة في مجموعات المسنجر. ردود قصيرة وودية." },
                        { role: "user", content: input }
                    ],
                    max_tokens: 150
                });

                const reply = completion.choices[0].message.content;
                api.sendMessage({ body: reply, mentions: [{ tag: senderID, id: senderID }] }, threadID, message.messageID);

            } catch (error) {
                console.error("❌ OpenAI Error:", error);
            }
        }

        // --- أمر تصحيح كتابة الأوامر ---
        if (input === ".") {
            api.sendMessage(`ياخي.. تقصد .لولو`, threadID);
        }

        // --- أمر مزاج ليلى ---
        if (input.includes("مزاج")) {
            const moods = ["🔥 جريئة", "🎶 هادئة", "🖤 حزينة", "🧨 متفجرة"];
            const mood = moods[Math.floor(Math.random() * moods.length)];
            api.sendMessage(`🎭 مزاج ليلى الآن: ${mood}`, threadID);
        }

        // --- ترحيب بالأعضاء الجدد ---
        if (message.type === "event" && message.logMessageType === "log:subscribe") {
            const name = message.logMessageData.addedParticipants[0].fullName;
            api.sendMessage(`🎶 أهلاً بك يا ${name}! نورت المجموعة بوجودك.`, threadID);
        }
    });
});
