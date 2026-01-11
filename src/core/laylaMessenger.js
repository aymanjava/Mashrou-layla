Const login = require("fca-unofficial"); 
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.get('/', (req, res) => res.send('Layla AI is Awake!'));
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
        if (err || !message.body || message.senderID === api.getCurrentUserID()) return;
        
        // تفاعل البوت عند كتابة ".ليلى "
        if (message.body.startsWith('.ليلى ')) {
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: message.body.slice(6) }],
                });
                api.sendMessage(completion.choices[0].message.content, message.threadID);
            } catch (error) { console.error(error); }
        }
    });
});

عدل
