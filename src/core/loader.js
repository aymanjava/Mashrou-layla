const fs = require("fs");
const path = require("path");

function loadCommands() {
  const commandsPath = path.join(__dirname, "../commands");

  const load = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        load(fullPath);
      } else if (file.endsWith(".js")) {
        try {
          const cmd = require(fullPath);
          if (cmd.name && typeof cmd.execute === "function") {
            global.Layla.commands.set(cmd.name, cmd);
          } else {
            console.warn(`⚠️ الأمر ${file} غير صالح وتجاهلناه`);
          }
        } catch (e) {
          console.error(`❌ فشل تحميل الأمر ${file}:`, e.message);
        }
      }
    }
  };

  load(commandsPath);
  console.log(`✅ Loaded ${global.Layla.commands.size} commands`);
}

function loadEvents() {
  const eventsPath = path.join(__dirname, "../events");
  const files = fs.readdirSync(eventsPath);

  for (const file of files) {
    if (!file.endsWith(".js")) continue;
    try {
      const event = require(path.join(eventsPath, file));
      if (event.name && typeof event.execute === "function") {
        global.Layla.events.set(event.name, event);
      } else {
        console.warn(`⚠️ الحدث ${file} غير صالح وتجاهلناه`);
      }
    } catch (e) {
      console.error(`❌ فشل تحميل الحدث ${file}:`, e.message);
    }
  }

  console.log(`✅ Loaded ${global.Layla.events.size} events`);
}

module.exports = { loadCommands, loadEvents };
