import { World, PINNED } from './world.js';
import { ITEMS, ITEM_BY_ID, DISTRICTS, SIGNATURE } from './items.js';
import { GIFTS } from './world.js';
import { REQUESTS } from './lessons.js';
import { LESSONS, CATEGORIES } from './lessons.js';
import { load, save, reset, dayKey, rhythm } from './state.js';
import { ICON, leafAmt } from './icons.js';
import { QUIZ } from './quiz.js';
import { hasDemo, mountDemo } from './demos.js';
import { MAPS, project } from './wine-maps.js';
import { REGIONS, CHEESES, STYLES, TRAITS } from './wine-games.js';

let S = load();
const $ = (sel) => document.querySelector(sel);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const commit = () => { save(S); renderHud(); };

const world = new World($('#world'));
if (window.__expose) window.__world = world; // test hook
// ── Mastery ────────────────────────────────────────────────────────────
// A topic's mastery comes from remembering its cards at the dock: each card
// earns (box - 1) points; levels at 1, 3 and 6 points. It never goes down.
const CAT_OF = Object.fromEntries(LESSONS.map((l) => [l.id, l.cat]));
const LEVEL_AT = [1, 3, 6];
S.reviews = S.reviews || {};
S.mastery = S.mastery || {};
S.fish = S.fish || [];
const topicPoints = (cat) => Object.entries(S.reviews).reduce((a, [id, r]) => a + (CAT_OF[id] === cat ? r.box - 1 : 0), 0);
function updateMastery() {
  const ups = [];
  for (const cat of Object.keys(CATEGORIES)) {
    const lvl = LEVEL_AT.filter((n) => topicPoints(cat) >= n).length;
    if (lvl > (S.mastery[cat] || 0)) { ups.push({ cat, from: S.mastery[cat] || 0, to: lvl }); S.mastery[cat] = lvl; }
  }
  return ups;
}
updateMastery();
const mastery = (cat) => S.mastery[cat] || 0;
const stageFor = (it) => (it.signature ? Math.max(1, Math.min(3, mastery(it.req.cat))) : 3);

S.built.forEach((b) => world.placeBuilt(b.id, false, stageFor(ITEM_BY_ID[b.id] || {})));
world.setEnergy(S.energy);

// ── Cast ───────────────────────────────────────────────────────────────
const CAST = {
  pip:   { name: () => S.creatureName, color: '#3fb3a5' },
  maple: { name: () => 'Maple', color: '#8a5a9e' },
  dot:   { name: () => 'Dot', color: '#e5483b' },
  bram:  { name: () => 'Bram', color: '#3f6fb0' },
  fennel: { name: () => 'Fennel', color: '#d9732a' },
  pepper: { name: () => 'Pepper', color: '#7a5638' },
  sage:  { name: () => 'Sage', color: '#5f7a32' },
  note:  { name: () => '', color: '' },
};

// ── Unlock logic ──────────────────────────────────────────────────────
const LOG_KINDS = {
  workout: { label: 'Workout', icon: ICON.dumbbell, color: '#e5483b' },
  walk:    { label: 'Walk',    icon: ICON.shoe,     color: '#3fa7b8' },
  cooked:  { label: 'Cooked',  icon: ICON.pan,      color: '#ef8a3c' },
  read:    { label: 'Read',    icon: ICON.book,     color: '#8a72b8' },
};
const isBuilt = (it) => S.built.some((b) => b.id === it.id);
function progress(it) {
  const r = it.req;
  if (r.type === 'none') return { have: 0, need: 0 };
  if (r.type === 'cat') return { have: mastery(r.cat), need: r.level };
  if (r.type === 'lessons') return { have: S.lessons.length, need: r.n };
  if (r.type === 'log') return { have: S.logs.filter((l) => l.kind === r.kind).length, need: r.n };
  return { have: 0, need: 1 };
}
const isUnlocked = (it) => { const p = progress(it); return p.have >= p.need; };
const affordable = () => ITEMS.filter((i) => isUnlocked(i) && !isBuilt(i) && i.cost <= S.energy);
function reqLabel(it) {
  const r = it.req;
  if (r.type === 'none') return 'Starter plan';
  if (r.type === 'cat') return r.level === 1 ? `Remember a ${CATEGORIES[r.cat].label} card in a review` : `${CATEGORIES[r.cat].label} mastery ${r.level}`;
  if (r.type === 'lessons') return `${r.n} cards, any topic`;
  if (r.type === 'log') return `Log ${LOG_KINDS[r.kind].label.toLowerCase()} ${r.n} times`;
  return '';
}
// You know an item's plan once you've read a card in its topic.
const hasPlan = (it) => it.req.type !== 'cat' || S.lessons.some((l) => l.cat === it.req.cat);
function unlockSource(it) {
  if (it.req.type !== 'cat') return null;
  const first = S.lessons.find((l) => l.cat === it.req.cat);
  return first ? LESSONS.find((l) => l.id === first.id)?.title : null;
}

// ── HUD ────────────────────────────────────────────────────────────────
$('#energy-ico').innerHTML = ICON.leaf;
$('#btn-journal').innerHTML = ICON.journal;
function renderHud() {
  const shown = Math.min(S.energy, 10);
  $('#energy-pips').innerHTML = Array.from({ length: 10 }, (_, i) => `<span class="pip ${i < shown ? 'on' : ''}"></span>`).join('');
  $('#energy-num').textContent = S.energy;
  world.setEnergy(S.energy);
}
function renderClock() {
  const d = new Date();
  $('#clock-day').textContent = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) + (S.daily?.weather ? ` · ${({ sunny: 'Sunny', cloudy: 'Cloudy', rain: 'Rain', snow: 'Snow' })[S.daily.weather]}` : '');
  $('#clock-time').textContent = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const h = d.getHours();
  $('#clock-icon').innerHTML = h < 6 || h >= 20 ? ICON.moon : h < 17 ? ICON.sun : ICON.sunset;
}
renderClock(); setInterval(renderClock, 15000);

// ── Dialogue ───────────────────────────────────────────────────────────
// talk('maple', ['line', 'line'], ['Choice A', 'Choice B']) → Promise<index | null>
// Text types out; tap to finish a line, tap again for the next one.
const dlg = $('#dialog'), dlgText = $('#dlg-text'), dlgName = $('#dlg-name'), choicesEl = $('#choices'), catcher = $('#dlg-catch');
let talking = null;
function talk(who, lines, choices = null) {
  if (talking) talking.finish(null);
  return new Promise((resolve) => {
    const c = typeof who === 'string' ? CAST[who] : who;
    dlgName.textContent = c.name();
    dlgName.style.background = c.color;
    dlgName.hidden = who === 'note';
    dlg.classList.toggle('narration', who === 'note');
    dlg.classList.add('show'); catcher.classList.add('show');
    choicesEl.innerHTML = ''; choicesEl.classList.remove('show');
    let i = 0, timer = null, typing = false;
    const showLine = () => {
      const full = lines[i];
      let n = 0; typing = true;
      dlg.classList.remove('waiting');
      clearInterval(timer);
      timer = setInterval(() => {
        n += 1;
        dlgText.textContent = full.slice(0, n);
        if (n >= full.length) done();
      }, 26);
      function done() {
        clearInterval(timer); typing = false;
        dlgText.textContent = full;
        const last = i === lines.length - 1;
        if (last && choices) showChoices(); else dlg.classList.add('waiting');
      }
      talking.skip = done;
    };
    const showChoices = () => {
      choicesEl.innerHTML = choices.map((t, k) => `<button class="choice" data-k="${k}">${esc(t)}</button>`).join('');
      choicesEl.classList.toggle('two', choices.length === 2);
      choicesEl.classList.add('show');
      choicesEl.querySelectorAll('.choice').forEach((b) => b.onclick = (e) => { e.stopPropagation(); talking.finish(+b.dataset.k); });
    };
    const advance = () => {
      if (typing) return talking.skip();
      if (choicesEl.classList.contains('show')) return; // must pick
      if (i < lines.length - 1) { i += 1; showLine(); } else talking.finish(null);
    };
    talking = {
      advance,
      finish: (val) => {
        clearInterval(timer);
        dlg.classList.remove('show', 'waiting'); catcher.classList.remove('show');
        choicesEl.classList.remove('show');
        talking = null;
        resolve(val);
      },
    };
    showLine();
  });
}
catcher.addEventListener('pointerup', () => talking && talking.advance());
dlg.addEventListener('pointerup', () => talking && talking.advance());

// ── Places on the island ──────────────────────────────────────────────
const places = [...document.querySelectorAll('.place')];
places.forEach((el) => { el.onclick = () => world.visit(el.dataset.place); });
// No permanent signs: a place's name fades in only when Pip is right next to
// it. The workbench "!" floats over Bram's head when something can be built.
function positionPlaces() {
  const busy = sheet.classList.contains('open') || dlg.classList.contains('show') || fishing;
  for (const el of places) {
    const id = el.dataset.place;
    const near = !busy && world.state !== 'walk' && world.stationDistance(id) < 1.6;
    el.classList.toggle('show', near);
    if (!near) continue;
    const p = world.stationScreenPos(id);
    el.style.transform = `translate(${Math.round(p.x)}px, ${Math.round(p.y)}px) translate(-50%, -100%)`;
  }
  const alert = $('#bench-alert');
  const kp = world.keeperScreenPos('workbench', 1.35);
  const on = !busy && kp && kp.visible && affordable().length > 0 && world.stationDistance('workbench') >= 1.6;
  alert.classList.toggle('show', !!on);
  if (on) alert.style.transform = `translate(${Math.round(kp.x)}px, ${Math.round(kp.y)}px) translate(-50%, -100%)`;
}
world.onFrame = positionPlaces;

