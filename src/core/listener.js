module.exports = (api, ctx) => {
  api.listenMqtt((err, event) => {
    if (err) return;

    ctx.handlers.EventController.handle(event, ctx);
  });
};
