const recentMessages = new Map();

module.exports = {
    isSpam: (userID) => {
        const now = Date.now();
        if(!recentMessages.has(userID)) recentMessages.set(userID, []);
        const times = recentMessages.get(userID);
        times.push(now);
        // إزالة الرسائل القديمة أكثر من 5 ثواني
        recentMessages.set(userID, times.filter(t => now - t < 5000));
        return recentMessages.get(userID).length > 5;
    }
};