// What each keeper says when you arrive, then what happens.
const firstVisit = (id) => { S.met = S.met || {}; const first = !S.met[id]; S.met[id] = true; save(S); return first; };
const VISIT = {
  async library() {
    const next = nextLesson();
    const topic = CATEGORIES[next.cat].label.toLowerCase();
    const lines = firstVisit('library')
      ? ['Oh, a reader. I\'m Maple. I look after the shelves here.',
         'Read a card, and I\'ll send a little energy over to ' + S.creatureName + '. Visitors and Fennel\'s puzzles on the town board will test what you\'ve read.']
      : [pick([
          `I just shelved something on ${topic}. Want a look?`,
          'Quiet day. Perfect for reading.',
          `There's a card on ${topic} I think you'll want to argue with.`,
          'Back again? Good. I saved you a seat.',
        ])];
    if (await talk('maple', lines, ['Read something', 'Maybe later']) === 0) { filters = new Set(); setTimeout(() => openLessons(next), 200); }
  },
  async gym() {
    const lines = firstVisit('gym')
      ? ['Hey hey! Name\'s Dot. This is my yard.',
         'Worked out, went for a walk, cooked a real meal, read a real book? It all counts. Tell me and ' + S.creatureName + ' gets 2 energy.']
      : [pick(['What did you get up to today?', 'Moved your body? Tell me everything.', 'Every bit counts. What was it?', 'Ready when you are, champ.'])];
    if (await talk('dot', lines, ['Log something', 'Not yet']) === 0) setTimeout(openLog, 200);
  },
  async dock() {
    const t = timeOfDay();
    const line = { dawn: 'The sea is still and pink. Big fish rise early.', day: 'Waves lap at the posts. Shadows move under the water.', dusk: 'The water turns gold. Something large might be out there.', night: 'The sea is dark and quiet. Strange things swim at night.' }[t];
    if (await talk('note', [line], ['Cast a line', 'Leave']) === 0) setTimeout(() => goFishing('dock'), 200);
  },
  async pond() {
    const n = new Set(S.fish.map((f) => f.species)).size;
    const line = n ? `${n} kind${n > 1 ? 's' : ''} of fish swim here now. Something new might be hiding.` : 'A quiet pond. Little shadows dart under the lily pads.';
    if (await talk('note', [line], ['Cast a line', 'Leave']) === 0) setTimeout(() => goFishing('pond'), 200);
  },
  async workbench() {
    const can = affordable();
    const first = firstVisit('workbench');
    const lines = first
      ? ['Bram. I build things.', 'Reading a card gets you a plan. Remembering it, when a visitor asks or on Fennel\'s board, lets me build it. Energy pays for the wood.']
      : [];
    if (can.length) lines.push(pick([`You've got enough for the ${can[0].name.toLowerCase()}. Want to see the plans?`, 'Energy in the pocket. Let\'s make something.', `I could knock out a ${can[0].name.toLowerCase()} today.`]));
    else lines.push(pick(['Not enough energy for anything yet. Maple\'s library is a good place to start.', 'Running a bit low. Dot\'s yard pays double, you know.', 'Nothing we can afford yet. Have a look anyway?']));
    if (await talk('bram', lines, ['See the plans', 'Later']) === 0) setTimeout(openBuild, 200);
  },
};
// District keepers: a line about how their district is growing, then the
// library filtered to their topics.
const KEEPER_TALK = {
  fennel: {
    intro: ['Fennel, postmaster. Welcome to the square.', 'News, travel and history are my beat. The square grows as you remember those.'],
    idle: ['Fresh off the press.', 'No letters for you. Stories, though.', 'Everyone passes through the square eventually.'],
  },
  pepper: {
    intro: ['Oh! A customer. I\'m Pepper.', 'Food, wine and cheese. Learn them, remember them, and this street fills up with good things.'],
    idle: ['The market smells great today.', 'Taste this. No? Then read this.', 'Busy morning on the street.'],
  },
  sage: {
    intro: ['Ah. Hello. I\'m Sage. I keep the instruments up here.', 'Science, probability, robotics and philosophy. Remember them and the hill fills up.'],
    idle: ['Slow and steady, as they say.', 'I\'ve been watching the sky. And the questions.', 'A good question outlives its answer.'],
  },
};
function districtLine(key) {
  const d = DISTRICTS[key];
  const cats = d.cats.map((c) => ({ c, m: mastery(c), read: S.lessons.some((l) => l.cat === c) }));
  const unread = cats.find((x) => !x.read);
  if (unread) return `Nobody's read about ${CATEGORIES[unread.c].label.toLowerCase()} around here yet.`;
  const low = cats.slice().sort((a, b) => a.m - b.m)[0];
  const label = CATEGORIES[low.c].label;
  if (low.m >= 3) return 'Every topic here is fully grown. Look at this place!';
  if (low.m === 0) return `Remember a ${label.toLowerCase()} card in Today's reviews and Bram can build the ${ITEM_BY_ID[SIGNATURE[low.c]].name.toLowerCase()}.`;
  return `${label} is at level ${low.m}. Keep remembering those cards and something new will turn up.`;
}
for (const [key, d] of Object.entries(DISTRICTS)) {
  if (key === 'arts') continue; // Maple's library covers the arts corner
  VISIT[key] = async () => {
    const t = KEEPER_TALK[d.keeper];
    const lines = firstVisit(key) ? [...t.intro, districtLine(key)] : [pick(t.idle), districtLine(key)];
    const topics = d.cats.map((c) => CATEGORIES[c].label.toLowerCase());
    const choice = await talk(d.keeper, lines, [`Read about ${topics.slice(0, -1).join(', ')} or ${topics.at(-1)}`, 'Later']);
    if (choice === 0) { filters = new Set(d.cats); setTimeout(() => openLessons(), 200); }
  };
}
// Fennel's notice board: the two daily puzzles, then reading.
VISIT.square = async () => {
  const t = KEEPER_TALK.fennel;
  const lines = firstVisit('square') ? [...t.intro, 'I also pin up two puzzles every day. Have a go.'] : [pick(t.idle)];
  const tl = S.daily.timeline, gs = S.daily.guess;
  const choice = await talk('fennel', lines, [`Today's timeline${tl ? ` (${tl.score}/5)` : ''}`, `Guess of the day${gs ? ' (done)' : ''}`, 'Read about news, travel or history', 'Later']);
  if (choice === 0) setTimeout(openTimeline, 200);
  if (choice === 1) setTimeout(openGuess, 200);
  if (choice === 2) { filters = new Set(DISTRICTS.square.cats); setTimeout(() => openLessons(), 200); }
};
world.on('station', (id, mode) => (mode === 'chat' ? keeperChat(id) : VISIT[id]()));

// Tapping Pip or something you built.
function pipLine() {
  if (S.energy <= 0) return pick(['Zzz...', 'Mm... five more minutes...', '(Fast asleep.)']);
  const last = S.lessons[S.lessons.length - 1];
  const lesson = last && LESSONS.find((l) => l.id === last.id);
  const can = affordable();
  return pick([
    'Nice breeze today.',
    `I'm holding ${S.energy} energy. Bram's probably bored.`,
    can.length ? `Bram says we could build a ${can[0].name.toLowerCase()}.` : 'Saving up for something good.',
    lesson ? `Still thinking about "${lesson.title}".` : 'Maple keeps waving at us from the library.',
    'I like it here.',
  ]);
}
world.on('creatureTap', async () => {
  if (S.daily?.todayDone) { talk('pip', [pipLine()]); return; }
  const c = await talk('pip', ['Want to do today\'s learning? A few cards and a quick review.'], ['Let\'s go', 'Later']);
  if (c === 0) setTimeout(() => startToday(), 200);
});
world.on('itemTap', (id) => {
  const it = ITEM_BY_ID[id];
  const src = unlockSource(it);
  const r = it.req;
  const why = src ? `Built after reading "${src}".`
    : r.type === 'log' ? `Built from your ${LOG_KINDS[r.kind].label.toLowerCase()} logs.`
    : r.type === 'lessons' ? `Built after ${r.n} cards.`
    : 'One of the first things on the island.';
  talk('note', [`${it.name}. ${why}`]);
});

// ── Sheets ─────────────────────────────────────────────────────────────
const sheet = $('#sheet');
function openSheet(title, html, cls = '') {
  $('#sheet-title').textContent = title;
  $('#sheet-body').innerHTML = html;
  sheet.className = `sheet open ${cls}`;
  $('#scrim').classList.add('show');
  $('#sheet-body').scrollTop = 0;
}
let onClose = null;
function closeSheet() {
  sheet.classList.remove('open');
  $('#scrim').classList.remove('show');
  const cb = onClose; onClose = null;
  if (cb) setTimeout(cb, 250);
}
$('#sheet-close').onclick = closeSheet;
$('#scrim').onclick = closeSheet;

function floatReward(n, fromEl) {
  const r = (fromEl || $('#energy')).getBoundingClientRect();
  const f = document.createElement('div');
  f.className = 'reward';
  f.innerHTML = `${ICON.leaf}+${n}`;
  f.style.left = `${r.left + r.width / 2}px`;
  f.style.top = `${r.top}px`;
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1400);
  $('#energy').classList.remove('bump'); void $('#energy').offsetWidth; $('#energy').classList.add('bump');
}
function toast(t) {
  const el = $('#toast');
  el.textContent = t;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3200);
}
let knownPlans = new Set(ITEMS.filter((i) => hasPlan(i) || isUnlocked(i)).map((i) => i.id));
function newlyUnlocked() {
  const now = ITEMS.filter((i) => hasPlan(i) && (i.req.type !== 'cat' || i.req.level === 1 || isUnlocked(i)) && (i.req.type === 'cat' || isUnlocked(i))).map((i) => i.id).filter((id) => !knownPlans.has(id));
  now.forEach((id) => knownPlans.add(id));
  if (now.length) {
    const it = ITEM_BY_ID[now[0]];
    toast(it.signature && !isUnlocked(it) ? `New plan: ${it.name}. Recall it to build.` : `New plan at the workbench: ${it.name}`);
  }
}

// ── Library: the endless feed ─────────────────────────────────────────
let filters = new Set();
function nextLesson(excludeIds = []) {
  const seen = new Set(S.lessons.map((l) => l.id));
  const seenCats = new Set(S.lessons.map((l) => l.cat));
  const recentCats = S.lessons.slice(-3).map((l) => l.cat);
  const pool = LESSONS.filter((l) => (!filters.size || filters.has(l.cat)) && !excludeIds.includes(l.id));
  const score = (l) => {
    let s = Math.random();
    if (!seen.has(l.id)) s += 10;
    if (S.skipped.includes(l.id)) s -= 3;
    if (!recentCats.includes(l.cat)) s += 2;       // keep it varied
    if (l.level > 1 && seenCats.has(l.cat)) s += 1.5; // build on earlier cards
    if (l.level > 1 && !seenCats.has(l.cat)) s -= 4;  // foundations first
    return s;
  };
  pool.sort((a, b) => score(b) - score(a));
  return pool[0] || LESSONS[Math.floor(Math.random() * LESSONS.length)];
}
function chipsHtml() {
  return `<div class="chips">${Object.entries(CATEGORIES).map(([k, c]) =>
    `<button class="chip ${filters.has(k) ? 'on' : ''}" data-cat="${k}" style="--c:${c.color}"><i></i>${c.label}</button>`).join('')}</div>`;
}
const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// A card: a quick guess (you're not expected to know it; guessing before
// reading helps the answer stick), then the reading, then "Got it".
// Maple's opinion question is optional and folded away. The real quiz
// happens later, at the dock.
function cardHtml(l) {
  const c = CATEGORIES[l.cat];
  const prior = S.lessons.some((x) => x.id === l.id);
  const unlock = l.unlocks && ITEM_BY_ID[l.unlocks];
  return `<article class="card" data-id="${l.id}">
    <div class="card-tag" style="--c:${c.color}">${c.label}${prior ? ' · reread' : ''}</div>
    <h3>${esc(l.title)}</h3>
    <div class="guess">
      <span class="guess-label">Quick guess</span>
      <p class="guess-q">${esc(QUIZ[l.id][0].q)}</p>
      <div class="opts">${shuffle([QUIZ[l.id][0].a, ...QUIZ[l.id][0].w]).map((o) => `<button class="opt" data-right="${o === QUIZ[l.id][0].a ? 1 : 0}">${esc(o)}</button>`).join('')}</div>
      <p class="guess-result"></p>
      <button class="guess-skip">Skip the guess</button>
    </div>
    <div class="reading">
    ${l.body.map((p) => `<p>${esc(p)}</p>`).join('')}
    ${hasDemo(l.id) ? `<div class="demo" data-demo="${l.id}"></div>` : ''}
    ${unlock ? `<div class="card-unlock">Counts toward the ${esc(unlock.name.toLowerCase())}</div>` : ''}
    <details class="take">
      <summary>Maple has a question for you <span>(optional, +1)</span></summary>
      <p class="take-q">${esc(l.question)}</p>
      <textarea rows="2" placeholder="Your take"></textarea>
    </details>
    <div class="card-actions">
      <button class="btn ghost skip">Skip</button>
      <button class="btn primary answer">Got it <span class="amt">${ICON.leaf}<span class="n">+1</span></span></button>
    </div>
    </div>
  </article>`;
}
function openLessons(first) {
  openSheet('Library', `${chipsHtml()}<div id="feed"></div>`, 'lessons');
  const feed = $('#feed');
  const shown = [];
  let done = 0;
  onClose = null;
  const append = (l = nextLesson(shown)) => {
    shown.push(l.id);
    feed.insertAdjacentHTML('beforeend', cardHtml(l));
    wire(feed.lastElementChild, l);
  };
  const wire = (card, l) => {
    const ta = card.querySelector('textarea');
    const btn = card.querySelector('.answer');
    const reveal = (text) => {
      card.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (x.dataset.right === '1') x.classList.add('right'); });
      card.querySelector('.guess-result').textContent = text;
      card.classList.add('guessed');
      const demo = card.querySelector('.demo'); if (demo) mountDemo(demo, demo.dataset.demo);
    };
    card.querySelectorAll('.opt').forEach((o) => o.onclick = () => {
      if (card.classList.contains('guessed')) return;
      const right = o.dataset.right === '1';
      if (!right) o.classList.add('wrong');
      reveal(right ? 'Correct.' : 'Not quite.');
    });
    card.querySelector('.guess-skip').onclick = () => reveal('');
    ta.addEventListener('input', () => { btn.querySelector('.n').textContent = ta.value.trim().length >= 3 ? '+2' : '+1'; });
    btn.onclick = () => {
      const take = ta.value.trim();
      const gain = take.length >= 3 ? 2 : 1;
      S.lessons.push({ id: l.id, cat: l.cat, answer: take, ts: Date.now() });
      S.skipped = S.skipped.filter((x) => x !== l.id);
      scheduleNew(l.id);
      S.energy += gain; done += 1;
      commit();
      floatReward(gain, btn);
      card.classList.add('done');
      card.querySelector('.card-actions').innerHTML = `<div class="answered">${ICON.check} Got it. It will come back in a review.</div>`;
      ta.readOnly = true;
      newlyUnlocked();
      append();
      setTimeout(() => feed.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    };
    card.querySelector('.skip').onclick = () => {
      if (!S.skipped.includes(l.id)) S.skipped.push(l.id);
      save(S);
      card.remove();
      append();
    };
  };
  append(first && (!filters.size || filters.has(first.cat)) ? first : undefined);
  sheet.querySelectorAll('.chip').forEach((ch) => ch.onclick = () => {
    const k = ch.dataset.cat;
    filters.has(k) ? filters.delete(k) : filters.add(k);
    ch.classList.toggle('on');
    const open = feed.querySelector('.card:not(.done)');
    if (open) open.remove();
    append();
  });
}

