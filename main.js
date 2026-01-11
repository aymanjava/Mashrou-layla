// main.js
require('dotenv').config();
const express = require('express');
const login = require('fca-unofficial');
const OpenAI = require('openai');
const fs = require('fs-extra');
const axios = require('axios');
const moment = require('moment');

// --- خادم ويب لمنع Render من النوم ---
const app = express();
app.get('/', (req, res) => res.send('Layla Mega Bot Active!'));
app.listen(process.env.PORT || 3000);

// --- OpenAI ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// --- AppState Messenger ---
const appStateData = process.env.APP_STATE;
if (!appStateData) throw new Error("APP_STATE missing!");

// --- تسجيل الدخول للبوت ---
login({ appState: JSON.parse(appStateData) }, (err, api) => {
  if(err) return console.error("Login failed:", err);

  api.setOptions({ listenEvents: true, selfListen: false, online: true });
  console.log("✅ Layla Mega Bot Ready!");

  api.listenMqtt(async (err, message) => {
    if(err || !message.body) return;

    // --- مثال: الردود الذكية ---
    if(message.body.includes(".لولو")) {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "أنت ليلى، ذكية، قصيرة ومفيدة." },
            { role: "user", content: message.body }
          ],
          max_tokens: 200
        });
        const reply = completion.choices[0].message.content;
        api.sendMessage(reply, message.threadID);
      } catch(e) { console.error(e); }
    }

    // --- إضافة أي نظام جديد ---
    // يمكنك هنا إضافة Anti-Spam، Auto-Reply، Music Player، إلخ.
  });
});
