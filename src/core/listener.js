module.exports = async function listener(err, event) {
  if (err) return;

  const { api, events, config } = global.Layla;

  // Events
  if (events.has(event.type)) {
    try {
      events.get(event.type).execute({ api, event });
    } catch (e) {
      console.error("Event error:", e);
    }
  }

  // تحضير للأوامر (مقفول حاليًا)
  if (event.type === "message" && event.body) {
    if (!event.body.startsWith(config.prefix)) return;
    // الأوامر ستُفعّل لاحقًا
  }
};
