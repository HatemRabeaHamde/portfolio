# Hatem Rabea — Portfolio

Next.js (App Router) build of the Figma file *Portfolio — Senior Full-Stack Developer*.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Pages

| Route         | Figma frame                            |
| ------------- | -------------------------------------- |
| `/`           | 1 — Website                            |
| `/work`       | 12 — Work · All projects               |
| `/work/[slug]`| 11 — Project Page (one per project)    |
| `/contact`    | 13 — Contact / 13b — Message sent      |
| any bad URL   | 14 — 404                               |
| first visit   | 15 — Loading (once per browser session)|

## Before going live

- **Contact form:** set `CONTACT_WEBHOOK_URL` to any endpoint that accepts a JSON POST
  (Formspree, Zapier, Slack, a Resend relay…). Without it, messages are only logged on the server.
- **Live links:** only the Hager Tarek portfolio has a public URL. Add others in `links` per project.
- **Content:** projects and case studies live in `lib/projects.ts` (sourced from the CV and the
  public READMEs on github.com/HatemRabeaHamde); socials and contact details in `lib/site.ts`.
- **CV:** `public/Hatem-Rabea-CV.pdf` — replace the file to update every "Download CV" button.
