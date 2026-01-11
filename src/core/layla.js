const login = require("fca-unofficial");
const path = require("path");
const loader = require("./loader");
const listener = require("./listener");

module.exports = {
  start() {
    const appState = require(path.resolve("appstate/appstate.json"));
    login({ appState }, (err, api) => {
      if (err) return console.error(err);

      api.setOptions({ listenEvents: true });
      const context = loader.loadAll(api);

      listener(api, context);
      console.log("🔥 Layla is online");
    });
  }
};
