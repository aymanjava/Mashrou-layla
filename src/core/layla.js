const { loadCommands } = require("./loader");
const fca = require("fca-unofficial");

const commands = loadCommands();

// إعدادات بوت ليلى
const apiOptions = {
  email: "email@domain.com",
  password: "password_here"
};

fca(apiOptions, (err, api) => {
  if (err) return console.error("فشل تسجيل الدخول:", err);

  console.log("✅ تم تسجيل الدخول بنجاح!");

  // استماع للرسائل
  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    for (const command of commands) {
      if (command.onStart) {
        try {
          command.onStart({ api, event });
        } catch (e) {
          console.error("خطأ في تنفيذ الأمر:", e.message);
        }
      }
    }
  });
});
