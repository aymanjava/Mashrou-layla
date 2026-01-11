// src/core/layla.js

require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express'); // إضافة express

// ================== WEB SERVER (FOR RENDER) ==================
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Layla Bot is Alive and Running!');
});

app.listen(port, () => {
  console.log(`📡 سرفر الويب جاهز على المنفذ ${port}`);
});

// ================== ENV ==================
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPENAI_KEY = process.env.OPENAI_KEY || null;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:./database.sqlite';

if (!DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN غير موجود');
  process.exit(1);
}

// ================== DATABASE ==================
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
});

// ================== DISCORD CLIENT ==================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Map();

// ================== LOAD COMMANDS ==================
const commandsPath = path.join(__dirname, '../commands');
if (fs.existsSync(commandsPath)) {
  const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.config.name, command);
  }
}

// ================== DEFAULT COMMAND ==================
client.commands.set('mood', {
  config: {
    name: 'mood',
    description: 'يعرض مزاج ليلى الحالي',
  },
  onStart: async ({ message }) => {
    const moods = [
      "🔥 جريئة ولا أقبل التحدي إلا للفوز",
      "🎶 هادئة كهدوء ما قبل العاصفة",
      "🖤 حزينة لكن كبريائي يمنعني من الانكسار",
      "🧨 متفجرة.. اقترب بحذر",
    ];
    message.reply(`🎭 مزاج ليلى الآن: ${moods[Math.floor(Math.random() * moods.length)]}`);
  },
});

// ================== EVENTS ==================
client.once('ready', async () => {
  console.log(`✅ ليلى تعمل الآن | ${client.user.tag}`);
  try {
    await sequelize.authenticate();
    console.log('✅ قاعدة البيانات متصلة');
  } catch (err) {
    console.error('❌ فشل الاتصال بقاعدة البيانات:', err);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const name = args.shift().toLowerCase();

  const command = client.commands.get(name);
  if (!command) return;

  try {
    await command.onStart({
      client,
      message,
      args,
      axios,
      sequelize,
      OPENAI_KEY,
    });
  } catch (err) {
    console.error('❌ خطأ أمر:', err);
    message.reply('❌ صار خطأ أثناء تنفيذ الأمر');
  }
});

// ================== LOGIN ==================
client.login(DISCORD_TOKEN);
