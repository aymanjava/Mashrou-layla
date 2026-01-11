    api.listenMqtt(async (err, message) => {
        // تجاهل الأخطاء أو رسائل البوت نفسه
        if (err || !message.body || message.senderID === api.getCurrentUserID()) return;

        try {
            // إظهار علامة "يكتب الآن..."
            api.sendTypingIndicator(message.threadID);

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message.body }],
            });

            api.sendMessage(completion.choices[0].message.content, message.threadID);
        } catch (error) {
            console.error("OpenAI Error:", error);
        }
    });
