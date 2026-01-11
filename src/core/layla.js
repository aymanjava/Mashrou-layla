require('dotenv').config();
const { MessengerClient } = require('fca-unofficial');
const Loader = require('./loader');
const Listener = require('./listener');
const { EventController } = require('../handlers/EventController');
const { CommandController } = require('../handlers/CommandController');
const path = require('path');

class Layla {
  constructor() {
    this.client = new MessengerClient({
      appStateFile: path.join(__dirname, '../../appstate/appstate.json')
    });
    this.loader = new Loader(this);
    this.listener = new Listener(this);
    this.commands = new CommandController(this);
    this.events = new EventController(this);
  }

  async start() {
    console.log('🚀 Starting Layla Bot...');
    await this.client.login();
    await this.loader.loadAll();
    this.listener.listenAll();
    console.log('✅ Layla Bot is online!');
  }
}

module.exports = Layla;
