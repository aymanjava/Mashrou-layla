const fs = require("fs");
const path = require("path");

module.exports.loadCommands = (client) => {
  const commandFiles = fs.readdirSync(path.join(__dirname, "../commands"))
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.config.name, command);
  }
  console.log(`[✅] تم تحميل ${commandFiles.length} أوامر`);
};

module.exports.loadEvents = (client) => {
  const eventFiles = fs.readdirSync(path.join(__dirname, "../events"))
    .filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    client.on(event.name, (...args) => event.run(client, ...args));
  }
  console.log(`[✅] تم تحميل ${eventFiles.length} أحداث`);
};
