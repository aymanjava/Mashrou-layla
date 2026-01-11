const login = require("fca-unofficial"); 
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.get('/', (req, res) => res.send('Layla AI is Awake and Running!'));
app.listen(process.env.PORT || 3000, () => {
    console.log(`📡 Web server running on port ${process.env.PORT || 3000}`);
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const appStateData = process.env.APP_STATE;

if (!appStateData) {
    console.error("❌ APP_STATE missing!");
    process.exit(1);
}

login({ appState: JSON.parse(appStateData) }, (err, api) => {
    if (err) return console.error("❌ Login failed:", err);
    
    console.log("✅ ليلى متصلة بالمسنجر وجاهزة للرد!");

    api.listenMqtt(async (err, message) => {
        // تجاهل الأخطاء، الرسائل الفارغة، أو رسائل البوت نفسه
        if (err || !message.body || message.senderID === api.getCurrentUserID()) return;

        try {
            // إظهار علامة "جارٍ الكتابة..." في المسنجر لتبدو طبيعية
            api.sendTypingIndicator(message.threadID);

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "أنتِ ليلى، مساعدة ذكية ولطيفة تجيب باللغة العربية." },
                    { role: "user", content: message.body }
                ],
                max_tokens: 500
            });

            const reply = completion.choices[0].message.content;
            
            // إرسال الرد للمستخدم
            api.sendMessage(reply, message.threadID);

        } catch (error) {
            console.error("❌ OpenAI Error:", error);
            // اختيارياً: يمكنك إرسال رسالة خطأ بسيطة للمستخدم
            // api.sendMessage("عذراً، واجهت مشكلة بسيطة في التفكير!", message.threadID);
        }
    });
});
