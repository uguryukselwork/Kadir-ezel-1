import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Helper to resolve absolute base URL for WhatsApp & Social Media Preview Cards
function getBaseUrl(req: express.Request): string {
  if (process.env.APP_URL && process.env.APP_URL.startsWith('http')) {
    return process.env.APP_URL.replace(/\/$/, '');
  }
  const forwardedProto = req.headers['x-forwarded-proto'];
  const proto = typeof forwardedProto === 'string' ? forwardedProto.split(',')[0].trim() : (req.secure ? 'https' : 'https');
  const host = req.headers['x-forwarded-host'] || req.headers.host || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

// Function to inject absolute WhatsApp og:image & canonical URLs into HTML
function injectSocialMeta(html: string, baseUrl: string, currentPath: string): string {
  const ogImageUrl = `${baseUrl}/og-image.jpg`;
  const canonicalUrl = `${baseUrl}${currentPath}`;
  return html
    .replace(/content="\/og-image\.jpg"/g, `content="${ogImageUrl}"`)
    .replace(/content="\/og-image\.png"/g, `content="${baseUrl}/og-image.png"`)
    .replace(/<head>/i, `<head>\n    <link rel="canonical" href="${canonicalUrl}" />\n    <meta property="og:url" content="${canonicalUrl}" />`);
}

// Gemini API route: AI Assistant for Thailand travel recommendations
app.post('/api/ai-travel-tip', async (req, res) => {
  const { question } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({ tip: 'Tayland tatilinizde ada turları ve motor kiralama için Kadir Ezel ile WhatsApp üzerinden iletişime geçebilirsiniz!' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Sen Tayland ve Phuket uzmanı samimi bir Türk rehbersin (Kadir Thai). Turistlerin sorularına kısa, pratik ve dostane 1-2 cümlelik yanıt ver. Soru: ${question || 'Phuket te ne yapmalı'}.`,
    });

    const tip = response.text?.trim() || 'Phuket ve ada turları için Kadir Thai rehberiniz her an yanınızda!';
    return res.json({ tip });
  } catch (error: any) {
    console.warn('AI travel tip fallback:', error?.message);
    return res.json({ tip: 'Phi Phi, James Bond turları ve scooter kiralama için Kadir Ezel WhatsApp hattından destek alabilirsiniz.' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });

    // Handle HTML requests to inject absolute og:image for WhatsApp crawler & mobile browsers
    app.use(async (req, res, next) => {
      const userAgent = req.headers['user-agent'] || '';
      const isSocialCrawler = /facebookexternalhit|WhatsApp|Twitterbot|TelegramBot|LinkedInBot|Slackbot/i.test(userAgent);
      const isHtmlReq = req.method === 'GET' && (req.headers.accept?.includes('text/html') || req.path === '/' || req.path === '/index.html' || isSocialCrawler);

      if (isHtmlReq && !req.path.startsWith('/@') && !req.path.includes('.')) {
        try {
          const baseUrl = getBaseUrl(req);
          let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
          template = await vite.transformIndexHtml(req.originalUrl, template);
          const finalHtml = injectSocialMeta(template, baseUrl, req.originalUrl);
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
        } catch (e) {
          return next(e);
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
    app.get('*', (req, res) => {
      try {
        const baseUrl = getBaseUrl(req);
        const indexPath = path.resolve(__dirname, 'dist', 'index.html');
        if (fs.existsSync(indexPath)) {
          let html = fs.readFileSync(indexPath, 'utf-8');
          const finalHtml = injectSocialMeta(html, baseUrl, req.originalUrl);
          res.setHeader('Content-Type', 'text/html');
          return res.send(finalHtml);
        }
        res.sendFile(indexPath);
      } catch (err) {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kadir Thai server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