// ── Spaced review (drives the fishing questions) ──────────────────────
// Leitner boxes: right answers push a card further out, wrong ones reset it.
const DAY = 864e5;
const BOX_DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 21 };
for (const l of S.lessons) if (!S.reviews[l.id]) S.reviews[l.id] = { box: 1, due: Date.now(), n: 0, last: 0 };
function scheduleNew(id) {
  if (!S.reviews[id]) S.reviews[id] = { box: 1, due: Date.now() + BOX_DAYS[1] * DAY, n: 0, last: Date.now() };
}
function nextReview() {
  const ids = Object.keys(S.reviews).filter((id) => QUIZ[id]);
  if (!ids.length) return null;
  const now = Date.now();
  const due = ids.filter((id) => S.reviews[id].due <= now).sort((a, b) => S.reviews[a].due - S.reviews[b].due);
  const id = due[0] || ids.sort((a, b) => S.reviews[a].last - S.reviews[b].last)[0];
  const r = S.reviews[id];
  const qs = QUIZ[id];
  return { id, box: r.box, q: qs[(r.n + 1) % qs.length], due: !!due.length };
}
// Only a review that was due moves a card up, so mastery can't be rushed by
// fishing the same card over and over. A miss always brings it back soon.
function grade(id, right) {
  const r = S.reviews[id], now = Date.now();
  if (right && r.due <= now) { r.box = Math.min(5, r.box + 1); r.due = now + BOX_DAYS[r.box] * DAY; }
  else if (!right) { r.box = 1; r.due = now + DAY / 144; }
  r.n += 1; r.last = now;
}
// After a review: grow signature items and announce new plans.
function masteryNews() {
  const lines = [];
  for (const up of updateMastery()) {
    const label = CATEGORIES[up.cat].label;
    const sig = ITEM_BY_ID[SIGNATURE[up.cat]];
    if (isBuilt(sig)) world.setStage(sig.id, stageFor(sig));
    const unlocked = ITEMS.filter((i) => i.req.type === 'cat' && i.req.cat === up.cat && i.req.level > up.from && i.req.level <= up.to);
    if (up.to === 1) lines.push(`${label} mastery 1! The ${sig.name.toLowerCase()} can be built now.`);
    else lines.push(`${label} mastery ${up.to}!${isBuilt(sig) ? ` The ${sig.name.toLowerCase()} grew.` : ''}${unlocked.length ? ` New plan: ${unlocked.map((i) => i.name.toLowerCase()).join(', ')}.` : ''}`);
  }
  return lines;
}

// ── Fishing ────────────────────────────────────────────────────────────
// Just fishing: different fish in the sea and the pond, at different times
// of day. Watch the shadows (bigger shadow, bigger fish), wait out the
// nibbles, tap on the bite, then keep the fish in the bar. Each species
// fights differently.
const FISH = [
  // sea (the dock)
  { id: 'sardine',  name: 'Sardine',        where: 'sea',  time: 'any',   tier: 0, color: '#a9c3d6', size: 0.7, cm: [12, 20],   fight: 'darter' },
  { id: 'mackerel', name: 'Mackerel',       where: 'sea',  time: 'any',   tier: 0, color: '#4f8fa8', size: 0.85, cm: [25, 40],  fight: 'steady' },
  { id: 'flounder', name: 'Flounder',       where: 'sea',  time: 'day',   tier: 0, color: '#b9a27a', size: 0.9, cm: [25, 45],   fight: 'sinker' },
  { id: 'bass',     name: 'Sea Bass',       where: 'sea',  time: 'any',   tier: 1, color: '#6d7f8f', size: 1.05, cm: [40, 70], fight: 'steady' },
  { id: 'snapper',  name: 'Red Snapper',    where: 'sea',  time: 'day',   tier: 1, color: '#e0604a', size: 1.0, cm: [35, 60],   fight: 'darter' },
  { id: 'puffer',   name: 'Pufferfish',     where: 'sea',  time: 'any',   tier: 1, color: '#e8c35a', size: 0.8, cm: [15, 30],   fight: 'floater' },
  { id: 'squid',    name: 'Squid',          where: 'sea',  time: 'night', tier: 1, color: '#f0d6e0', size: 0.9, cm: [20, 45],   fight: 'darter' },
  { id: 'octopus',  name: 'Octopus',        where: 'sea',  time: 'night', tier: 2, color: '#d9734a', size: 1.1, cm: [40, 90],   fight: 'sinker' },
  { id: 'tuna',     name: 'Bluefin Tuna',   where: 'sea',  time: 'dawn',  tier: 2, color: '#2f5f9e', size: 1.6, cm: [120, 250], fight: 'wild' },
  { id: 'moonfish', name: 'Moonfish',       where: 'sea',  time: 'night', tier: 2, color: '#c9d3ff', size: 1.4, cm: [80, 180],  fight: 'floater' },
  { id: 'swordfish',name: 'Swordfish',      where: 'sea',  time: 'dusk',  tier: 2, color: '#5a6f8f', size: 1.6, cm: [150, 300], fight: 'wild' },
  // pond
  { id: 'minnow',   name: 'Minnow',         where: 'pond', time: 'any',   tier: 0, color: '#9fb7c9', size: 0.6, cm: [4, 10],    fight: 'darter' },
  { id: 'bluegill', name: 'Bluegill',       where: 'pond', time: 'day',   tier: 0, color: '#5b8fd6', size: 0.75, cm: [12, 22],  fight: 'steady' },
  { id: 'perch',    name: 'Perch',          where: 'pond', time: 'any',   tier: 0, color: '#d8b24a', size: 0.8, cm: [15, 30],   fight: 'steady' },
  { id: 'tadpole',  name: 'Tadpole',        where: 'pond', time: 'day',   tier: 0, color: '#5a6a4a', size: 0.5, cm: [2, 5],     fight: 'floater' },
  { id: 'catfish',  name: 'Catfish',        where: 'pond', time: 'night', tier: 1, color: '#7a6a5a', size: 1.1, cm: [40, 90],   fight: 'sinker' },
  { id: 'trout',    name: 'Rainbow Trout',  where: 'pond', time: 'dawn',  tier: 1, color: '#e88fb0', size: 0.95, cm: [30, 60],  fight: 'darter' },
  { id: 'carp',     name: 'Golden Carp',    where: 'pond', time: 'any',   tier: 2, color: '#f2c94c', size: 1.1, cm: [40, 80],   fight: 'steady' },
  { id: 'koi',      name: 'Koi',            where: 'pond', time: 'dusk',  tier: 2, color: '#f08a3c', size: 1.1, cm: [40, 75],   fight: 'floater' },
  { id: 'axolotl',  name: 'Axolotl',        where: 'pond', time: 'night', tier: 2, color: '#f6b8c8', size: 0.8, cm: [15, 25],   fight: 'wild' },
];
const TIER_W = [10, 4, 1.2]; // relative chances: common, uncommon, rare
const TIME_LABEL = { day: 'in the daytime', night: 'at night', dawn: 'early in the morning', dusk: 'around sunset', any: 'any time' };
function timeOfDay() {
  const h = new Date().getHours();
  return h >= 5 && h < 9 ? 'dawn' : h >= 9 && h < 17 ? 'day' : h >= 17 && h < 21 ? 'dusk' : 'night';
}
const fitsTime = (f, t) => f.time === 'any' || f.time === t || (f.time === 'day' && t !== 'night');
function rollFish(where) {
  const t = timeOfDay();
  const pool = FISH.filter((f) => f.where === where && fitsTime(f, t));
  const total = pool.reduce((a, f) => a + TIER_W[f.tier], 0);
  let r = Math.random() * total;
  for (const f of pool) { r -= TIER_W[f.tier]; if (r <= 0) return f; }
  return pool[0];
}
const fishSvg = (color, known = true) => `<svg class="fishsvg" viewBox="0 0 64 36"><path d="M8 18c8-12 26-14 38-6l10-8v28l-10-8C34 32 16 30 8 18z" fill="${known ? color : '#cfc6b0'}" stroke="#4a3b33" stroke-width="3" stroke-linejoin="round"/>${known ? '<circle cx="18" cy="16" r="2.6" fill="#2a2320"/>' : ''}</svg>`;
const pondColors = () => [...new Set(S.fish.map((f) => f.species))].map((id) => FISH.find((f) => f.id === id)?.color).filter(Boolean);
world.setPondFish(pondColors());

