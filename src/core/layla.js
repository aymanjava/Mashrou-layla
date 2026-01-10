// src/core/layla.js

// 🟢 استدعاء المكتبات الأساسية
require('dotenv').config(); // يقرأ قيم .env
const { Client, GatewayIntentBits } = require('discord.js');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 🟢 قراءة المتغيرات من .env
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPENAI_KEY = process.env.OPENAI_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;

// 🟢 إعداد قاعدة البيانات SQLite
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // منع اللوجات الكثيرة
});

// 🟢 إنشاء كائن Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// 🟢 تسجيل دخول البوت
client.login(DISCORD_TOKEN);

// 🟢 حدث تشغيل البوت
client.on('ready', async () => {
  console.log(`✅ بوت ليلى جاهز! Logged in as ${client.user.tag}`);
  // تجربة الاتصال بقاعدة البيانات
  try {
    await sequelize.authenticate();
    console.log('✅ قاعدة البيانات متصلة بنجاح');
  } catch (error) {
    console.error('❌ خطأ في قاعدة البيانات:', error);
  }
});

// 🟢 تحميل جميع الأوامر من مجلد commands (إذا عندك)
const commandsPath = path.join(__dirname, '../commands');
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  client.commands = new Map();
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.config.name, command);
  }
}

// 🟢 استقبال الرسائل وتشغيل الأوامر
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const prefix = '!'; // تقدر تغيّر البريفكس
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (command) {
    try {
      await command.onStart({ client, message, args, axios, sequelize, OPENAI_KEY, GITHUB_TOKEN });
    } catch (error) {
      console.error('❌ خطأ في تنفيذ الأمر:', error);
      message.reply('❌ حدث خطأ أثناء تنفيذ هذا الأمر.');
    }
  }
});

// 🟢 مثال أمر مزاج ليلى (يمكنك تعديله)
client.commands = client.commands || new Map();
client.commands.set('mood', {
  config: {
    name: 'mood',
    description: 'يعرض مزاج ليلى الحالي',
    cooldowns: 5,
  },
  onStart: async ({ message }) => {
    const moods = [
      "🔥 جريئة ولا أقبل التحدي إلا للفوز",
      "🎶 هادئة كهدوء ما قبل العاصفة",
      "🖤 حزينة لكن كبريائي يمنعني من الانكسار",
      "🧨 متفجرة.. اقترب بحذر"
    ];
    const mood = moods[Math.floor(Math.random() * moods.length)];
    message.reply(`🎭 مزاج ليلى الآن: ${mood}`);
  }
});
