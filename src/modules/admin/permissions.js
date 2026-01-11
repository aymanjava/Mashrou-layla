const config = require('../../config/bot.config.js');

module.exports = {
    isAdmin: (senderID) => {
        const admins = ["61577861540407"]; // معرفك يا أيمن
        return admins.includes(senderID);
    },
    isThreadAdmin: async (api, threadID, senderID) => {
        const info = await api.getThreadInfo(threadID);
        return info.adminIDs.some(admin => admin.id === senderID);
    }
};
