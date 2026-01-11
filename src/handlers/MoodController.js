module.exports = {
  name: "MoodController",

  handle(event, ctx) {
    if (event.body === "مزاجك")
      ctx.api.sendMessage(ctx.utils.laylaMood(), event.threadID);
  }
};
