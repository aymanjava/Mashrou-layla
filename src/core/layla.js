const login = require("fca-unofficial");
const fs = require("fs");
const path = require("path");

// تحديد مسار الـ AppState بناءً على هيكلك الجديد
const appStatePath = path.join(__dirname, "../../appstate/appstate.json");

function startBot() {
    try {
        const appState = JSON.parse(fs.readFileSync(appStatePath, "utf8"));
        
        login({ appState }, (err, api) => {
            if (err) {
                console.error("❌ خطأ في تسجيل الدخول: ", err);
                return;
            }

            // إعدادات الاتصال الأساسية
            api.setOptions({
                listenEvents: true,
                selfListen: false,
                forceLogin: true,
                online: true
            });

            console.log("✅ [ LAYLA ] تم الاتصال بنجاح! البوت الآن أونلاين.");

            // الاستماع الأولي فقط للتأكد من العمل
            api.listenMqtt((err, event) => {
                if (err) return;
                
                if (event.type === "message") {
                    console.log(`📩 رسالة جديدة من ${event.senderID}: ${event.body}`);
                    // رَد اختبار بسيط جداً
                    if (event.body === "فحص") {
                        api.sendMessage("العملاق ليلى متصلة وجاهزة! 🎶", event.threadID);
                    }
                }
            });
        });
    } catch (error) {
        console.error("❌ لم يتم العثور على ملف appstate.json في مجلد appstate");
    }
}

module.exports = { startBot };
