const login = require("fca-unofficial"); // المكتبة المستقرة التي تعمل حالياً
const express = require('express');
const OpenAI = require('openai');

// --- 1. خادم ويب لمنع Render من إغلاق البوت ---
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('✅ ليلى تعمل الآن ومستعدة لاستقبال رسائل المسنجر!');
});

app.listen(port, () => {
    console.log(`📡 السيرفر يعمل على المنفذ: ${port}`);
});

// --- 2. إعداد OpenAI (الإصدار الحديث) ---
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY // سيتم سحبه من إعدادات Environment في Render
});

// --- 3. قراءة الـ AppState من إعدادات Render ---
const appStateData = process.env.APP_STATE;

if (!appStateData) {
    console.error("❌ خطأ: لم يتم إضافة APP_STATE في إعدادات Render (Environment Variables)!");
    process.exit(1);
}

// --- 4. تشغيل البوت والربط مع مسنجر ---
login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) {
        console.error("❌ فشل تسجيل الدخول عبر AppState. تأكد أن الحساب لم يتم تسجيل خروجه!");
        return console.error(err);
    }

    console.log("✅ ليلى متصلة بحسابك وجاهزة للرد على المسنجر!");

    // إعدادات البوت (اختيارية)
    api.setOptions({ listenEvents: true, selfListen: false });

    api.listenMqtt(async (err, message) => {
        if (err) return console.error(err);
        if (!message.body) return; // تجاهل الرسائل التي لا تحتوي على نص

        const input = message.body.trim();

        // الرد بالذكاء الاصطناعي عند كتابة ".ليلى " قبل السؤال
        if (input.startsWith('.ليلى ')) {
            const question = input.slice(6); // استخراج السؤال بعد كلمة .ليلى
            
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: question }],
                    max_tokens: 250
                });

                const reply = completion.choices[0].message.content;
                api.sendMessage(reply, message.threadID);

            } catch (error) {
                console.error("❌ خطأ من OpenAI:", error);
                api.sendMessage("تعبت شوية.. اسألني لاحقاً! 😴", message.threadID);
            }
        }
    });
});
