# Island Mentor

A private, single-user phone app: a little creature on a tile-based island that can only build things when you feed it, either by **answering a lesson card** (+1 energy) or by **logging something real** you did (+2 energy). The world slowly fills up with things you learned about.

No build step and no dependencies to install. It's plain HTML/JS with three.js vendored in `vendor/`. Everything is stored in `localStorage` on your phone.

## Deploy

Live at **https://annika-thomas.github.io/life-coach-game/** (GitHub Pages, from this branch). Every push redeploys in a minute or two.

### Alternative: Netlify (works with a private repo)

Only needed if you make the repo private again (Pages on private repos needs a paid GitHub plan; Netlify's free tier handles private repos).

1. Sign in at app.netlify.com with GitHub → **Add new site → Import an existing project → GitHub**.
2. Grant access to `life-coach-game` and pick it.
3. Settings: **Branch to deploy** `claude/adoring-rubin-c5kow2`, **Build command** empty, **Publish directory** `.` → Deploy.
4. Optional: Site configuration → change the site name (e.g. `my-island-xyz.netlify.app`).

From then on, every push to that branch redeploys in about 30 seconds. (Cloudflare Pages works the same way if you prefer it.)

The URL is public but unlisted. Your answers and progress never leave your phone; the site only serves the app files and the lesson bank.

### Put it on your home screen
Open the URL in **Safari** (iPhone) → Share → **Add to Home Screen**. It then opens full-screen and works offline.

- Use the home-screen icon from then on. On iPhone, home-screen apps keep their own storage, separate from Safari tabs.
- Updates show up the next time you open it while online.
- Back up now and then with Journal → Export data.

### Trying changes locally
```sh
python3 -m http.server 8080
```
Then open `http://localhost:8080`, or `http://<laptop-ip>:8080` from your phone on the same Wi-Fi.

## How it plays

There are no menu buttons. You visit places on the island, each with a keeper: **Maple** (a sheep) runs the library, **Dot** (a frog) runs the gym, and **Bram** (a beaver) runs the workbench. Tap a sign, a place or its keeper. Pip walks over, the keeper says something in the dialogue box, and you pick from two choices. When a place is off-screen, its sign sits at the screen edge as a small tab.

| Place | What it does |
|---|---|
| **Library** | An endless feed of ~2-minute cards across 14 categories. Each ends with an opinion question; answering pays +1 energy. Chips filter categories. Skip is free but pays nothing. |
| **Gym** | Log something real: Workout / Walk / Cooked / Read, optional note, this week's strip. +2 energy each. |
| **Workbench** | Everything Pip can make, priced in energy, labelled with the lesson that unlocked it. Shows a "!" when you can afford something. |
| **Journal** (top right) | Every answer you've written, per-category counts, rename the creature, export or reset data. |

Walking: **tap the ground** to walk Pip there, or **press and drag** for a joystick. The camera follows Pip. Tap Pip to chat, or tap anything you built to see which lesson it came from.

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
Add an entry in `js/items.js` (pick a free grass tile from `MAP` in `world.js` that isn't used by a station in `STATIONS`) and a matching model function in `BUILDERS` in `world.js`.

After changing files, bump `VERSION` in `sw.js` so installed copies pick up the update.