const fishUI = $('#fish'), hint = $('#fish-hint'), reelEl = $('#reel'), zoneEl = $('#zone'), fishyEl = $('#fishy'), meterEl = $('#meter');
let fishing = false;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
// Taps during the wait: tapping on a nibble scares the fish off.
function watchBobber(fish) {
  return new Promise((resolve) => {
    let phase = 'wait', timers = [];
    const done = (v) => { timers.forEach(clearTimeout); fishUI.onpointerdown = null; resolve(v); };
    fishUI.onpointerdown = () => done(phase === 'bite' ? 'hooked' : 'early');
    let t = 1400 + Math.random() * 2600;
    timers.push(setTimeout(() => { world.shadowChase(0); hint.textContent = 'Something is coming...'; }, t * 0.5));
    const nibbles = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nibbles; i++) {
      timers.push(setTimeout(() => { phase = 'nibble'; world.fishBite(1); hint.textContent = 'Nibble...'; }, t));
      t += 700 + Math.random() * 600;
      timers.push(setTimeout(() => { phase = 'wait'; world.fishBite(0); }, t));
      t += 500 + Math.random() * 900;
    }
    timers.push(setTimeout(() => { phase = 'bite'; world.fishBite(2); hint.textContent = 'Tap!'; hint.classList.add('bite'); }, t));
    timers.push(setTimeout(() => done('slow'), t + 1300 - fish.tier * 150));
  });
}
// Hold to raise the green bar; keep the fish inside it until the meter fills.
function reel(fish) {
  return new Promise((resolve) => {
    const zoneSize = [0.34, 0.28, 0.22][fish.tier];
    const speed = [0.55, 0.85, 1.15][fish.tier];
    reelEl.classList.add('show');
    zoneEl.style.height = `${zoneSize * 100}%`;
    let zone = 0.1, vel = 0, pos = 0.5, target = 0.5, next = 0, progress = 0.3, holding = false, last = performance.now(), t0 = last;
    fishUI.onpointerdown = () => { holding = true; };
    fishUI.onpointerup = fishUI.onpointercancel = () => { holding = false; };
    const step = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const el = (now - t0) / 1000;
      vel += (holding ? 2.6 : -2.2) * dt;
      vel = Math.max(-1.2, Math.min(1.2, vel));
      zone += vel * dt;
      if (zone < 0) { zone = 0; vel = Math.max(0, vel) * -0.3; }
      if (zone > 1 - zoneSize) { zone = 1 - zoneSize; vel = 0; }
      next -= dt;
      let sp = speed;
      if (next <= 0) {
        const r = Math.random();
        if (fish.fight === 'sinker') target = r * 0.55;
        else if (fish.fight === 'floater') target = 0.45 + r * 0.55;
        else target = r;
        next = fish.fight === 'darter' ? 0.35 + Math.random() * 0.5 : 0.7 + Math.random() * 1.0;
      }
      if (fish.fight === 'darter') sp *= 1.6;
      if (fish.fight === 'wild') { target = 0.5 + Math.sin(el * 2.3) * 0.35 + Math.sin(el * 5.1) * 0.12; sp *= 1.3; }
      pos += Math.sign(target - pos) * Math.min(Math.abs(target - pos), sp * dt);
      pos = Math.max(0, Math.min(1, pos));
      const inside = pos >= zone && pos <= zone + zoneSize;
      progress += (inside ? 0.3 : -0.2) * dt;
      zoneEl.style.bottom = `${zone * 100}%`;
      zoneEl.classList.toggle('on', inside);
      fishyEl.style.bottom = `calc(${pos * 100}% - 12px)`;
      fishyEl.style.background = fish.color;
      meterEl.style.height = `${Math.max(0, Math.min(1, progress)) * 100}%`;
      if (progress >= 1 || progress <= 0) {
        fishUI.onpointerdown = fishUI.onpointerup = fishUI.onpointercancel = null;
        reelEl.classList.remove('show');
        return resolve(progress >= 1);
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
async function goFishing(spot) {
  if (fishing) return;
  fishing = true;
  const where = spot === 'pond' ? 'pond' : 'sea';
  const fish = rollFish(where);
  // a few shadows; the first one (the one that bites) matches the fish's size
  const others = Array.from({ length: Math.floor(Math.random() * 3) }, () => 0.6 + Math.random() * 0.8);
  world.spawnShadows(spot, [fish.size, ...others]);
  fishUI.classList.add('show');
  world.fishStart(spot);
  hint.textContent = 'Wait for it...';
  const result = await watchBobber(fish);
  hint.classList.remove('bite');
  world.fishBite(0);
  let landed = false;
  if (result === 'hooked') {
    hint.textContent = 'Hold to raise the bar. Keep the fish inside it.';
    landed = await reel(fish);
  }
  hint.textContent = '';
  fishUI.classList.remove('show');
  if (!landed) {
    world.fishEnd(null);
    fishing = false;
    const msg = result === 'early' ? 'Too early! You pulled before it bit.' : result === 'slow' ? 'Too slow. It took the bait and left.' : 'It got away!';
    if (await talk('note', [msg], ['Cast again', 'Done']) === 0) goFishing(spot);
    return;
  }
  const cm = Math.round(fish.cm[0] + Math.random() * (fish.cm[1] - fish.cm[0]));
  const first = !S.fish.some((f) => f.species === fish.id);
  const best = Math.max(0, ...S.fish.filter((f) => f.species === fish.id).map((f) => f.cm || 0));
  S.fish.push({ species: fish.id, cm, ts: Date.now() });
  save(S);
  world.fishEnd(fish.color, fish.size);
  world.setPondFish(pondColors());
  fishing = false;
  const lines = [`You caught a ${fish.name}! ${cm} cm.${first ? ' New to your collection.' : cm > best ? ' Your biggest yet.' : ''}`];
  if (first && fish.tier === 2) lines.push('That\'s a rare one.');
  // now and then something else is tangled in the line
  if (Math.random() < 0.06) { const g = grantGift('the sea'); if (g) lines.push(`Something else was caught on the line: a ${g.toLowerCase()}! It's on the island now.`); }
  if (await talk('note', lines, ['Cast again', 'Done']) === 0) goFishing(spot);
}

// ── Gifts ──────────────────────────────────────────────────────────────
// Little decorations from visitors, keepers, puzzles and the sea. Each one
// lands somewhere free on the island.
S.gifts = S.gifts || [];
S.gifts.forEach((g) => world.placeGift(g.id, g.gift, g.spot));
function grantGift(from) {
  const used = new Set(S.gifts.map((g) => g.spot.join(',')));
  const spot = world.giftSpots().find((p) => !used.has(p.join(',')));
  if (!spot) return null;
  const owned = new Set(S.gifts.map((g) => g.gift));
  const pool = Object.keys(GIFTS).filter((k) => !owned.has(k));
  const gift = pick(pool.length ? pool : Object.keys(GIFTS));
  const id = `g${Date.now()}${Math.floor(Math.random() * 1000)}`;
  S.gifts.push({ id, gift, spot, from, ts: Date.now() });
  save(S);
  world.placeGift(id, gift, spot, true);
  world.focusOn(spot[0] + 0.5, spot[1] + 0.5);
  return GIFTS[gift].name;
}
world.on('giftTap', (id) => {
  const g = S.gifts.find((x) => x.id === id);
  if (g) talk('note', [`${GIFTS[g.gift].name}. A gift from ${g.from}.`]);
});

// ── Each day ───────────────────────────────────────────────────────────
// A fresh day brings visitors, two puzzles on the town board, and a chance
// of a surprise from each keeper.
function seeded(str) {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
const VISITOR_CAST = [
  { kind: 'rabbit', name: 'Clover', color: '#e27fb0' }, { kind: 'cat', name: 'Juniper', color: '#4a9b6e' },
  { kind: 'bear', name: 'Basil', color: '#c99a2a' }, { kind: 'pig', name: 'Rosie', color: '#3f7fc4' },
  { kind: 'mouse', name: 'Wren', color: '#e5483b' }, { kind: 'duck', name: 'Puddle', color: '#3fa7b8' },
  { kind: 'deer', name: 'Hazel', color: '#8a72b8' },
];
const VISITOR_SPOTS = [[6.5, 11.5], [14.5, 11.5], [10.5, 16.5]];
function planDay() {
  const r = seeded(today());
  const n = S.lessons.length ? (r() < 0.55 ? 2 : 1) : 1;
  const cast = VISITOR_CAST.slice().sort(() => r() - 0.5).slice(0, n);
  const spots = VISITOR_SPOTS.slice().sort(() => r() - 0.5);
  return cast.map((c, i) => ({ id: `v${i}`, kind: c.kind, name: c.name, color: c.color, spot: spots[i], type: 'hello', done: false }));
}
const today = () => dayKey(Date.now());
function ensureDay() {
  if (S.daily?.date === today()) return;
  S.daily = { date: today(), visitors: planDay(), timeline: null, guess: null, keeperGifts: {} };
  save(S);
}
ensureDay();
world.setVisitors(S.daily.visitors.filter((v) => !v.done));
setInterval(() => { if (S.daily.date !== today() && !talking && !sheet.classList.contains('open')) { ensureDay(); world.setVisitors(S.daily.visitors.filter((v) => !v.done)); applyAtmosphere(); spawnToday(); } }, 60000);

// What a visitor asks: advice drawing on a card you've read, a review
// question that's due, or (before you've read anything) just hello.
function visitorAsk(v) {
  const read = new Set(S.lessons.map((l) => l.id));
  if (v.type === 'request') {
    const reqs = REQUESTS.filter((q) => read.has(q.card));
    if (reqs.length) { const q = reqs[Math.floor(seeded(today() + v.id)() * reqs.length)]; return { card: q.card, intro: q.ask, q: q.q, a: q.a, w: q.w, why: q.why }; }
  }
  const rev = nextReview();
  if (!rev) return null;
  return { card: rev.id, intro: pick(['Oh, hello! Quick question, if you don\'t mind.', 'Excuse me! You look like someone who reads.', 'I\'ve been arguing with myself about something all morning.', 'Hi! Settle something for me?']), ...rev.q };
}
world.on('visitor', async (id) => {
  const v = S.daily.visitors.find((x) => x.id === id);
  if (!v || v.done) return;
  const who = { name: () => v.name, color: v.color };
  const ask = v.type === 'hello' ? null : visitorAsk(v);
  if (!ask) {
    await talk(who, [pick([`Hi! I'm ${v.name}, just passing through.`, `${v.name}, on my way somewhere sunny.`, `Oh, hello! I'm ${v.name}. What a pretty island.`]), 'Here, a little something for it.']);
    const g = grantGift(v.name);
    if (g) await talk('note', [`${v.name} gave you a ${g.toLowerCase()}. It's on the island now.`]);
  } else {
    const opts = shuffle([ask.a, ...ask.w]);
    const k = await talk(who, [ask.intro, ask.q], opts);
    const right = k !== null && opts[k] === ask.a;
    if (S.reviews[ask.card]) grade(ask.card, right);
    const news = masteryNews();
    if (right) {
      await talk(who, [pick(['That\'s it! Thank you.', 'Perfect, that\'s exactly what I needed.', 'Oh, of course! Thanks.']), ask.why, 'Here, take this for your island.']);
      const g = grantGift(v.name);
      const extra = [...(g ? [`${v.name} gave you a ${g.toLowerCase()}. It's on the island now.`] : []), ...news];
      if (extra.length) await talk('note', extra);
    } else {
      const src = LESSONS.find((l) => l.id === ask.card);
      await talk(who, [`Hmm, I read somewhere it's "${ask.a}". ${ask.why}`, `It was in "${src.title}", I think. Thanks for chatting anyway!`]);
      commit();
    }
  }
  v.done = true;
  commit();
  world.removeVisitor(id);
});

// Keepers sometimes have a little something for you (once a day each).
const KEEPER_OF = { library: 'maple', gym: 'dot', workbench: 'bram', square: 'fennel', market: 'pepper', observatory: 'sage' };
async function maybeKeeperGift(id) {
  const who = KEEPER_OF[id];
  if (!who || S.daily.keeperGifts[id]) return;
  S.daily.keeperGifts[id] = true; save(S);
  if (Math.random() > 0.22) return;
  const g = grantGift(CAST[who].name());
  if (g) await talk(who, [pick(['Oh! Before I forget, this is for you.', 'I made you something. Well, found it. Same thing.', 'Here, I think this would look nice on your island.']), `(${CAST[who].name()} gave you a ${g.toLowerCase()}.)`]);
}

// ── Town board puzzles ─────────────────────────────────────────────────
// Timeline: put five events from your cards in order. Guess of the day: a
// number from a card, on a slider. Both count as reviews of those cards.
function dailyTimeline() {
  const r = seeded(today() + 'tl');
  const read = new Set(S.lessons.map((l) => l.id));
  const all = LESSONS.filter((l) => l.timeline);
  const pickFrom = (arr, n, taken) => arr.slice().sort(() => r() - 0.5).filter((l) => { if (taken.has(l.timeline.year)) return false; taken.add(l.timeline.year); return true; }).slice(0, n);
  const years = new Set();
  const mine = pickFrom(all.filter((l) => read.has(l.id)), 5, years);
  const rest = mine.length < 5 ? pickFrom(all.filter((l) => !read.has(l.id)), 5 - mine.length, years) : [];
  return [...mine, ...rest].sort(() => r() - 0.5);
}
const yearLabel = (y) => (y < 0 ? `${-y} BC` : `${y}`);
function openTimeline() {
  const events = dailyTimeline();
  const done = S.daily.timeline;
  openSheet('Timeline', `
    <p class="lead">${done ? `You got ${done.score} of 5 today. A new one tomorrow.` : 'Earliest at the top.'}</p>
    <ol class="tl">${(done ? done.order.map((id) => events.find((e) => e.id === id)).filter(Boolean) : events).map((l) => `<li class="tl-row" data-id="${l.id}"><span class="grip"><i></i><i></i><i></i></span><span class="tl-text">${esc(l.timeline.event)}</span><b class="tl-year"></b></li>`).join('')}</ol>
    ${done ? '' : '<button id="tl-go" class="btn primary wide">Check my order</button>'}
  `, 'puzzle');
  const list = sheet.querySelector('.tl');
  const reveal = () => {
    const rows = [...list.children];
    const sorted = rows.map((r) => events.find((e) => e.id === r.dataset.id)).slice().sort((a, b) => a.timeline.year - b.timeline.year);
    let score = 0;
    rows.forEach((row, i) => {
      const ev = events.find((e) => e.id === row.dataset.id);
      const ok = sorted[i].id === ev.id;
      score += ok;
      row.classList.add(ok ? 'ok' : 'bad');
      row.querySelector('.tl-year').textContent = yearLabel(ev.timeline.year);
    });
    return score;
  };
  if (done) { reveal(); return; }
  // drag to reorder
  let drag = null;
  list.addEventListener('pointerdown', (e) => { const row = e.target.closest('.tl-row'); if (!row) return; drag = row; row.classList.add('dragging'); row.setPointerCapture(e.pointerId); });
  list.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const over = [...list.children].find((r) => { const b = r.getBoundingClientRect(); return r !== drag && e.clientY > b.top && e.clientY < b.bottom; });
    if (!over) return;
    const kids = [...list.children];
    if (kids.indexOf(drag) < kids.indexOf(over)) over.after(drag); else over.before(drag);
  });
  const drop = () => { if (drag) drag.classList.remove('dragging'); drag = null; };
  list.addEventListener('pointerup', drop); list.addEventListener('pointercancel', drop);
  $('#tl-go').onclick = () => {
    const score = reveal();
    const order = [...list.children].map((r) => r.dataset.id);
    S.daily.timeline = { score, order };
    // each event placed right counts as a good review of its card
    order.forEach((id, i) => { if (S.reviews[id]) grade(id, list.children[i].classList.contains('ok')); });
    const news = masteryNews();
    commit();
    $('#tl-go').remove();
    sheet.querySelector('.lead').textContent = score === 5 ? 'Perfect! Every one in place.' : `${score} of 5 in the right place. Years are shown now.`;
    onClose = async () => {
      const lines = [score === 5 ? 'All five! I\'m pinning that on the board.' : score >= 3 ? 'Not bad at all. History is slippery.' : 'Tricky one today. Tomorrow\'s will be kinder. Maybe.'];
      const g = score === 5 ? grantGift('Fennel') : null;
      if (g) lines.push(`(Fennel gave you a ${g.toLowerCase()} for a perfect timeline.)`);
      await talk('fennel', [...lines, ...news]);
    };
  };
}
function dailyGuess() {
  const r = seeded(today() + 'g');
  const read = new Set(S.lessons.map((l) => l.id));
  const all = LESSONS.filter((l) => l.estimate);
  const mine = all.filter((l) => read.has(l.id));
  const pool = mine.length ? mine : all;
  return pool[Math.floor(r() * pool.length)];
}
function openGuess() {
  const card = dailyGuess();
  const e = card.estimate;
  const done = S.daily.guess;
  const span = e.max - e.min;
  const step = span <= 20 ? (Number.isInteger(e.answer) ? 1 : 0.1) : span <= 200 ? 1 : Math.pow(10, Math.floor(Math.log10(span)) - 2);
  const fmt = (n) => `${Number(n).toLocaleString(undefined, { maximumFractionDigits: 1 })} ${e.unit}`;
  const start = done ? done.value : e.min + span / 2;
  openSheet('Guess of the day', `
    <p class="guess-big">${esc(e.q)}</p>
    <div class="slider"><input id="gs" type="range" min="${e.min}" max="${e.max}" step="${step}" value="${start}" ${done ? 'disabled' : ''}><b id="gv">${fmt(start)}</b></div>
    <p class="lead" id="g-res">${done ? `You guessed ${fmt(done.value)}. The answer: ${fmt(e.answer)}. From "${esc(card.title)}".` : ''}</p>
    ${done ? '' : '<button id="g-go" class="btn primary wide">Lock it in</button>'}
  `, 'puzzle');
  const gs = $('#gs');
  gs.oninput = () => { $('#gv').textContent = fmt(gs.value); };
  if (done) return;
  $('#g-go').onclick = () => {
    const value = Number(gs.value);
    const off = Math.abs(value - e.answer) / span;
    const verdict = off <= 0.03 ? 'Spot on!' : off <= 0.1 ? 'Very close.' : off <= 0.25 ? 'Not bad.' : 'Way off, but now you know.';
    S.daily.guess = { value, off };
    if (S.reviews[card.id]) grade(card.id, off <= 0.1);
    const news = masteryNews();
    commit();
    gs.disabled = true; $('#g-go').remove();
    $('#g-res').innerHTML = `<b>${verdict}</b> The answer is ${esc(fmt(e.answer))}. From "${esc(card.title)}".`;
    onClose = async () => {
      const g = off <= 0.03 ? grantGift('Fennel') : null;
      const lines = [off <= 0.1 ? 'Ha! You were close.' : 'Numbers are funny like that.', ...(g ? [`(Fennel gave you a ${g.toLowerCase()} for nailing it.)`] : []), ...news];
      await talk('fennel', lines);
    };
  };
}

// ── Pepper's wine games ────────────────────────────────────────────────
// Wine map: name the glowing region, or find a named one. Taste test: set
// sweetness, acidity, tannin and body for a classic style.
const mapSvg = (map, dots, glow) => {
  const m = MAPS[map];
  return `<svg class="winemap" viewBox="0 0 ${m.width} ${m.height}" preserveAspectRatio="xMidYMid meet">
    <rect width="${m.width}" height="${m.height}" fill="#bfe6f0"/>
    ${m.paths.map((p) => `<path d="${p.d}" fill="#f4ead2" stroke="#b8a983" stroke-width="${map === 'world' ? 0.5 : 0.9}"/>`).join('')}
    ${glow ? (() => { const [x, y] = project(map, glow.lon, glow.lat); return `<circle class="glow" cx="${x}" cy="${y}" r="${map === 'world' ? 9 : 16}"/><circle cx="${x}" cy="${y}" r="${map === 'world' ? 3.5 : 5}" fill="#c63c30" stroke="#fff" stroke-width="1.5"/>`; })() : ''}
    ${(dots || []).map((d, i) => { const [x, y] = project(map, d.lon, d.lat); return `<g class="pin" data-i="${i}" data-id="${d.id}"><circle cx="${x}" cy="${y}" r="${map === 'world' ? 11 : 15}" fill="transparent"/><circle class="pin-dot" cx="${x}" cy="${y}" r="${map === 'world' ? 5 : 7}"/></g>`; }).join('')}
  </svg>`;
};
const readText = () => S.lessons.map((l) => LESSONS.find((x) => x.id === l.id)).filter(Boolean).map((l) => ({ id: l.id, text: (l.title + ' ' + l.body.join(' ')).toLowerCase() }));
const wordRe = (w) => new RegExp(`(^|[^a-zà-ÿ])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-zà-ÿ])`, 'i');
const cardFor = (region) => readText().find((c) => region.words.some((w) => wordRe(w).test(c.text)))?.id;
function openWineMap() { openPlaceMap(REGIONS, 'Wine map', 'region', 'mapGift'); }
function openCheeseMap() { openPlaceMap(CHEESES, 'Cheese map', 'cheese', 'cheeseMapGift'); }
function openPlaceMap(PLACES, title, noun, giftKey) {
  // places you've read about come first; the rest fill in
  const known = PLACES.filter((r) => cardFor(r)), other = PLACES.filter((r) => !cardFor(r));
  const rounds = [...shuffle(known), ...shuffle(other)].slice(0, 5).map((r, i) => ({ r, type: i % 2 ? 'find' : 'name' }));
  let i = 0, score = 0;
  const show = () => {
    const { r, type } = rounds[i];
    const same = PLACES.filter((x) => x.map === r.map && x.id !== r.id);
    if (type === 'name') {
      const opts = shuffle([r, ...shuffle(same).slice(0, 3)]);
      openSheet(title, `<p class="lead">Round ${i + 1} of 5 · ${noun === 'cheese' ? 'Which cheese comes from here?' : 'Which region is glowing?'}</p>${mapSvg(r.map, null, r)}
        <div class="opts">${opts.map((o) => `<button class="opt" data-id="${o.id}">${esc(o.name)}</button>`).join('')}</div><p class="map-fact"></p>`, 'puzzle');
      sheet.querySelectorAll('.opt').forEach((b) => b.onclick = () => answer(b.dataset.id === r.id, b));
    } else {
      const dots = shuffle([r, ...shuffle(same).slice(0, 3)]);
      openSheet(title, `<p class="lead">Round ${i + 1} of 5 · ${noun === 'cheese' ? `Where is <b>${esc(r.name)}</b> made?` : `Tap <b>${esc(r.name)}</b>.`}</p>${mapSvg(r.map, dots)}<p class="map-fact"></p>`, 'puzzle');
      sheet.querySelectorAll('.pin').forEach((g) => g.onclick = () => answer(dots[+g.dataset.i].id === r.id, g));
    }
  };
  const answer = (right, el) => {
    if (sheet.querySelector('.answered-round')) return;
    const { r } = rounds[i];
    if (right) score += 1;
    el.classList.add(right ? 'right' : 'wrong');
    sheet.querySelectorAll('.opt').forEach((b) => { b.disabled = true; if (b.dataset.id === r.id) b.classList.add('right'); });
    sheet.querySelectorAll('.pin').forEach((p) => { p.classList.add('done'); if (p.dataset.id === r.id) p.classList.add('right'); });
    const card = cardFor(r);
    if (card && S.reviews[card]) grade(card, right);
    const fact = sheet.querySelector('.map-fact');
    fact.classList.add('answered-round');
    fact.innerHTML = `<b>${right ? 'Yes!' : 'Not quite.'} ${esc(r.name)}, ${esc(r.country)}.</b> ${esc(r.known)}`;
    fact.insertAdjacentHTML('afterend', `<button class="btn primary wide" id="map-next">${i < 4 ? 'Next' : 'Finish'}</button>`);
    $('#map-next').onclick = () => { i += 1; if (i < 5) show(); else finish(); };
  };
  const finish = () => {
    const news = masteryNews();
    commit();
    closeSheet();
    setTimeout(async () => {
      const lines = [score === 5 ? (noun === 'cheese' ? 'Five for five! You could run a cheese counter.' : 'Five for five! You could lead a wine tour.') : score >= 3 ? `${score} out of 5. ${noun === 'cheese' ? 'You know your cheeses.' : 'You know your way around a wine list.'}` : `${score} out of 5. Maps take a few goes. Come back tomorrow.`];
      if (score === 5 && !S.daily[giftKey]) { S.daily[giftKey] = true; const g = grantGift('Pepper'); if (g) lines.push(`(Pepper gave you a ${g.toLowerCase()}.)`); }
      await talk('pepper', [...lines, ...news]);
    }, 250);
  };
  show();
}
function openTaste() {
  const rounds = shuffle(STYLES).slice(0, 3);
  let i = 0, total = 0;
  const show = () => {
    const st = rounds[i];
    openSheet('Taste test', `<p class="lead">Round ${i + 1} of 3 · How does this one usually taste?</p>
      <div class="taste-wine"><b>${esc(st.name)}</b><small>${esc(st.grape)} · ${esc(st.colour)}</small></div>
      ${TRAITS.map((t) => `<div class="trait" data-k="${t.key}"><div class="trait-head"><b>${t.label}</b><span class="trait-val">3</span></div>
        <input type="range" min="1" max="5" step="1" value="3"><div class="trait-ends"><small>${t.lo}</small><small>${t.hi}</small></div><div class="trait-true"></div></div>`).join('')}
      <button class="btn primary wide" id="taste-go">Taste it</button><p class="map-fact"></p>`, 'puzzle');
    sheet.querySelectorAll('.trait input').forEach((inp) => inp.oninput = () => { inp.closest('.trait').querySelector('.trait-val').textContent = inp.value; });
    $('#taste-go').onclick = () => {
      let got = 0;
      sheet.querySelectorAll('.trait').forEach((row) => {
        const k = row.dataset.k, inp = row.querySelector('input'), truth = st[k];
        const ok = Math.abs(+inp.value - truth) <= 1;
        got += ok; inp.disabled = true;
        row.classList.add(ok ? 'ok' : 'bad');
        row.querySelector('.trait-true').innerHTML = `<i style="left:${(truth - 1) * 25}%"></i>`;
        row.querySelector('.trait-val').textContent = `${inp.value} · typical ${truth}`;
      });
      total += got;
      $('#taste-go').remove();
      const fact = sheet.querySelector('.map-fact');
      fact.innerHTML = `<b>${got}/4 close.</b> ${esc(st.note)}`;
      fact.insertAdjacentHTML('afterend', `<button class="btn primary wide" id="taste-next">${i < 2 ? 'Next wine' : 'Finish'}</button>`);
      $('#taste-next').onclick = () => { i += 1; if (i < 3) show(); else finish(); };
    };
  };
  const finish = () => {
    if (S.reviews['wine-structure']) grade('wine-structure', total >= 9);
    const news = masteryNews();
    commit();
    closeSheet();
    setTimeout(async () => {
      const lines = [total === 12 ? 'A perfect palate! Sit down, have a glass.' : total >= 9 ? `${total} out of 12. You have a good palate.` : `${total} out of 12. Tasting is practice. So, more tasting.`];
      if (total === 12 && !S.daily.tasteGift) { S.daily.tasteGift = true; const g = grantGift('Pepper'); if (g) lines.push(`(Pepper gave you a ${g.toLowerCase()}.)`); }
      await talk('pepper', [...lines, ...news]);
    }, 250);
  };
  show();
}
// ── Focus time (grow a grove) ──────────────────────────────────────────
// Like a focus forest: pick a length, put the phone down, and a plant grows.
// Nothing withers if you leave: it's on your honour, like logging. A full
// session plants something in the grove and pays energy.
const FOCUS = { 10: { plant: 'flowers', label: 'a flower patch', energy: 1 }, 25: { plant: 'tree', label: 'a tree', energy: 2 }, 50: { plant: 'blossom', label: 'a blossom tree', energy: 3 } };
S.grove = S.grove || [];
S.grove.forEach((g) => world.placePlant(g.id, g.kind, g.spot));
const focusEl = $('#focus');
let focusTimer = null;
function startFocus(mins) {
  S.focus = { start: Date.now(), mins };
  save(S);
  runFocus();
}
function runFocus() {
  const f = S.focus;
  if (!f) return;
  const info = FOCUS[f.mins];
  focusEl.classList.add('show');
  $('#focus-what').textContent = `Growing ${info.label}`;
  const tick = () => {
    const left = f.start + f.mins * 60000 - Date.now();
    const done = 1 - Math.max(0, left) / (f.mins * 60000);
    $('#focus-time').textContent = `${Math.floor(Math.max(0, left) / 60000)}:${String(Math.floor((Math.max(0, left) % 60000) / 1000)).padStart(2, '0')}`;
    $('#focus-plant').style.setProperty('--g', done.toFixed(3));
    $('#focus-ring').style.setProperty('--p', `${(done * 100).toFixed(1)}%`);
    if (left <= 0) finishFocus();
  };
  clearInterval(focusTimer);
  focusTimer = setInterval(tick, 1000);
  tick();
}
async function finishFocus() {
  clearInterval(focusTimer);
  const f = S.focus;
  S.focus = null;
  focusEl.classList.remove('show');
  if (!f) return;
  const info = FOCUS[f.mins];
  const used = new Set([...S.gifts.map((g) => g.spot.join(',')), ...S.grove.map((g) => g.spot.join(','))]);
  const spot = world.groveSpots().find((p) => !used.has(p.join(',')));
  const lines = [`${f.mins} minutes of focus. Nice work.`];
  if (spot) {
    const id = `p${Date.now()}`;
    S.grove.push({ id, kind: info.plant, spot, mins: f.mins, ts: f.start });
    world.placePlant(id, info.plant, spot, true);
    world.focusOn(spot[0] + 0.5, spot[1] + 0.5);
    lines.push(`I planted ${info.label} in the grove. +${info.energy} energy.`);
  }
  S.energy += info.energy;
  commit();
  newlyUnlocked();
  floatReward(info.energy);
  world.hop();
  await talk('pip', lines);
}
$('#focus-stop').onclick = async () => {
  const f = S.focus;
  const mins = f ? Math.floor((Date.now() - f.start) / 60000) : 0;
  clearInterval(focusTimer);
  S.focus = null; save(S);
  focusEl.classList.remove('show');
  await talk('pip', [mins >= 1 ? `${mins} minute${mins > 1 ? 's' : ''} is still something. The seedling will wait for next time.` : 'No problem. The seedling will wait for next time.']);
};
document.addEventListener('visibilitychange', () => { if (!document.hidden && S.focus) runFocus(); });
if (S.focus) setTimeout(runFocus, 500);

// ── Seasons, weather and time of day ───────────────────────────────────
// All from your real clock and calendar. Weather is picked once a day.
const SEASON = (() => { const m = new Date().getMonth(); return m <= 1 || m === 11 ? 'winter' : m <= 4 ? 'spring' : m <= 7 ? 'summer' : 'autumn'; })();
const WEATHER_WORD = { sunny: 'Sunny', cloudy: 'Cloudy', rain: 'Rain', snow: 'Snow' };
function rollWeather() {
  const r = seeded(today() + 'wx')();
  if (SEASON === 'winter') return r < 0.3 ? 'snow' : r < 0.55 ? 'cloudy' : 'sunny';
  return r < 0.2 ? 'rain' : r < 0.45 ? 'cloudy' : 'sunny';
}
const hourNow = () => { const d = new Date(); return d.getHours() + d.getMinutes() / 60; };
const isNight = () => { const h = hourNow(); return h < 6 || h >= 19; };
function applyAtmosphere() {
  if (!S.daily.weather) { S.daily.weather = rollWeather(); save(S); }
  world.setSeason(SEASON);
  if (world.weather !== S.daily.weather) world.setWeather(S.daily.weather);
  world.setTimeOfDay(hourNow());
  $('#clock-day').textContent = `${new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · ${WEATHER_WORD[S.daily.weather]}`;
}

// ── Things to collect around the island ────────────────────────────────
// Weeds and shells turn up each day; bugs change with the time of day and
// season; fruit trees regrow overnight.
const BUGS = [
  { id: 'cabbagewhite', name: 'Cabbage White', color: '#fbf6ec', time: 'day', seasons: ['spring', 'summer', 'autumn'] },
  { id: 'swallowtail', name: 'Swallowtail', color: '#f2c94c', time: 'day', seasons: ['spring', 'summer'] },
  { id: 'commonblue', name: 'Common Blue', color: '#7aa8e8', time: 'day', seasons: ['spring', 'summer'] },
  { id: 'monarch', name: 'Monarch', color: '#ef8a3c', time: 'day', seasons: ['summer', 'autumn'] },
  { id: 'peacock', name: 'Peacock Butterfly', color: '#c63c30', time: 'day', seasons: ['spring', 'summer', 'autumn'] },
  { id: 'dragonfly', name: 'Dragonfly', color: '#3fa7b8', time: 'day', seasons: ['summer', 'autumn'] },
  { id: 'brimstone', name: 'Brimstone', color: '#e8e070', time: 'day', seasons: ['winter', 'spring'] },
  { id: 'mourningcloak', name: 'Mourning Cloak', color: '#5a3a2a', time: 'day', seasons: ['autumn', 'winter', 'spring'] },
  { id: 'firefly', name: 'Firefly', color: '#e9ff7a', time: 'night', seasons: ['summer'], glow: true },
  { id: 'lunamoth', name: 'Luna Moth', color: '#bfe8b0', time: 'night', seasons: ['spring', 'summer'] },
  { id: 'tigermoth', name: 'Garden Tiger Moth', color: '#e0784a', time: 'night', seasons: ['summer', 'autumn'] },
  { id: 'wintermoth', name: 'Winter Moth', color: '#c9bfae', time: 'night', seasons: ['autumn', 'winter'] },
];
const SHELLS = [
  { id: 'scallop', name: 'Scallop shell', color: '#f6c2a8', w: 4 }, { id: 'cowrie', name: 'Cowrie', color: '#e8d9c0', w: 4 },
  { id: 'conch', name: 'Conch', color: '#f3b6b0', w: 2 }, { id: 'sanddollar', name: 'Sand dollar', color: '#efe6cf', w: 2 },
  { id: 'coral', name: 'Coral', color: '#ff8f7a', w: 1 },
];
const FRUIT_OF = { '#e8312f': 'apple', '#ff9f1c': 'orange', '#ffab91': 'peach' };
S.pocket = S.pocket || {};
const pocket = S.pocket;
for (const k of ['fruit', 'shells', 'bugs']) pocket[k] = pocket[k] || {};
const bump = (bag, key, n = 1) => { bag[key] = (bag[key] || 0) + n; };

function planPickups() {
  const r = seeded(today() + 'pk');
  const used = new Set([...S.gifts.map((g) => g.spot.join(',')), ...(S.grove || []).map((g) => g.spot.join(','))]);
  const spots = world.giftSpots().filter((p) => !used.has(p.join(',')));
  const sand = spots.filter(([x, z]) => z >= 18), grass = spots.filter(([x, z]) => z < 18);
  const pickN = (arr, n) => arr.slice().sort(() => r() - 0.5).slice(0, n);
  const list = [];
  pickN(grass, SEASON === 'winter' ? 3 : 6 + Math.floor(r() * 4)).forEach(([x, z], i) => list.push({ id: `weed${i}`, kind: 'weed', x, z }));
  pickN(sand, 3 + Math.floor(r() * 3)).forEach(([x, z], i) => {
    const total = SHELLS.reduce((a, s) => a + s.w, 0); let k = r() * total; const sh = SHELLS.find((s) => (k -= s.w) <= 0) || SHELLS[0];
    list.push({ id: `shell${i}`, kind: 'shell', x, z, species: sh.id, color: sh.color });
  });
  return list;
}
// Bugs depend on the hour, so they're rolled per part of the day.
function planBugs() {
  const night = isNight();
  const period = night ? 'night' : 'day';
  if (S.daily.weather === 'rain' || S.daily.weather === 'snow') return [];
  const r = seeded(today() + 'bug' + period);
  const pool = BUGS.filter((b) => b.time === period && b.seasons.includes(SEASON));
  if (!pool.length) return [];
  const used = new Set([...S.gifts.map((g) => g.spot.join(',')), ...(S.grove || []).map((g) => g.spot.join(','))]);
  const spots = world.giftSpots().filter((p) => !used.has(p.join(',')) && p[1] < 18).sort(() => r() - 0.5);
  return Array.from({ length: 2 + Math.floor(r() * 3) }, (_, i) => {
    const b = pool[Math.floor(r() * pool.length)];
    return { id: `bug-${period}-${i}`, kind: 'bug', x: spots[i][0], z: spots[i][1], species: b.id, color: b.color, glow: b.glow };
  });
}
function spawnToday() {
  S.daily.collected = S.daily.collected || [];
  S.daily.picked = S.daily.picked || [];
  const all = [...planPickups(), ...planBugs()].filter((p) => !S.daily.collected.includes(p.id));
  world.spawnPickups(all);
  for (const k of world.fruitTreeKeys()) world.setFruit(k, !S.daily.picked.includes(k));
  world._bugPeriod = isNight();
}
world.on('pickupTap', (id) => {
  world.collect(id, async (p) => {
    S.daily.collected.push(p.id);
    if (p.kind === 'weed') {
      bump(pocket, 'weeds');
      const lines = [];
      if (seeded(today() + p.id)() < 0.1) { bump(pocket, 'clovers'); lines.push('A four-leaf clover was hiding under that weed!'); }
      const left = [...(world.pickups?.values() || [])].filter((x) => x.kind === 'weed').length;
      if (!left && !S.daily.weedGift) {
        S.daily.weedGift = true;
        const g = grantGift('Fennel');
        lines.push('Every weed is gone. The island looks lovely.', ...(g ? [`(Fennel left you a ${g.toLowerCase()} as thanks.)`] : []));
      }
      save(S);
      if (lines.length) await talk('note', lines); else toast(`Pulled a weed (${left} left today)`);
    } else if (p.kind === 'shell') {
      const sh = SHELLS.find((s) => s.id === p.species);
      bump(pocket.shells, sh.id); save(S);
      toast(`Found a ${sh.name.toLowerCase()}!`);
    } else if (p.kind === 'bug') {
      const b = BUGS.find((x) => x.id === p.species);
      const first = !pocket.bugs[b.id];
      bump(pocket.bugs, b.id); save(S);
      await talk('note', [`You caught a ${b.name}!${first ? ' New to your collection.' : ''}`]);
    }
  });
});
world.on('treeTap', (key) => {
  if (S.daily.picked.includes(key)) { talk('note', ['No fruit left on this one. It will grow back tomorrow.']); return; }
  world.shakeTree(key, (n) => {
    if (!n) return;
    S.daily.picked.push(key);
    const t = world.fruitTrees.get(key);
    const kind = FRUIT_OF[t.color] || 'apple';
    bump(pocket.fruit, kind, n); save(S);
    toast(`+${n} ${kind}${n > 1 ? (kind === 'peach' ? 'es' : 's') : ''}`);
  });
});
const fruitTotal = () => Object.values(pocket.fruit).reduce((a, n) => a + n, 0);
function tradeFruit() {
  let need = 5;
  for (const k of Object.keys(pocket.fruit)) { const take = Math.min(need, pocket.fruit[k]); pocket.fruit[k] -= take; need -= take; }
  const g = grantGift('Pepper');
  save(S);
  talk('pepper', ['Oh, these are lovely. I\'ll bake something.', g ? `(Pepper gave you a ${g.toLowerCase()} in return.)` : 'Here, have a slice. It\'s still warm.']);
}

// Start it all up, and keep the sky in step with the clock.
applyAtmosphere();
spawnToday();
setInterval(() => {
  if (S.daily.date !== today()) return; // the day roll-over handler refreshes everything
  applyAtmosphere();
  if (world._bugPeriod !== isNight()) spawnToday();
}, 30000);

// ── Places open straight away ──────────────────────────────────────────
// Tapping a building opens it. Tapping a keeper gets a friendly line (and
// now and then a small gift). No conversations stand between you and the
// learning.
function placeMenu(title, lead, buttons) {
  openSheet(title, `${lead ? `<p class="lead">${lead}</p>` : ''}<div class="menu">${buttons.map((b, i) => `<button class="menu-btn" data-i="${i}"><b>${esc(b.label)}</b>${b.sub ? `<small>${esc(b.sub)}</small>` : ''}</button>`).join('')}</div>`, 'menu-sheet');
  sheet.querySelectorAll('.menu-btn').forEach((el) => el.onclick = () => { const b = buttons[+el.dataset.i]; closeSheet(); setTimeout(b.fn, 260); });
}
VISIT.library = () => { filters = new Set(); openLessons(); };
VISIT.gym = () => openLog();
VISIT.workbench = () => openBuild();
VISIT.dock = () => goFishing('dock');
VISIT.pond = () => goFishing('pond');
VISIT.observatory = () => { filters = new Set(DISTRICTS.observatory.cats); openLessons(); };
VISIT.square = () => placeMenu('Town board', '', [
  { label: `Today's timeline${S.daily.timeline ? ` · ${S.daily.timeline.score}/5` : ''}`, sub: 'Put five events in order', fn: openTimeline },
  { label: `Guess of the day${S.daily.guess ? ' · done' : ''}`, sub: 'A number from one of your cards', fn: openGuess },
  { label: 'Read about news, travel or history', fn: () => { filters = new Set(DISTRICTS.square.cats); openLessons(); } },
]);
VISIT.market = () => placeMenu('Market', '', [
  { label: 'Wine map', sub: 'Name or find 24 wine regions', fn: openWineMap },
  { label: 'Cheese map', sub: 'Where 23 cheeses are made', fn: openCheeseMap },
  { label: 'Taste test', sub: 'Sweetness, acidity, tannin, body', fn: openTaste },
  ...(fruitTotal() >= 5 ? [{ label: 'Trade 5 fruit', sub: `You have ${fruitTotal()}`, fn: tradeFruit }] : []),
  { label: 'Read about food, wine or cheese', fn: () => { filters = new Set(DISTRICTS.market.cats); openLessons(); } },
]);
VISIT.home = () => placeMenu('Focus time', S.grove.length ? `${S.grove.length} grown so far.` : '', [
  { label: '10 minutes', sub: 'A flower patch · +1 energy', fn: () => startFocus(10) },
  { label: '25 minutes', sub: 'A tree · +2 energy', fn: () => startFocus(25) },
  { label: '50 minutes', sub: 'A blossom tree · +3 energy', fn: () => startFocus(50) },
]);
const CHAT = {
  library: ['maple', ['Quiet day. Perfect for reading.', 'I just shelved some new cards.', 'Mind the steps, I polished them.']],
  gym: ['dot', ['Hey hey! Looking strong.', 'Every bit counts!', 'Stretch first. Always stretch.']],
  workbench: ['bram', ['Measure twice, cut once.', 'Got any energy? I\'ve got ideas.', 'Fine day for building.']],
  square: ['fennel', ['Fresh puzzles on the board.', 'No letters for you. Stories, though.', 'Everyone passes through the square eventually.']],
  market: ['pepper', ['The market smells great today.', 'Fancy a taste test?', 'Busy morning on the street.']],
  observatory: ['sage', ['Slow and steady, as they say.', 'Clear skies tonight, I hope.', 'A good question outlives its answer.']],
};
// Keepers who teach, and the topics they cover.
const TEACH = {
  library: { who: 'maple', cats: ['art', 'film', 'fashion', 'culture'], offer: ['Want to learn something? Art, film, fashion or culture.', 'I have a card or two set aside for you.'] },
  square: { who: 'fennel', cats: DISTRICTS.square.cats, offer: ['News, travel, history. Want a quick lesson?', 'I\'ve got stories from all over. Want one?'] },
  market: { who: 'pepper', cats: DISTRICTS.market.cats, offer: ['Food, wine, cheese. Shall I teach you something?', 'Pull up a stool. Want a little lesson?'] },
  observatory: { who: 'sage', cats: DISTRICTS.observatory.cats, offer: ['Science, probability, robots, big ideas. Shall we?', 'I have a puzzle or two for you, if you like.'] },
};
async function keeperChat(id) {
  const t = TEACH[id];
  if (t) {
    const c = await talk(t.who, [pick(t.offer)], ['Teach me', 'Not now']);
    if (c === 0) setTimeout(() => startToday(t.cats, t.who), 200);
    else await maybeKeeperGift(id);
    return;
  }
  const [who, lines] = CHAT[id] || [];
  if (!who) return VISIT[id]();
  await talk(who, [pick(lines)]);
  await maybeKeeperGift(id);
}

// ── Today ──────────────────────────────────────────────────────────────
// One short, mixed session: new cards to read, and reviews of what's due,
// each in whichever format suits the card (map, timeline, slider or a plain
// recall question). Topics are mixed on purpose.
function planToday(cats = null) {
  const now = Date.now();
  const due = Object.keys(S.reviews).filter((id) => QUIZ[id] && S.reviews[id].due <= now && (!cats || cats.includes(CAT_OF[id]))).sort((a, b) => S.reviews[a].due - S.reviews[b].due);
  const reviews = due.slice(0, 5);
  const fresh = [];
  const keep = filters; filters = new Set(cats || []); // Today mixes every topic; a keeper sticks to theirs
  const usedCats = new Set(cats ? [] : reviews.map((id) => CAT_OF[id]));
  for (let i = 0; i < (cats ? (reviews.length >= 3 ? 1 : 2) : reviews.length >= 4 ? 2 : 3); i++) {
    let pickd = null;
    for (let tries = 0; tries < 12 && !pickd; tries++) { const c = nextLesson(fresh.map((l) => l.id)); if (!usedCats.has(c.cat) || tries === 11) pickd = c; }
    fresh.push(pickd); usedCats.add(pickd.cat);
  }
  filters = keep;
  const steps = [];
  const readTimeline = S.lessons.map((l) => LESSONS.find((x) => x.id === l.id)).filter((l) => l?.timeline && (!cats || cats.includes(l.cat)));
  const timelineReady = new Set(readTimeline.map((l) => l.timeline.year)).size >= 4;
  // interleave: review, new, review, new...
  const revSteps = reviews.map((id) => ({ kind: 'review', id }));
  while (revSteps.length || fresh.length) {
    if (revSteps.length) steps.push(revSteps.shift());
    if (fresh.length) steps.push({ kind: 'new', card: fresh.shift() });
  }
  if (timelineReady) steps.splice(Math.min(steps.length, 3), 0, { kind: 'timeline' });
  return steps;
}
// Pick the most fitting format for reviewing a card.
function reviewFormat(id) {
  const l = LESSONS.find((x) => x.id === id);
  const place = [...REGIONS, ...CHEESES].find((p) => cardFor(p) === id);
  const n = S.reviews[id]?.n || 0;
  if (place && n % 2 === 0) return { kind: 'map', place };
  if (l.estimate && n % 3 === 1) return { kind: 'estimate' };
  return { kind: 'recall' };
}
const todayEl = $('#today');
function renderTodayTag() {
  const done = S.daily.todayDone;
  todayEl.classList.toggle('done', !!done);
  todayEl.innerHTML = done ? `${ICON.check}<b>Today</b>` : `<b>Today</b><small>${planToday().length} steps</small>`;
}
todayEl.onclick = () => startToday();
function startToday(cats = null, teacher = null) {
  const steps = planToday(cats);
  const title = teacher ? `${CAST[teacher].name()}'s lesson` : 'Today';
  if (!steps.length) { toast('Nothing to do yet. Read a card at the library first.'); return; }
  const log = { newCards: 0, reviews: 0, right: 0, topics: new Set() };
  let i = 0;
  const frame = (title, inner) => {
    openSheet(title, `<div class="today-bar"><i style="width:${(i / steps.length) * 100}%"></i></div><p class="today-kind">${title}</p><div id="tstep">${inner}</div>`, 'today-sheet');
  };
  const next = () => { i += 1; if (i < steps.length) show(); else finish(); };
  const cont = (label = 'Continue') => {
    const b = document.createElement('button');
    b.className = 'btn primary wide'; b.textContent = label;
    b.onclick = next;
    $('#tstep').appendChild(b);
    b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  const recordReview = (id, right) => { grade(id, right); log.reviews += 1; log.right += right ? 1 : 0; log.topics.add(CAT_OF[id]); };
  const show = () => {
    const st = steps[i];
    if (st.kind === 'new') {
      const l = st.card, g = QUIZ[l.id][0];
      frame(`New · ${CATEGORIES[l.cat].label}`, `<article class="card">
        <h3>${esc(l.title)}</h3>
        <div class="guess"><span class="guess-label">Quick guess</span>
          <p class="guess-q">${esc(g.q)}</p>
          <div class="opts">${shuffle([g.a, ...g.w]).map((o) => `<button class="opt" data-right="${o === g.a ? 1 : 0}">${esc(o)}</button>`).join('')}</div>
          <p class="guess-result"></p><button class="guess-skip">Skip the guess</button></div>
        <div class="reading">${l.body.map((p) => `<p>${esc(p)}</p>`).join('')}${hasDemo(l.id) ? `<div class="demo" data-demo="${l.id}"></div>` : ''}</div></article>`);
      const card = $('#tstep .card');
      const reveal = (txt) => { card.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (x.dataset.right === '1') x.classList.add('right'); }); card.querySelector('.guess-result').textContent = txt; card.classList.add('guessed'); const demo = card.querySelector('.demo'); if (demo) mountDemo(demo, demo.dataset.demo); };
      card.querySelectorAll('.opt').forEach((o) => o.onclick = () => { const r = o.dataset.right === '1'; if (!r) o.classList.add('wrong'); reveal(r ? 'Correct.' : 'Not quite.'); });
      card.querySelector('.guess-skip').onclick = () => reveal('');
      const got = document.createElement('button');
      got.className = 'btn primary wide'; got.innerHTML = `Got it <span class="amt">${ICON.leaf}+1</span>`;
      got.onclick = () => {
        S.lessons.push({ id: l.id, cat: l.cat, answer: '', ts: Date.now() });
        scheduleNew(l.id);
        S.energy += 1; log.newCards += 1; log.topics.add(l.cat);
        commit(); floatReward(1, got); newlyUnlocked();
        next();
      };
      card.querySelector('.reading').appendChild(got);
    } else if (st.kind === 'review') {
      const id = st.id, l = LESSONS.find((x) => x.id === id), fmt = reviewFormat(id);
      const from = `<p class="today-from">From "${esc(l.title)}"</p>`;
      if (fmt.kind === 'map') {
        const r = fmt.place, pool = REGIONS.includes(r) ? REGIONS : CHEESES;
        const opts = shuffle([r, ...shuffle(pool.filter((x) => x.map === r.map && x.id !== r.id)).slice(0, 3)]);
        frame(`Review · ${CATEGORIES[l.cat].label}`, `<p class="guess-q">${pool === CHEESES ? 'Which cheese comes from here?' : 'Which region is glowing?'}</p>${mapSvg(r.map, null, r)}
          <div class="opts">${opts.map((o) => `<button class="opt" data-id="${o.id}">${esc(o.name)}</button>`).join('')}</div><p class="map-fact"></p>${from}`);
        $('#tstep').querySelectorAll('.opt').forEach((b) => b.onclick = () => {
          const right = b.dataset.id === r.id;
          $('#tstep').querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (x.dataset.id === r.id) x.classList.add('right'); });
          if (!right) b.classList.add('wrong');
          $('#tstep .map-fact').innerHTML = `<b>${esc(r.name)}, ${esc(r.country)}.</b> ${esc(r.known)}`;
          recordReview(id, right); cont();
        });
      } else if (fmt.kind === 'estimate') {
        const e = l.estimate, span = e.max - e.min;
        const step = span <= 20 ? (Number.isInteger(e.answer) ? 1 : 0.1) : span <= 200 ? 1 : Math.pow(10, Math.floor(Math.log10(span)) - 2);
        const f = (n) => `${Number(n).toLocaleString(undefined, { maximumFractionDigits: 1 })} ${e.unit}`;
        frame(`Review · ${CATEGORIES[l.cat].label}`, `<p class="guess-q">${esc(e.q)}</p>
          <div class="slider"><input id="ts" type="range" min="${e.min}" max="${e.max}" step="${step}" value="${e.min + span / 2}"><b id="tv">${f(e.min + span / 2)}</b></div>
          <button class="btn primary wide" id="tgo">Lock it in</button><p class="map-fact"></p>${from}`);
        const ts = $('#ts'); ts.oninput = () => { $('#tv').textContent = f(ts.value); };
        $('#tgo').onclick = () => {
          const off = Math.abs(+ts.value - e.answer) / span;
          ts.disabled = true; $('#tgo').remove();
          $('#tstep .map-fact').innerHTML = `<b>${off <= 0.03 ? 'Spot on!' : off <= 0.1 ? 'Very close.' : off <= 0.25 ? 'Not bad.' : 'Way off.'}</b> The answer is ${esc(f(e.answer))}.`;
          recordReview(id, off <= 0.1); cont();
        };
      } else {
        const qs = QUIZ[id], q = qs[((S.reviews[id]?.n || 0) + 1) % qs.length];
        const opts = shuffle([q.a, ...q.w]);
        frame(`Review · ${CATEGORIES[l.cat].label}`, `<p class="guess-q">${esc(q.q)}</p><div class="opts">${opts.map((o) => `<button class="opt">${esc(o)}</button>`).join('')}</div><p class="map-fact"></p>${from}`);
        $('#tstep').querySelectorAll('.opt').forEach((b) => b.onclick = () => {
          const right = b.textContent === q.a;
          $('#tstep').querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (x.textContent === q.a) x.classList.add('right'); });
          if (!right) b.classList.add('wrong');
          $('#tstep .map-fact').innerHTML = `<b>${right ? 'Yes!' : 'Not quite.'}</b> ${esc(q.why)}`;
          recordReview(id, right); cont();
        });
      }
    } else if (st.kind === 'timeline') {
      const pool = S.lessons.map((x) => LESSONS.find((y) => y.id === x.id)).filter((x) => x?.timeline && (!cats || cats.includes(x.cat)));
      const years = new Set();
      const evs = shuffle(pool).filter((x) => !years.has(x.timeline.year) && years.add(x.timeline.year)).slice(0, 4);
      frame('Timeline', `<p class="guess-q">Earliest at the top.</p>
        <ol class="tl">${shuffle(evs).map((x) => `<li class="tl-row" data-id="${x.id}"><span class="grip"><i></i><i></i><i></i></span><span class="tl-text">${esc(x.timeline.event)}</span><b class="tl-year"></b></li>`).join('')}</ol>
        <button class="btn primary wide" id="tlgo">Check</button>`);
      const list = $('#tstep .tl');
      let drag = null;
      list.addEventListener('pointerdown', (e) => { const row = e.target.closest('.tl-row'); if (!row) return; drag = row; row.classList.add('dragging'); row.setPointerCapture(e.pointerId); });
      list.addEventListener('pointermove', (e) => { if (!drag) return; const over = [...list.children].find((r) => { const bb = r.getBoundingClientRect(); return r !== drag && e.clientY > bb.top && e.clientY < bb.bottom; }); if (!over) return; const kids = [...list.children]; if (kids.indexOf(drag) < kids.indexOf(over)) over.after(drag); else over.before(drag); });
      const drop = () => { if (drag) drag.classList.remove('dragging'); drag = null; };
      list.addEventListener('pointerup', drop); list.addEventListener('pointercancel', drop);
      $('#tlgo').onclick = () => {
        const rows = [...list.children], sorted = evs.slice().sort((a, b) => a.timeline.year - b.timeline.year);
        rows.forEach((row, k) => { const ev = evs.find((x) => x.id === row.dataset.id); const ok = sorted[k].id === ev.id; row.classList.add(ok ? 'ok' : 'bad'); row.querySelector('.tl-year').textContent = yearLabel(ev.timeline.year); if (S.reviews[ev.id]?.due <= Date.now()) recordReview(ev.id, ok); });
        $('#tlgo').remove(); cont();
      };
    }
  };
  const finish = () => {
    const first = !cats && !S.daily.todayDone;
    if (!cats) S.daily.todayDone = true;
    if (first) S.energy += 1;
    const news = masteryNews();
    commit(); renderTodayTag();
    const topics = [...log.topics].map((c) => CATEGORIES[c].label);
    openSheet(title, `<div class="today-done">
      <p class="today-big">${cats ? 'Lesson done' : 'Done for today'}${first ? ` <span class="amt">${ICON.leaf}+1</span>` : ''}</p>
      <div class="stats"><div><b>${log.newCards}</b><small>new cards</small></div><div><b>${log.right}/${log.reviews}</b><small>remembered</small></div><div><b>${topics.length}</b><small>topics</small></div></div>
      ${topics.length ? `<p class="lead">${esc(topics.join(', '))}</p>` : ''}
      ${news.map((n) => `<p class="today-news">${esc(n)}</p>`).join('')}
      <button class="btn primary wide" id="tmore">Keep going</button>
      <button class="btn ghost wide" id="tclose">Back to the island</button></div>`, 'today-sheet');
    $('#tmore').onclick = () => startToday(cats, teacher);
    $('#tclose').onclick = closeSheet;
  };
  show();
}
renderTodayTag();

