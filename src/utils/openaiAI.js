const { Configuration, OpenAIApi } = require('openai');
const OPENAI_KEY = process.env.OPENAI_KEY;

if (!OPENAI_KEY) console.warn('⚠️ لم يتم تعيين OPENAI_KEY');

const configuration = new Configuration({ apiKey: OPENAI_KEY });
const openai = new OpenAIApi(configuration);

module.exports = {
  async ask(question) {
    if (!OPENAI_KEY) return '❌ OpenAI غير مفعل';
    try {
      const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
        max_tokens: 250
      });
      return res.data.choices[0].message.content.trim();
    } catch (err) {
      console.error('❌ خطأ GPT:', err);
      return '❌ حدث خطأ أثناء معالجة السؤال';
    }
  }
};
