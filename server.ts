import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint: AI Speech Suggestion Assistant for Voice Donors
  app.post('/api/generate-speech-prompt', async (req, res) => {
    try {
      const { category, topicPrompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback default message if no API key set
        return res.json({
          text: `أيها الأبطال، أنتم مصدر إلهام لنا جميعاً. قوتكم وصبركم يعلمنا معنى الحياة الحقيقي. نحن معكم بدعائنا وأصواتنا ومحبتنا دائماً!`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `أنت مساعد لكتابة نصوص رسائل صوتية ملهمة باللغة العربية الفصحى الدافئة والمشجعة.
الموضوع أو الفئة: ${category || 'دعم إنساني'}
الهدف: ${topicPrompt || 'إرسال كلمة طيبة ترفع المعنويات وتزرع الأمل'}

المطلوب: اكتُب رسالة صوتية قصيرة (بين 20 إلى 40 كلمة) يمكن للمتبرع قراءتها بصوته وتسجيلها.
يجب أن تكون الكلمات مؤثرة، مليئة بالأمل والدفء، خالية من التكلّف. ارجع النص فقط بدون مقدمات.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = response.text ? response.text.trim() : 'أنتم الأبطال الحقيقيون، والشفاء والقوة حليفكم بإذن الله!';
      return res.json({ text });
    } catch (error) {
      console.error('Error generating AI speech prompt:', error);
      return res.json({
        text: 'أرسل كلمتك من القلب: صمودكم وابتسامتكم تنير طريق الأمل لنا وللجميع. دمتم بخير وقوة دائماً!'
      });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