// ── Gym: log real-world actions ───────────────────────────────────────
function weekStrip() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const monday = new Date(today); monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const logged = new Map();
  S.logs.forEach((l) => { const k = dayKey(l.ts); logged.set(k, [...(logged.get(k) || []), l.kind]); });
  return `<div class="week">${Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday); d.setDate(monday.getDate() + i);
    const kinds = [...new Set(logged.get(dayKey(d)) || [])];
    const isToday = d.getTime() === today.getTime();
    return `<div class="day ${kinds.length ? 'on' : ''} ${isToday ? 'today' : ''}">
      <span>${'MTWTFSS'[i]}</span><i>${kinds.map((k) => `<b style="background:${LOG_KINDS[k].color}"></b>`).join('')}</i></div>`;
  }).join('')}</div>`;
}
function openLog() {
  let kind = null;
  const r = rhythm(S);
  openSheet('Gym', `
    <div class="tiles">${Object.entries(LOG_KINDS).map(([k, v]) =>
      `<button class="tile" data-kind="${k}">${v.icon}${v.label}</button>`).join('')}</div>
    <input id="log-note" class="note" placeholder="Add a note (optional)" maxlength="120">
    <button id="log-go" class="btn primary wide" disabled>I did it <span class="amt">${ICON.leaf}+2</span></button>
    <h4>This week</h4>
    ${weekStrip()}
    ${r > 1 ? `<p class="rhythm">${r} days in a row.</p>` : ''}
    <div class="recent">${S.logs.slice(-5).reverse().map((l) =>
      `<div class="recent-row"><span class="dotk" style="background:${LOG_KINDS[l.kind].color}"></span>${LOG_KINDS[l.kind].label}${l.note ? `: ${esc(l.note)}` : ''}<span class="when">${new Date(l.ts).toLocaleDateString(undefined, { weekday: 'short' })}</span></div>`).join('')}</div>
  `, 'log');
  sheet.querySelectorAll('.tile').forEach((t) => t.onclick = () => {
    sheet.querySelectorAll('.tile').forEach((x) => x.classList.remove('on'));
    t.classList.add('on'); kind = t.dataset.kind; $('#log-go').disabled = false;
  });
  $('#log-go').onclick = () => {
    S.logs.push({ kind, note: $('#log-note').value.trim(), ts: Date.now() });
    S.energy += 2;
    commit();
    floatReward(2, $('#log-go'));
    newlyUnlocked();
    const cheer = { workout: 'Look at you. Strong.', walk: 'Fresh air does wonders.', cooked: 'Smells good from here.', read: 'A real book! Love that.' }[kind];
    onClose = () => { world.hop(); talk('dot', [`${cheer} That's 2 energy for ${S.creatureName}.`]); };
    closeSheet();
  };
}

