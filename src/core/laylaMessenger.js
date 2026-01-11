const login = require("fca-unofficial");
const express = require('express');
const OpenAI = require('openai');

// استدعاء ملفات الحماية والرد التي رفعتها
const antiSpam = require("./antiSpam");
const antiFlood = require("./antiFlood");
const autoReply = require("./autoReply");
const echoMood = require("./echoMood");

const app = express();
app.get('/', (req, res) => res.send('Layla Professional Bot is Live!'));
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

    console.log("✅ ليلى الاحترافية جاهزة للعمل في الكروبات!");

    api.listenMqtt(async (err, message) => {
        if (err || !message.body) return;

        const senderID = message.senderID;
        const threadID = message.threadID;
        const body = message.body;

        // 1. نظام الحماية (Anti-Spam & Anti-Flood)
        if (antiSpam.check(senderID) || antiFlood.check(senderID)) {
            return; // تجاهل الرسالة إذا كانت سبام
        }

        // 2. ميزة الترحيب بالأعضاء الجدد (من ملف config.json)
        if (message.type === "event" && message.logMessageType === "log:subscribe") {
            const name = message.logMessageData.addedParticipants[0].fullName;
            return api.sendMessage(`🎶 أهلاً بك يا ${name}.. نورت المجموعة بوجودك!`, threadID);
        }

        // 3. الرد الآلي من ملف (autoReply.js)
        const quickReply = autoReply.getReply(body);
        if (quickReply) {
            return api.sendMessage(quickReply, threadID);
        }

        // 4. ميزة تغيير المزاج (echoMood.js)
        if (body.includes("مزاج")) {
            return echoMood.check(body, api, threadID);
        }

        // 5. الرد بالذكاء الاصطناعي (OpenAI)
        // يرد البوت إذا ذُكر اسمه "ليلى" في الكروب أو إذا كانت المحادثة خاصة
        const isGroup = threadID !== senderID;
        if (body.includes("ليلى") || !isGroup) {
            try {
                api.sendTypingIndicator(threadID);
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "أنتِ ليلى، مساعدة ذكية ومحترفة. تجيدين التعامل مع المجموعات والردود السريعة." },
                        { role: "user", content: body }
                    ],
                });

                const reply = completion.choices[0].message.content;
                api.sendMessage({ body: reply, mentions: [{ tag: senderID, id: senderID }] }, threadID, message.messageID);
            } catch (e) { console.error(e); }
        }
    });
});
