# Island Mentor

A private, single-user phone app: a little creature on a tile-based island that can only build things when you feed it, either by **answering a lesson card** (+1 ⚡) or by **logging something real** you did (+2 ⚡). The world slowly fills up with things you learned about.

No build step and no dependencies to install. It's plain HTML/JS with three.js vendored in `vendor/`. Everything is stored in `localStorage` on your phone.

## Open it on your phone

The app needs to be served over HTTP (ES modules won't load from `file://`). Pick one:

**A. GitHub Pages (easiest, works anywhere, installable)**
1. Repo → Settings → Pages → Source: *Deploy from a branch* → pick this branch, folder `/ (root)`.
   (Pages on a private repo needs a paid GitHub plan. Netlify Drop or Cloudflare Pages are free alternatives: drag the folder in.)
2. Open the URL in Safari/Chrome on your phone → Share → **Add to Home Screen**.
   It then launches full-screen like an app and works offline.

**B. From your laptop on the same Wi-Fi**
```sh
python3 -m http.server 8080
```
Then open `http://<your-laptop-ip>:8080` on your phone. (Offline caching needs HTTPS, so this mode is for trying things out.)

## How it plays

| Screen | What it does |
|---|---|
| **Home** | A fixed view of the island: Pip, energy leaves, a clock badge. Pip stays in place (bobs, blinks, waves, looks around, naps at 0 energy). Tap Pip or anything you built. |
| **Learn** | An endless feed of ~2-minute cards across 14 categories. Each ends with an opinion question; answering pays +1. Chips filter categories. Skip is free but pays nothing. |
| **I moved** | Workout / Walk / Cooked / Read, optional note, this week's strip. +2 each. |
| **Build** | Everything Pip can make, priced in energy, labelled with the lesson that unlocked it. |
| **📔 Journal** | Every answer you've written, per-category counts, rename the creature, export or reset data. |

No decay, no streak-shaming. At zero energy Pip just naps.

## Where things live

```
index.html, css/style.css   HUD, sheets, layout
js/app.js                   screens, energy, unlock logic, lesson picker
js/world.js                 the 3D island: map, terrain, props, creature, camera
js/items.js                 build catalogue (cost, unlock rule, tile slot)
js/lessons.js               lesson bank + category list
js/state.js                 localStorage save/load
sw.js, manifest.webmanifest offline + home-screen install
```

### Adding lessons
Append to `LESSONS` in `js/lessons.js`: `{ id, cat, level, title, body: [para, para], question, unlocks }`. `level: 2` cards are held back until you've done a level-1 card in that category. The picker prefers unseen cards and avoids repeating the last few categories.

### Adding builds
Add an entry in `js/items.js` (pick a free grass tile from `MAP` in `world.js`, inside the fixed view: roughly x 4–11, z 3–13) and a matching model function in `BUILDERS` in `world.js`.

After changing files, bump `VERSION` in `sw.js` so installed copies pick up the update.
