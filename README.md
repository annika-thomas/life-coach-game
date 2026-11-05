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

There are no menu buttons. You visit places on the island, each with a keeper. Tap a building or its keeper: Pip walks over, the keeper talks in the dialogue box, and you pick from the choices. There are no permanent signs; a place's name fades in when Pip is standing next to it, and a "!" floats over Bram when something can be built.

| Place | What it does |
|---|---|
| **Library** (Maple) | An endless feed of short cards across 14 categories. Each card opens with a **quick guess** (you're not expected to know it; guessing first helps it stick, and you can skip it), then the reading, then **Got it** (+1 energy). Maple's opinion question is folded away; write your take for +1 more. |
| **Gym** (Dot) | Log something real: Workout / Walk / Cooked / Read, optional note, this week's strip. +2 energy each. |
| **Dock** and **Pond** | Fishing, just for fun. 20 species across the sea and the pond, some only at dawn, dusk or night. Watch the shadows (bigger shadow, bigger fish), wait out the nibbles, tap on the bite, then hold to keep the fish in the bar; each species fights differently. Caught species swim in the pond; the journal tracks sizes and hints where to find the rest. |
| **Town square** (Fennel) | Two puzzles a day on the notice board, built from cards you've read: **Timeline** (drag five events into order) and **Guess of the day** (a number on a slider). Both count as reviews. A perfect score earns a gift. |
| **Market** (Pepper) | Two wine games. **Wine map**: real maps of Europe and the world; name the glowing region or tap the named one (24 regions, each with what it's known for). **Taste test**: set sweetness, acidity, tannin and body for a classic style (18 styles, typical textbook profiles; within one step counts). Regions you've read about come up first. |
| **Home** (the cottage) | Focus time. Pick 10, 25 or 50 minutes, put the phone down, and a flower patch, tree or blossom tree grows in the grove (south-east corner). Nothing withers if you leave; it's on your honour. A full session pays 1, 2 or 3 energy. |
| **Visitors** | One or two travellers turn up each day. They ask about something you've read, or for advice that draws on a card. A right answer earns a gift. These, with the board puzzles, are how you recall what you've read. |
| **Workbench** (Bram) | Plans grouped by district. Shows what's ready, what needs more mastery, and what you haven't discovered yet. |
| **District keepers** | Fennel (town square), Pepper (market street) and Sage (observatory hill) tell you how their district is growing and open the library filtered to their topics. Any keeper might have a little gift for you, at most once a day. |
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

Mastery comes from the review schedule (visitor questions and board puzzles): each card earns points as it moves up the boxes, and a topic reaches level 1, 2, 3 at 1, 3, 6 points. Only reviews that are actually due move a card up, so it can't be rushed, and mastery never goes down.

Energy (from reading and real-world logs) is what you spend at the workbench. Visitors and puzzles pay in mastery and gifts; fishing pays in fish.

Walking: **tap the ground** to walk Pip there, or **press and drag** for a joystick. The camera follows Pip. Tap Pip to chat, or tap anything you built to see which lesson it came from.

No decay, no streak-shaming. At zero energy Pip just naps.

## Where things live

```
index.html, css/style.css   HUD, sheets, layout
js/app.js                   screens, energy, unlock logic, lesson picker
js/world.js                 the 3D island: map, terrain, props, creature, camera
js/items.js                 districts + build catalogue (cost, unlock rule, tile slot)
js/lessons.js               original cards, categories, merges the card bank
js/cards/*.js               the card bank: 20 cards per category + visitor requests
js/quiz.js                  recall questions (original cards; bank cards carry their own)
js/wine-games.js            wine regions (real coordinates) and style profiles
js/wine-maps.js             generated SVG outlines (Natural Earth via world-atlas)
js/state.js                 localStorage save/load
sw.js, manifest.webmanifest offline + home-screen install
```

### Adding cards
Add to the right file in `js/cards/` (one per category): `{ id, level, title, body: [para, para], question, quiz: [{ q, a, w: [..], why }, ...], timeline: { event, year } | null, estimate: { q, answer, unit, min, max } | null }`. The first quiz question is the quick guess before reading. `requests` in the same file are visitor advice questions. `level: 2` cards are held back until you've done a level-1 card in that category. The picker prefers unseen cards and avoids repeating the last few categories.

### Adding builds
Add an entry in `js/items.js` (pick a free grass tile in the right district from `MAP` in `world.js`, not used by a station, keeper or tree) and a matching model function in `BUILDERS` in `world.js`. Signature items take a `stage` argument (1-3).

After changing files, bump `VERSION` in `sw.js` so installed copies pick up the update.
