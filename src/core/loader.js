const fs = require("fs");
const path = require("path");

function loadDir(dir) {
  const data = {};
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory())
      Object.assign(data, loadDir(full));
    else if (file.endsWith(".js")) {
      const mod = require(full);
      data[mod.name || file.replace(".js","")] = mod;
    }
  });
  return data;
}

module.exports = {
  loadAll(api) {
    return {
      api,
      events: loadDir(path.resolve("src/events")),
      commands: loadDir(path.resolve("src/modules/commands")),
      utils: loadDir(path.resolve("src/utils")),
      handlers: loadDir(path.resolve("src/handlers"))
    };
  }
};
