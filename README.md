# Nexxorix Digital Solutions LLP — Website

Static multi-page site: `index.html`, `services.html`, `faq.html`, `about.html`, `contact.html`, `signup.html` (Get Started), plus `privacy-policy.html`, `terms-of-use.html`, `cookie-policy.html`, `disclaimer.html`. Every page is fully self-contained (CSS and JavaScript are built into each HTML file), so there are no folders to upload. Every page has the AI chat assistant and a WhatsApp button.

## Deploy on GitHub Pages with your domain
1. Upload all the files (unzipped) to the **root** of a GitHub repo, with `index.html` at the top level, not inside another folder.
2. Settings → Pages → deploy from `main` / root.
3. Settings → Pages → Custom domain: `www.nexxorixsolutions.com`. Tick Enforce HTTPS once available.
4. At your domain registrar add a `CNAME` record: `www` → `<your-github-username>.github.io` (and GitHub's A records for the bare domain).
5. Submit `https://www.nexxorixsolutions.com/sitemap.xml` in Google Search Console.

## Make forms and the chatbot email you (important)
GitHub Pages is static, so it can't send email by itself. Until you set this up, forms and the chatbot's Live Agent form open the visitor's email app with the message pre-filled (mailto).
1. Create a free account at formspree.io **using nexxorix50@gmail.com** and create a form.
2. Copy the form endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Send that endpoint to Claude to rebuild the site with it included, or replace `const FORM_ENDPOINT = "";` in each HTML file (search for `FORM_ENDPOINT`).
Submissions from the contact form, Get Started form, and the chatbot's Live Agent form (email + query) will then arrive in that inbox, and the chatbot shows the "Thank you. Your request has been sent..." message.

## About the chatbot
The `<script>` at the bottom of each page contains a scripted assistant that follows your support brief: it asks about the visitor's goal, recommends the matching service, never states prices, guarantees, or timelines, refuses to take passwords/cards/OTPs, and opens the Live Agent form (Email Address + Your Query, with validation) when someone asks for a person, a quote, or a call. To edit answers, change the `SERVICES` array.
A live generative-AI version would need a small server (e.g. a Cloudflare Worker) to hold an API key safely. Keep your full system prompt server-side if you build that, since anything in a public GitHub repo is readable by everyone.

## Before you launch
- Replace placeholder wording anywhere you want your own details (address, registration number, etc.). The legal pages are standard templates; have a lawyer review them.
- Contact details live in the footer and contact page of each HTML file.