// ── Workbench ──────────────────────────────────────────────────────────
// The workbench lists plans by district. States:
//   ready / short   you can build it (or need more energy)
//   plan            you've read about it; remember the topic to unlock it
//   locked          read a card in its topic to get the plan
//   built           on the island (shows its current growth stage)
const GROUPS = [
  ...Object.entries(DISTRICTS).map(([k, d]) => ({ name: d.name, test: (it) => it.req.type === 'cat' && d.cats.includes(it.req.cat) })),
  { name: 'Around the island', test: (it) => it.req.type !== 'cat' },
];
function itemRow(it) {
  const built = isBuilt(it), unlocked = isUnlocked(it), p = progress(it), plan = hasPlan(it);
  const src = unlockSource(it);
  const state = built ? 'built' : unlocked ? (S.energy >= it.cost ? 'ready' : 'short') : plan ? 'plan' : 'locked';
  const stage = stageFor(it);
  const note = built ? (it.signature ? `On the island · stage ${stage} of 3` : 'On the island')
    : unlocked ? (src && it.signature ? `From "${esc(src)}"` : reqLabel(it))
    : plan ? `${reqLabel(it)} (${p.have}/${p.need})`
    : it.req.type === 'cat' ? `Read a ${CATEGORIES[it.req.cat].label} card for the plan` : `${reqLabel(it)} (${p.have}/${p.need})`;
  return { state, html: `<button class="item ${state}" data-id="${it.id}">
    <span class="thumb"><img alt="" src="${world.thumbnail(it.id, stage)}">${state === 'locked' ? `<span class="lock">${ICON.lock}</span>` : ''}</span>
    <span class="item-text"><b>${state === 'locked' ? '???' : esc(it.name)}</b><small>${note}</small></span>
    <span class="item-cost">${built ? ICON.check : leafAmt(it.cost)}</span>
  </button>` };
}
function openBuild() {
  const order = { ready: 0, short: 1, plan: 2, built: 3, locked: 4 };
  const ready = ITEMS.filter((it) => !isBuilt(it) && isUnlocked(it)).map(itemRow).sort((a, b) => order[a.state] - order[b.state]);
  const groups = GROUPS.map((g) => {
    const rows = ITEMS.filter((it) => g.test(it) && !(!isBuilt(it) && isUnlocked(it))).map(itemRow).sort((a, b) => order[a.state] - order[b.state]);
    return rows.length ? `<h4>${g.name}</h4><div class="items">${rows.map((r) => r.html).join('')}</div>` : '';
  }).join('');
  openSheet('Workbench', `<p class="lead">You have ${leafAmt(S.energy)} to spend.</p>
    ${ready.length ? `<h4>Ready to build</h4><div class="items">${ready.map((r) => r.html).join('')}</div>` : ''}${groups}`, 'build');
  sheet.querySelectorAll('.item').forEach((b) => b.onclick = () => {
    const it = ITEM_BY_ID[b.dataset.id];
    if (b.classList.contains('built')) return toast(it.signature ? `It grows as your ${CATEGORIES[it.req.cat].label} mastery rises.` : `${it.name} is already on the island.`);
    if (b.classList.contains('locked')) return toast(it.req.type === 'cat' ? `Read a ${CATEGORIES[it.req.cat].label} card at the library first.` : `To unlock: ${reqLabel(it)}`);
    if (b.classList.contains('plan')) return toast(`To build: ${reqLabel(it)}.`);
    if (b.classList.contains('short')) return toast(`You need ${it.cost - S.energy} more energy.`);
    S.energy -= it.cost;
    S.built.push({ id: it.id, ts: Date.now() });
    commit();
    onClose = () => {
      talk('bram', [pick([`One ${it.name.toLowerCase()}, coming up.`, 'Right. Let\'s get to work.'])]);
      world.build(it.id, () => setTimeout(() => talk('pip', [pick(['Ta-da!', 'Done! What do you think?', 'Look at that.'])]), 300), stageFor(it));
    };
    closeSheet();
  });
}

