const login = require("fca-unofficial");
const express = require('express');
const OpenAI = require('openai');
const stringSimilarity = require("string-similarity"); // لازم تثبت المكتبة: npm i string-similarity

// --- خادم ويب ---
const app = express();
app.get('/', (req, res) => res.send('Lulu Bot is Running!'));
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

    console.log("✅ لولو جاهزة للعمل!");

    const commands = [".لولو", ".مزاج", ".مرحبا"]; // ضع كل الأوامر الصحيحة هنا

    api.listenMqtt(async (err, message) => {
        if(err || !message.body || message.senderID === api.getCurrentUserID()) return;

        const body = message.body.trim();
        const threadID = message.threadID;
        const senderID = message.senderID;

        // --- نظام تصحيح الأوامر ---
        if(body.startsWith('.')) {
            const bestMatch = stringSimilarity.findBestMatch(body, commands);

            if(bestMatch.bestMatch.rating < 0.5) {
                // لو التشابه قليل، نقول له: مش مفهوم
                api.sendMessage("😅 ياخي مش هيك.. تقصد لولو؟", threadID, message.messageID);
                return;
            } else if(bestMatch.bestMatch.rating < 0.95) {
                // لو شبه صحيح، نصححه تلقائياً
                api.sendMessage(`🤔 أقصدت: ${bestMatch.bestMatch.target}?`, threadID, message.messageID);
                return;
            } else {
                // الأمر مضبوط، نفذه
                if(bestMatch.bestMatch.target === ".لولو") {
                    api.sendMessage("🎀 نعم، أنا هنا! 💖", threadID, message.messageID);
                    return;
                } else if(bestMatch.bestMatch.target === ".مزاج") {
                    api.sendMessage("🎭 مزاجي اليوم: هادئة ومتحمسة للدردشة!", threadID, message.messageID);
                    return;
                } else if(bestMatch.bestMatch.target === ".مرحبا") {
                    api.sendMessage(`🎶 أهلاً ${message.senderName || "صديقي"}!`, threadID, message.messageID);
                    return;
                }
            }
        }

        // --- الذكاء الاصطناعي لاسم لولو ---
        const isGroup = threadID !== senderID;
        if(body.includes("لولو") || !isGroup) {
            try {
                api.sendTypingIndicator(threadID);
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "أنتِ لولو، ذكية، ردودك قصيرة ومباشرة" },
                        { role: "user", content: body }
                    ],
                    max_tokens: 150
                });

                const reply = completion.choices[0].message.content;
                api.sendMessage({ body: reply, mentions: [{ tag: senderID, id: senderID }] }, threadID, message.messageID);
            } catch (e) {
                console.error("❌ خطأ OpenAI:", e);
            }
        }
    });
});
