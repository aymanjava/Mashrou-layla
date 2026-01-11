module.exports = {
  name: "EventController",

  handle(event, ctx) {
    ctx.handlers.SpamController.check(event, ctx);

    if (event.type === "message" || event.type === "message_reply") {
      ctx.events.message?.run(event, ctx);
    }

    if (event.logMessageType) {
      const ev = ctx.events[event.logMessageType];
      ev && ev.run(event, ctx);
    }
  }
};
