module.exports = {
  name: "AutoReplyController",

  handle(event, ctx) {
    if (!event.body) return;
    if (event.body === "سلام")
      ctx.api.sendMessage("هلا 🤍", event.threadID);
  }
};
