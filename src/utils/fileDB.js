const fs = require('fs-extra');

module.exports = {
    read: (path) => {
        try {
            return fs.readJsonSync(path);
        } catch (e) {
            return {};
        }
    },
    write: (path, data) => {
        try {
            fs.writeJsonSync(path, data, { spaces: 2 });
            return true;
        } catch (e) {
            console.error("❌ خطأ في حفظ البيانات:", e);
            return false;
        }
    }
};
