# Portfolio Setup Guide

## Quick Start

```bash
npm install
npm run dev
```

---

## 1. AI Chatbot Setup

The chatbot works in two modes:

### Mode A — Smart fallback (works immediately, no API key needed)
The bot answers common questions about you using built-in logic. Works out of the box!

### Mode B — Real Claude AI (best experience)
1. Go to [console.anthropic.com](https://console.anthropic.com) and create a free account
2. Create an API key
3. Create a `.env` file in the project root:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```
4. Restart dev server: `npm run dev`

> **Note:** For production, use a backend proxy instead of exposing your API key in the browser.
> A simple Node/Express proxy is recommended.

---

## 2. Contact Form Setup (EmailJS)

1. Go to [emailjs.com](https://www.emailjs.com) and create a free account
2. Create an **Email Service** (connect Gmail or Outlook) → copy the **Service ID**
3. Create an **Email Template** with these variables:
   - `{{from_name}}` `{{from_email}}` `{{subject}}` `{{message}}` `{{to_name}}`
4. Copy the **Template ID**
5. Go to **Account → API Keys** → copy your **Public Key**
6. Open `src/sections/Contact.tsx` and replace:
   ```ts
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```

---

## 3. Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — deploy to Netlify, Vercel, or GitHub Pages.
