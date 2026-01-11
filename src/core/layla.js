const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // كلمة السر التي تضعها في فيسبوك

// 1. تفعيل الـ Webhook (ضروري لربط Render بفيسبوك)
app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ تم تفعيل Webhook فيسبوك بنجاح');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.send('✅ سيرفر ليلى يعمل وجاهز لاستقبال رسائل مسنجر');
  }
});

// 2. استقبال الرسائل والرد عليها
app.post('/', async (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(async (entry) => {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id; // معرف الشخص اللي ارسل

      if (webhook_event.message && webhook_event.message.text) {
        const text = webhook_event.message.text.toLowerCase();

        // الرد على أمر !mood
        if (text === '!mood') {
          await sendResponse(sender_psid, "🎭 مزاج ليلى الآن: 🔥 جريئة ومستعدة للمسنجر!");
        }
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// وظيفة إرسال الرسالة لفيسبوك
async function sendResponse(sender_psid, responseText) {
  try {
    await axios.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      recipient: { id: sender_psid },
      message: { text: responseText }
    });
  } catch (error) {
    console.error('❌ خطأ في إرسال الرسالة:', error.response.data);
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`📡 سيرفر المسنجر جاهز على منفذ ${port}`));
