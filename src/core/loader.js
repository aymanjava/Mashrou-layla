const fs = require('fs');
const path = require('path');

module.exports = {
    loadCommands: () => {
        const commands = {};
        const commandFolders = fs.readdirSync(path.join(__dirname, '../modules/commands'));

        for (const folder of commandFolders) {
            const files = fs.readdirSync(path.join(__dirname, `../modules/commands/${folder}`)).filter(f => f.endsWith('.js'));
            for (const file of files) {
                const cmd = require(`../modules/commands/${folder}/${file}`);
                commands[cmd.name] = cmd;
            }
        }
        return commands;
    },

    loadEvents: () => {
        const events = {};
        const files = fs.readdirSync(path.join(__dirname, '../events')).filter(f => f.endsWith('.js'));

        for (const file of files) {
            const evt = require(`../events/${file}`);
            events[evt.name] = evt;
        }
        return events;
    },

    loadFeatures: () => {
        const features = {};
        const featureFolders = fs.readdirSync(path.join(__dirname, '../modules/features'));

        for (const folder of featureFolders) {
            features[folder] = {};
            const files = fs.readdirSync(path.join(__dirname, `../modules/features/${folder}`)).filter(f => f.endsWith('.js'));
            for (const file of files) {
                const feature = require(`../modules/features/${folder}/${file}`);
                features[folder][feature.name] = feature;
            }
        }
        return features;
    }
};