// ── Journal (your past answers + settings) ────────────────────────────
function openJournal() {
  const cats = Object.entries(CATEGORIES).map(([k, c]) => ({ k, c, n: S.lessons.filter((l) => l.cat === k).length }));
  openSheet('Journal', `
    <div class="stats">
      <div><b>${S.lessons.length}</b><small>cards</small></div>
      <div><b>${S.logs.length}</b><small>real things</small></div>
      <div><b>${S.fish.length}</b><small>fish</small></div>
      <div><b>${S.built.length}</b><small>built</small></div>
    </div>
    <h4>Topics</h4>
    <div class="topics">${cats.map(({ k, c, n }) => `<div class="topic" style="--c:${c.color}"><i></i><span>${c.label}</span><small>${n} read</small><b class="lv">${[1, 2, 3].map((l) => `<u class="${mastery(k) >= l ? 'on' : ''}"></u>`).join('')}</b></div>`).join('')}</div>
    <p class="lead small">Dots show mastery.</p>
    <h4>Fish caught</h4>
    <p class="lead small">${new Set(S.fish.map((f) => f.species)).size} of ${FISH.length} species.</p>
    <div class="fishgrid">${FISH.map((f) => { const mine = S.fish.filter((x) => x.species === f.id); const n = mine.length; const best = Math.max(0, ...mine.map((x) => x.cm || 0)); return `<div class="fishcell ${n ? '' : 'unknown'}">${fishSvg(f.color, n > 0)}<small>${n ? `${esc(f.name)}${best ? ` · ${best} cm` : ` ×${n}`}` : `${f.where === 'pond' ? 'Pond' : 'Sea'}, ${TIME_LABEL[f.time]}`}</small></div>`; }).join('')}</div>
    <p class="lead small">${S.gifts.length} gift${S.gifts.length === 1 ? '' : 's'} on your island.</p>
    <h4>Bugs</h4>
    <div class="fishgrid">${BUGS.map((b) => { const n = pocket.bugs[b.id] || 0; return `<div class="fishcell ${n ? '' : 'unknown'}"><span class="bugdot" style="background:${n ? b.color : '#cfc6b0'}"></span><small>${n ? `${esc(b.name)} ×${n}` : `${b.time === 'night' ? 'Night' : 'Day'} · ${b.seasons.map((x) => x[0].toUpperCase() + x.slice(1, 3)).join('/')}`}</small></div>`; }).join('')}</div>
    <h4>Around the island</h4>
    <div class="stats"><div><b>${pocket.weeds || 0}</b><small>weeds pulled</small></div><div><b>${pocket.clovers || 0}</b><small>clovers</small></div>
      <div><b>${fruitTotal()}</b><small>fruit in pocket</small></div><div><b>${Object.values(pocket.shells).reduce((a, n) => a + n, 0)}</b><small>shells</small></div></div>
    <p class="lead small">${SHELLS.map((sh) => `${sh.name} ×${pocket.shells[sh.id] || 0}`).join(' · ')}</p>
    <h4>Your answers</h4>
    <div class="answers">${S.lessons.length ? S.lessons.slice().reverse().map((a) => {
      const l = LESSONS.find((x) => x.id === a.id);
      if (!a.answer) return '';
      return l ? `<details><summary><i style="background:${CATEGORIES[a.cat].color}"></i>${esc(l.title)}</summary><p class="q">${esc(l.question)}</p><p class="a">${esc(a.answer)}</p></details>` : '';
    }).join('') : '<p class="lead">No takes yet.</p>'}</div>
    <h4>Settings</h4>
    <label class="field">Your creature's name <input id="name" value="${esc(S.creatureName)}" maxlength="16"></label>
    <div class="row">
      <button id="export" class="btn ghost">Export data</button>
      <button id="wipe" class="btn ghost danger">Start over</button>
    </div>
  `, 'journal');
  $('#name').onchange = (e) => { S.creatureName = e.target.value.trim() || 'Pip'; commit(); };
  $('#export').onclick = () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'island-mentor.json'; a.click();
  };
  $('#wipe').onclick = () => {
    if (confirm('Erase everything and start a fresh island?')) { S = reset(); location.reload(); }
  };
}

// ── Wire up ────────────────────────────────────────────────────────────
$('#btn-journal').onclick = openJournal;
$('#energy').onclick = () => world.visit('workbench');

renderHud();
setTimeout(() => $('#title-sign').classList.add('gone'), 2200);
if (!S.introDone) {
  setTimeout(async () => {
    await talk('pip', [
      'Oh! You\'re here.',
      'Everyone here can teach you something. Tap Maple, Fennel, Pepper or Sage, or tap Today up top for a bit of everything.',
    ]);
    S.introDone = true; save(S);
    toast('Tap a building to go in. Tap the ground to walk.');
  }, 2600);
}

if (S.introDone && !S.seenTeachHint) setTimeout(() => { toast('Tap Maple, Fennel, Pepper or Sage to learn from them'); S.seenTeachHint = true; save(S); }, 3500);

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  // When an update installs, reload once so every file comes from the new version.
  const hadController = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController && !reloaded) { reloaded = true; location.reload(); }
  });
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((r) => r.update()).catch(() => {});
}
