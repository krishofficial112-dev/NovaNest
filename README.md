# NovaNest — All‑in‑One Tech Services

Modern, animated landing page for a tech services brand. Pure static (no build step). **GitHub Pages ready** for one‑click deploy.

## ⚡ Quick Start

1. Download the ZIP from ChatGPT and extract it.
2. Edit `data/profile.json` with your details (name, title, bio, email, links). Replace `assets/profile-placeholder.png` with your photo if you like.
3. (Optional) Replace logos/colors/text in `index.html` as needed.
4. (Optional) Update the contact form action URL in `#contactForm` to your Formspree endpoint.
5. Create a new GitHub repo and upload everything from the folder (or drag‑and‑drop the ZIP to GitHub to upload and then **Extract**).
6. Go to **Settings → Pages**. Set:
   - Source: **Deploy from a branch**
   - Branch: **main** (root), then save.
7. Your site will go live at `https://<your-username>.github.io/<repo-name>/`.

### Custom Domain
- Add your domain in **Settings → Pages**.
- Create a `CNAME` record pointing to `<your-username>.github.io`.
- Optionally add a `CNAME` file in the repo root with your domain name.

## 🧩 Tech
- Tailwind (CDN) for clean, modern styles.
- GSAP for smooth micro‑interactions and scroll animations.
- Zero build tools—just static files.

## 📁 Structure
```
.
├── assets/
│   ├── hero.svg
│   ├── logo.svg
│   └── profile-placeholder.png
├── css/
│   └── styles.css
├── data/
│   └── profile.json
├── js/
│   └── app.js
├── .nojekyll
├── 404.html
├── index.html
├── LICENSE
└── README.md
```

## ✏️ Personalize
- Brand name "NovaNest" is just a placeholder—search/replace across files.
- Colors are in Tailwind config inside `index.html` (look for `colors.brand`).

## ✅ Tips
- Keep images optimized (SVG where possible).
- If you move files, make sure paths still match in HTML/JS.
