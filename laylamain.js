// ==========================
// Layla Mega Bot – النسخة الاحترافية الشاملة
// ==========================
require('dotenv').config();

const express = require('express');
const login = require('fca-unofficial'); // تصحيح بسيط في الاستدعاء لبعض النسخ
const OpenAI = require('openai');

// 🟢 إعداد Express لمنع Render من النوم
const app = express();
app.get('/', (req, res) => res.send('Layla Mega Bot Active!'));
app.listen(process.env.PORT || 3000);

// 🟢 إعداد OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// 🟢 قراءة AppState
const appStateData = process.env.APP_STATE;
if (!appStateData) throw new Error("APP_STATE missing!");

login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) return console.error("❌ فشل الدخول:", err);

    api.setOptions({ listenEvents: true, selfListen: false, online: true });
    console.log("✅ Layla Mega Bot جاهزة للعمل!");

    const spamControl = {};

    api.listenMqtt(async (err, message) => {
        if (err) return;

        // 🟢 1. ميزة الترحيب بالأعضاء الجدد (إضافة تلقائية)
        if (message.type === "event" && message.logMessageType === "log:subscribe") {
            const addedParticipants = message.logMessageData.addedParticipants;
            for (const person of addedParticipants) {
                api.sendMessage(`🎶 أهلاً بك يا ${person.fullName} في مجموعتنا! نورتنا 🖤`, message.threadID);
            }
            return;
        }

        // تجاهل إذا لم تكن رسالة نصية أو كانت من البوت نفسه
        if (!message.body || message.senderID === api.getCurrentUserID()) return;

        const senderID = message.senderID;
        const threadID = message.threadID;
        const body = message.body.trim();

        // 🟢 2. Anti-Spam (تطوير بسيط لمنع الضغط على السيرفر)
        const now = Date.now();
        if (spamControl[senderID] && now - spamControl[senderID] < 1500) return; 
        spamControl[senderID] = now;

        // 🟢 3. أمر تصحيح الكتابة
        if (body === ".") {
            return api.sendMessage("ياخي مش هيك… تقصد .لولو", threadID, message.messageID);
        }

        // 🟢 4. ذكاء اصطناعي .لولو (يعمل في الكروب والخاص)
        const isGroup = threadID !== senderID;
        if (body.startsWith(".لولو") || !isGroup) {
            const question = body.replace(".لولو", "").trim() || "مرحبا!";
            try {
                api.sendTypingIndicator(threadID);
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "أنتِ لولو، فتاة ذكية، ردودك قصيرة ومناسبة للمجموعات العربية. أسلوبك فني ولطيف." },
                        { role: "user", content: question }
                    ],
                    max_tokens: 250
                });

                const reply = completion.choices[0].message.content;
                // الرد بنظام الـ Reply (الرد على الرسالة)
                api.sendMessage({ body: reply, mentions: [{ tag: senderID, id: senderID }] }, threadID, message.messageID);
            } catch (e) { console.error("❌ خطأ AI:", e); }
            return;
        }

        // 🟢 5. مزاج البوت والردود السريعة
        if (body.includes("مزاج")) {
            const moods = ["🔥 متفجرة", "🎶 هادئة", "🖤 حزينة", "🎭 ساخرة"];
            return api.sendMessage(`🎭 مزاج ليلى الآن: ${moods[Math.floor(Math.random() * moods.length)]}`, threadID);
        }

        const autoReplies = {
            "سلام": "هلا بالزين! 🌸",
            "باي": "نشوفك على خير 💖",
            "كيفك": "بخير دامك بخير 😉"
        };
        for (const key in autoReplies) {
            if (body.toLowerCase().includes(key)) return api.sendMessage(autoReplies[key], threadID);
        }
    });
});
