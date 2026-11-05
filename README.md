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

There are no menu buttons. You visit places on the island, each with a keeper. Tap a sign, a place or its keeper: Pip walks over, the keeper talks in the dialogue box, and you pick from the choices. The main places (Library, Gym, Workbench, Dock) pin to the screen edge when off-screen.

| Place | What it does |
|---|---|
| **Library** (Maple) | An endless feed of short cards across 14 categories. Each card opens with a **quick guess** (you're not expected to know it; guessing first helps it stick, and you can skip it), then the reading, then **Got it** (+1 energy). Maple's opinion question is folded away; write your take for +1 more. |
| **Gym** (Dot) | Log something real: Workout / Walk / Cooked / Read, optional note, this week's strip. +2 energy each. |
| **Dock** | Fishing. Cast, tap on the bite, hold to keep the fish in the bar, then answer a question about a card you've read to land it. Questions follow a spaced-repetition schedule. Catching fish raises **mastery** and fills your pond; it doesn't pay energy. |
| **Workbench** (Bram) | Plans grouped by district. Shows what's ready, what needs more mastery, and what you haven't discovered yet. |
| **District keepers** | Fennel (town square), Pepper (market street) and Sage (observatory hill) tell you how their district is growing and open the library filtered to their topics. |
| **Journal** (top right) | Topic mastery dots, fish collection, your takes, settings, export/reset. |

### Districts, mastery and growing items

| District | Where | Topics |
|---|---|---|
| Town square | The cobbled plaza and main road | World news, Travel, History & words |
| Arts corner | West, around the library | Art, Movies & TV, Fashion, Culture |
| Market street | The south path to the beach | Food, Wine, Cheese |
| Observatory hill | The raised ledge at the back | Science, Probability, Robotics, Philosophy |

Each topic has three items:

1. **Signature item.** Reading a card in the topic gives you the plan; remembering a card of that topic at the dock lets you build it. It **grows in three stages** as your mastery rises (the trellis gets leaves, then grapes; the cinema gets a picture, then string lights).
2. **Second item** unlocks at mastery 2.
3. **Third item** unlocks at mastery 3.

Mastery comes from the review schedule: each card earns points as it moves up the boxes, and a topic reaches level 1, 2, 3 at 1, 3, 6 points. Only reviews that are actually due move a card up, so it can't be rushed, and mastery never goes down.

Energy (from reading and real-world logs) is what you spend at the workbench. Fishing pays in mastery, fish and growth instead.

Walking: **tap the ground** to walk Pip there, or **press and drag** for a joystick. The camera follows Pip. Tap Pip to chat, or tap anything you built to see which lesson it came from.

No decay, no streak-shaming. At zero energy Pip just naps.

## Where things live

```
index.html, css/style.css   HUD, sheets, layout
js/app.js                   screens, energy, unlock logic, lesson picker
js/world.js                 the 3D island: map, terrain, props, creature, camera
js/items.js                 districts + build catalogue (cost, unlock rule, tile slot)
js/lessons.js               lesson bank + category list
js/quiz.js                  two recall questions per card, asked when fishing
js/state.js                 localStorage save/load
sw.js, manifest.webmanifest offline + home-screen install
```

### Adding lessons
Append to `LESSONS` in `js/lessons.js`: `{ id, cat, level, title, body: [para, para], question, unlocks }`, and add at least two questions for it in `js/quiz.js` (the first is the quick guess; the dock rotates through them starting with the second). `level: 2` cards are held back until you've done a level-1 card in that category. The picker prefers unseen cards and avoids repeating the last few categories.

### Adding builds
Add an entry in `js/items.js` (pick a free grass tile in the right district from `MAP` in `world.js`, not used by a station, keeper or tree) and a matching model function in `BUILDERS` in `world.js`. Signature items take a `stage` argument (1-3).

After changing files, bump `VERSION` in `sw.js` so installed copies pick up the update.
