const config = require('../config/bot.config.js');

module.exports = {
    isAdmin: (userID) => config.adminIDs.includes(userID) || userID === config.ownerID,
    isOwner: (userID) => userID === config.ownerID,
    
    // نظام الرتب للمجموعات
    getRole: (userID) => {
        if (userID === config.ownerID) return { level: 3, name: "المطور الرئيسي" };
        if (config.adminIDs.includes(userID)) return { level: 2, name: "إدمن البوت" };
        return { level: 0, name: "عضو" };
    }
};
