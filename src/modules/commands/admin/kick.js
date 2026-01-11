module.exports = {
    config: {
        name: "مح",
        category: "admin"
    },
    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID, mentions, type, messageReply } = event;
        const adminID = "61577861540407"; 

        if (senderID !== adminID) return api.sendMessage("⚠️ هذا الأمر من صلاحيات أيمن فقط.", threadID, messageID);

        let victimID;
        if (type === "message_reply") victimID = messageReply.senderID;
        else if (Object.keys(mentions).length > 0) victimID = Object.keys(mentions)[0];
        else return api.sendMessage("❌ رد على الشخص أو سوي له تاغ.", threadID, messageID);

        if (victimID == api.getCurrentUserID()) return api.sendMessage("❌ لا أستطيع طرد نفسي.", threadID);
        
        api.removeUserFromGroup(victimID, threadID);
    }
};
