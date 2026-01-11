const modulesPath = path.join(__dirname, "../modules");

const loadModules = () => {
  const files = fs.readdirSync(modulesPath);
  for (const file of files) {
    const mod = require(path.join(modulesPath, file));

    // رفع Commands
    if (mod.commands) {
      for (const cmd of mod.commands) {
        if (cmd.name && typeof cmd.execute === "function") {
          global.Layla.commands.set(cmd.name, cmd);
        }
      }
    }

    // رفع Events
    if (mod.events) {
      for (const ev of mod.events) {
        if (ev.name && typeof ev.execute === "function") {
          global.Layla.events.set(ev.name, ev);
        }
      }
    }
  }

  console.log(`✅ Loaded Modules`);
};
