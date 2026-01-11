const fs = require('fs');
const path = require('path');
const Layla = require('./src/core/layla');

// تحميل AppState لتسجيل الدخول تلقائيًا
const appStatePath = path.join(__dirname, 'appstate', 'appstate.json');
if(!fs.existsSync(appStatePath)) {
    console.error('❌ AppState غير موجود! يرجى تسجيل الدخول أولاً.');
    process.exit(1);
}

const appState = JSON.parse(fs.readFileSync(appStatePath, 'utf-8'));

// إنشاء مثيل البوت
const bot = new Layla(appState);

// بدء البوت
bot.start()
    .then(() => {
        console.log('🚀 ليلى أصبحت متصلة وجاهزة على Messenger!');
    })
    .catch(err => {
        console.error('❌ حدث خطأ أثناء تشغيل ليلى:', err);
        process.exit(1);
    });

// مراقبة الأخطاء غير المعالجة
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
