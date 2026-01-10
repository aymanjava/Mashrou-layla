const fs = require("fs");
const path = require("path");

const commands = [];

function loadCommands() {
  const commandFiles = fs.readdirSync(path.join(__dirname, "../commands")).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    try {
      const command = require(`../commands/${file}`);
      commands.push(command);
    } catch (err) {
      console.error(`خطأ في تحميل الأمر ${file}:`, err.message);
    }
  }

  return commands;
}

module.exports = { loadCommands };
