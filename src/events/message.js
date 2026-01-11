module.exports = {
  name: "message",

  run(event, ctx) {
    ctx.handlers.CommandController.handle(event, ctx);
    ctx.handlers.AutoReplyController.handle(event, ctx);
    ctx.handlers.MoodController.handle(event, ctx);
  }
};
