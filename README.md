# Muhammad Mobeen — Portfolio

A one-page React portfolio built with Vite, Tailwind (via CDN), and plain CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Before you deploy — things to update

1. **LinkedIn link** — in `src/App.jsx`, search for `linkedin.com/in/your-handle`
   and replace it with your real LinkedIn URL once your profile is live.
2. **AI Voice Billing System link** — in `src/App.jsx`, find the `Projects()`
   function and set `link:` for that project to your GitHub repo or live
   Vercel URL if you have one, instead of `null`.
3. **Profile photo** — this version is text-only. If you want to add your
   photo, drop the image file into the `public/` folder and reference it
   with an `<img src="/your-photo.jpg" />` tag in the Hero section.
4. **Resume download** — if you want a "Download CV" button, put your CV PDF
   in `public/` (e.g. `public/Muhammad_Mobeen_CV.pdf`) and add a link:
   `<a href="/Muhammad_Mobeen_CV.pdf" download>Download CV</a>`

## Deploy for free (Vercel)

1. Push this folder to a new GitHub repository.
2. Go to https://vercel.com, sign in with GitHub, click "Add New Project."
3. Select the repo — Vercel auto-detects Vite and sets the build command
   (`npm run build`) and output directory (`dist`) for you.
4. Click Deploy. You'll get a live `.vercel.app` URL you can put on your CV,
   LinkedIn, and Rozee profile.

## Deploy for free (Netlify)

1. Push this folder to GitHub.
2. Go to https://app.netlify.com, "Add new site" → "Import an existing
   project," and pick the repo.
3. Build command: `npm run build`, publish directory: `dist`.
4. Deploy.
