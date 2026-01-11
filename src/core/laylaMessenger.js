require('dotenv').config();
const login = require('fb-chat-api');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { ask } = require('../utils/openaiAI');

// ================== WEB SERVER (لـ Render) ==================
const app = express();
app.get('/', (req, res) => res.send('✅ Layla Messenger is Alive!'));
app.listen(process.env.PORT || 3000, () =>
  console.log('📡 خادم ويب شغال!')
);

// ================== AppState ==================
const appStatePath = './appstate.json';
if (!fs.existsSync(appStatePath)) {
  console.error('❌ ملف appstate.json غير موجود!');
  process.exit(1);
}
const appState = JSON.parse(fs.readFileSync(appStatePath, 'utf8'));

// ================== تسجيل الدخول ==================
login({ appState }, (err, api) => {
  if (err) return console.error('❌ خطأ تسجيل الدخول:', err);
  console.log('✅ ليلى متصلة الآن بالمسنجر عبر AppState!');

  // ================== تحميل الأحداث ==================
  const eventsPath = path.join(__dirname, '../events');
  const eventFiles = fs.existsSync(eventsPath)
    ? fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))
    : [];

  const events = new Map();
  for (const file of eventFiles) {
    const ev = require(path.join(eventsPath, file));
    events.set(ev.name, ev.execute.bind(null, api));
  }

  // ================== بدء الاستماع ==================
  api.listenMqtt((err, event) => {
    if (err) return console.error(err);
    if (!event.body) return;

    const command = event.body.trim();

    // تنفيذ أحداث عامة
    if (events.has('message')) events.get('message')({ api, event });

    // أمر ذكاء اصطناعي: .ليلى <سؤال>
    if (command.startsWith('.ليلى')) {
      const question = command.replace('.ليلى', '').trim();
      if (!question) return api.sendMessage('❌ اكتب السؤال بعد ".ليلى"', event.threadID);

      ask(question).then(answer => {
        api.sendMessage(`🤖 ليلى: ${answer}`, event.threadID);
      }).catch(e => {
        console.error('❌ خطأ AI:', e);
        api.sendMessage('❌ حدث خطأ أثناء معالجة السؤال', event.threadID);
      });
    }
  });
});
