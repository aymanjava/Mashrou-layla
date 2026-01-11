// ==========================
// Layla Lite Bot – نسخة سريعة بدون OpenAI
// ==========================
require('dotenv').config();

const express = require('express');
const login = require('fca-unofficial');

// 🟢 إعداد Express للبقاء متصلاً
const app = express();
app.get('/', (req, res) => res.send('Layla Lite is Running!'));
app.listen(process.env.PORT || 3000);

// 🟢 قراءة AppState
const appStateData = process.env.APP_STATE;
if (!appStateData) throw new Error("APP_STATE missing in Environment Variables!");

login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) return console.error("❌ فشل الدخول:", err);

    api.setOptions({ listenEvents: true, selfListen: false, online: true });
    console.log("✅ ليلى (النسخة الخفيفة) جاهزة للعمل!");

    const spamControl = {};

    api.listenMqtt(async (err, event) => {
        if (err) return;

        // 🟢 1. ترحيب المجموعات (Events)
        if (event.type === "event" && event.logMessageType === "log:subscribe") {
            const addedParticipants = event.logMessageData.addedParticipants;
            for (const person of addedParticipants) {
                api.sendMessage(`🎶 أهلاً بك يا ${person.fullName} في مجموعتنا! نورتنا 🖤`, event.threadID);
            }
            return;
        }

        // تجاهل أي شيء غير الرسائل
        if (event.type !== "message" && event.type !== "message_reply") return;
        if (!event.body || event.senderID === api.getCurrentUserID()) return;

        const body = event.body.trim().toLowerCase();
        const threadID = event.threadID;
        const messageID = event.messageID;

        // 🟢 2. حماية بسيطة من السبام
        const now = Date.now();
        if (spamControl[event.senderID] && now - spamControl[event.senderID] < 1000) return;
        spamControl[event.senderID] = now;

        // 🟢 3. نظام الردود التلقائية (يمكنك إضافة ما تريد هنا)
        const autoReplies = {
            "مرحبا": "أهلاً بك يا طيب.. كيف أساعدك؟ 🌸",
            "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته.. نورت المجموعة 🎶",
            "باي": "في أمان الله، ننتظر عودتك 💖",
            "كيفك": "الحمد لله بخير، أنت كيف حالك؟ 😉",
            "ليلى": "عيون ليلى.. نادني بالأوامر (مثال: مزاج) 🖤",
            "بوت": "أنا ليلى.. لست مجرد بوت، أنا رفيقتكم في المجموعة!"
        };

        // فحص الكلمات المفتاحية
        for (const key in autoReplies) {
            if (body.includes(key)) {
                return api.sendMessage(autoReplies[key], threadID, messageID);
            }
        }

        // 🟢 4. أوامر الترفيه (بدون ملفات خارجية)
        if (body.includes("مزاج")) {
            const moods = ["🔥 متوهجة", "🎶 هادئة جداً", "🖤 شاعرة", "🎭 مرحة", "🌙 مسترخية"];
            const randomMood = moods[Math.floor(Math.random() * moods.length)];
            return api.sendMessage(`🎭 مزاج ليلى الآن: ${randomMood}`, threadID, messageID);
        }

        if (body === "ايدي") {
            return api.sendMessage(`🆔 معرفك الخاص: ${event.senderID}`, threadID, messageID);
        }

        if (body === "الوقت") {
            const time = new Date().toLocaleTimeString('ar-EG');
            return api.sendMessage(`🕒 الساعة الآن: ${time}`, threadID, messageID);
        }
    });
});
