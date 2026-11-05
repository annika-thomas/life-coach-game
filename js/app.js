import { World } from './world.js';
import { ITEMS, ITEM_BY_ID } from './items.js';
import { LESSONS, CATEGORIES } from './lessons.js';
import { load, save, reset, dayKey, rhythm } from './state.js';
import { ICON, leafAmt } from './icons.js';
import { QUIZ } from './quiz.js';

let S = load();
const $ = (sel) => document.querySelector(sel);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const commit = () => { save(S); renderHud(); };

const world = new World($('#world'));
if (window.__expose) window.__world = world; // test hook
S.built.forEach((b) => world.placeBuilt(b.id));
world.setEnergy(S.energy);

// ── Cast ───────────────────────────────────────────────────────────────
const CAST = {
  pip:   { name: () => S.creatureName, color: '#3fb3a5' },
  maple: { name: () => 'Maple', color: '#8a5a9e' },
  dot:   { name: () => 'Dot', color: '#e5483b' },
  bram:  { name: () => 'Bram', color: '#3f6fb0' },
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
  if (r.type === 'cat') return { have: S.lessons.filter((l) => l.cat === r.cat).length, need: r.n };
  if (r.type === 'lessons') return { have: S.lessons.length, need: r.n };
  if (r.type === 'log') return { have: S.logs.filter((l) => l.kind === r.kind).length, need: r.n };
  return { have: 0, need: 1 };
}
const isUnlocked = (it) => { const p = progress(it); return p.have >= p.need; };
const affordable = () => ITEMS.filter((i) => isUnlocked(i) && !isBuilt(i) && i.cost <= S.energy);
function reqLabel(it) {
  const r = it.req;
  if (r.type === 'none') return 'Starter plan';
  if (r.type === 'cat') return `${r.n} ${CATEGORIES[r.cat].label} card${r.n > 1 ? 's' : ''}`;
  if (r.type === 'lessons') return `${r.n} cards, any topic`;
  if (r.type === 'log') return `Log ${LOG_KINDS[r.kind].label.toLowerCase()} ${r.n} times`;
  return '';
}
function unlockSource(it) {
  if (it.req.type !== 'cat') return null;
  const first = S.lessons.find((l) => l.cat === it.req.cat);
  return first ? LESSONS.find((l) => l.id === first.id)?.title : null;
}

// ── HUD ────────────────────────────────────────────────────────────────
$('#energy-ico').innerHTML = ICON.leaf;
$('#btn-journal').innerHTML = ICON.journal;
function renderHud() {
  $('.place[data-place=workbench]').classList.toggle('ready', affordable().length > 0);
  const shown = Math.min(S.energy, 10);
  $('#energy-pips').innerHTML = Array.from({ length: 10 }, (_, i) => `<span class="pip ${i < shown ? 'on' : ''}"></span>`).join('');
  $('#energy-num').textContent = S.energy;
  world.setEnergy(S.energy);
}
function renderClock() {
  const d = new Date();
  $('#clock-day').textContent = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
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
    const c = CAST[who];
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
function positionPlaces() {
  const vw = window.innerWidth, vh = window.innerHeight;
  const hide = sheet.classList.contains('open') || dlg.classList.contains('show') || fishing;
  for (const el of places) {
    el.classList.toggle('hidden', hide);
    if (hide) continue;
    const p = world.stationScreenPos(el.dataset.place);
    // Off-screen places stick to the nearest edge as a small tab you can still tap.
    const top = 120, bottom = vh - 40, left = 46, right = vw - 46;
    const off = !p.visible || p.x < left || p.x > right || p.y < top || p.y > bottom;
    const x = Math.max(left + 14, Math.min(right - 14, p.x)), y = Math.max(top, Math.min(bottom, p.y));
    el.classList.toggle('edge', off);
    el.dataset.dir = p.x > right ? 'r' : p.x < left ? 'l' : p.y < top ? 'u' : 'd';
    el.style.transform = `translate(${Math.round(off ? x : p.x)}px, ${Math.round(off ? y : p.y)}px) translate(-50%, ${off ? '-50%' : '-100%'})`;
  }
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
         'Read a card, and I\'ll send a little energy over to ' + S.creatureName + '. The fish at the dock like to ask about what you\'ve read.']
      : [pick([
          `I just shelved something on ${topic}. Want a look?`,
          'Quiet day. Perfect for reading.',
          `There's a card on ${topic} I think you'll want to argue with.`,
          'Back again? Good. I saved you a seat.',
        ])];
    if (await talk('maple', lines, ['Read something', 'Maybe later']) === 0) setTimeout(() => openLessons(next), 200);
  },
  async gym() {
    const lines = firstVisit('gym')
      ? ['Hey hey! Name\'s Dot. This is my yard.',
         'Worked out, went for a walk, cooked a real meal, read a real book? It all counts. Tell me and ' + S.creatureName + ' gets 2 energy.']
      : [pick(['What did you get up to today?', 'Moved your body? Tell me everything.', 'Every bit counts. What was it?', 'Ready when you are, champ.'])];
    if (await talk('dot', lines, ['Log something', 'Not yet']) === 0) setTimeout(openLog, 200);
  },
  async dock() {
    const rev = nextReview();
    const line = !rev ? 'The water is calm.' : rev.due ? 'Something is moving under the water.' : 'The water is calm. Something might still bite.';
    if (await talk('note', [line], ['Cast a line', 'Leave']) === 0) setTimeout(goFishing, 200);
  },
  async workbench() {
    const can = affordable();
    const first = firstVisit('workbench');
    const lines = first
      ? ['Bram. I build things.', 'Bring me energy and I\'ll turn it into something for the island. ' + S.creatureName + ' does the hammering.']
      : [];
    if (can.length) lines.push(pick([`You've got enough for the ${can[0].name.toLowerCase()}. Want to see the plans?`, 'Energy in the pocket. Let\'s make something.', `I could knock out a ${can[0].name.toLowerCase()} today.`]));
    else lines.push(pick(['Not enough energy for anything yet. Maple\'s library is a good place to start.', 'Running a bit low. Dot\'s yard pays double, you know.', 'Nothing we can afford yet. Have a look anyway?']));
    if (await talk('bram', lines, ['See the plans', 'Later']) === 0) setTimeout(openBuild, 200);
  },
};
world.on('station', (id) => VISIT[id]());

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
world.on('creatureTap', () => talk('pip', [pipLine()]));
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
let knownUnlocked = new Set(ITEMS.filter(isUnlocked).map((i) => i.id));
function newlyUnlocked() {
  const now = ITEMS.filter(isUnlocked).map((i) => i.id).filter((id) => !knownUnlocked.has(id));
  now.forEach((id) => knownUnlocked.add(id));
  if (now.length) toast(`New plan at the workbench: ${ITEM_BY_ID[now[0]].name}`);
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

// A card: read it, tap "Got it". Maple's question is optional and folded
// away. Quizzing happens later, at the dock.
function cardHtml(l) {
  const c = CATEGORIES[l.cat];
  const prior = S.lessons.some((x) => x.id === l.id);
  const unlock = l.unlocks && ITEM_BY_ID[l.unlocks];
  return `<article class="card" data-id="${l.id}">
    <div class="card-tag" style="--c:${c.color}">${c.label}${prior ? ' · reread' : ''}</div>
    <h3>${esc(l.title)}</h3>
    ${l.body.map((p) => `<p>${esc(p)}</p>`).join('')}
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
  </article>`;
}
function openLessons(first) {
  openSheet('Library', `${chipsHtml()}<div id="feed"></div>`, 'lessons');
  const feed = $('#feed');
  const shown = [];
  let done = 0;
  onClose = () => { if (done) talk('maple', [done > 1 ? `${done} cards! The fish at the dock will be asking about those.` : pick(['Good reading. The fish might quiz you on that later.', 'I\'ll keep a few more on the shelf for you.'])]); };
  const append = (l = nextLesson(shown)) => {
    shown.push(l.id);
    feed.insertAdjacentHTML('beforeend', cardHtml(l));
    wire(feed.lastElementChild, l);
  };
  const wire = (card, l) => {
    const ta = card.querySelector('textarea');
    const btn = card.querySelector('.answer');
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
      card.querySelector('.card-actions').innerHTML = `<div class="answered">${ICON.check} Got it. The fish at the dock will ask about this one.</div>`;
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
const BOX_DAYS = { 1: 1 / 48, 2: 1, 3: 3, 4: 7, 5: 21 };
S.reviews = S.reviews || {};
S.fish = S.fish || [];
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
  return { id, box: r.box, q: qs[r.n % qs.length], due: !!due.length };
}
function grade(id, right) {
  const r = S.reviews[id];
  r.box = right ? Math.min(5, r.box + 1) : 1;
  r.due = Date.now() + (right ? BOX_DAYS[r.box] : 1 / 144) * DAY;
  r.n += 1; r.last = Date.now();
}

// ── Fishing ────────────────────────────────────────────────────────────
// Cast, wait for a bite, reel it in, then answer a question about something
// you read to land the fish. Older, well-known cards hook rarer fish.
const FISH = [
  { id: 'minnow',   name: 'Minnow',        tier: 0, color: '#9fb7c9' },
  { id: 'bluegill', name: 'Bluegill',      tier: 0, color: '#5b8fd6' },
  { id: 'perch',    name: 'Perch',         tier: 0, color: '#d8b24a' },
  { id: 'sardine',  name: 'Sardine',       tier: 0, color: '#a9c3d6' },
  { id: 'bass',     name: 'Sea Bass',      tier: 1, color: '#6d7f8f' },
  { id: 'mackerel', name: 'Mackerel',      tier: 1, color: '#4f8fa8' },
  { id: 'snapper',  name: 'Red Snapper',   tier: 1, color: '#e0604a' },
  { id: 'puffer',   name: 'Pufferfish',    tier: 1, color: '#e8c35a' },
  { id: 'trout',    name: 'Rainbow Trout', tier: 2, color: '#e88fb0' },
  { id: 'koi',      name: 'Koi',           tier: 2, color: '#f08a3c' },
  { id: 'moonfish', name: 'Moonfish',      tier: 2, color: '#c9d3ff' },
  { id: 'carp',     name: 'Golden Carp',   tier: 2, color: '#f2c94c' },
];
const TIER = [
  { label: 'common', speed: 0.55, zone: 0.34 },
  { label: 'uncommon', speed: 0.85, zone: 0.28 },
  { label: 'rare', speed: 1.2, zone: 0.23 },
];
function rollFish(box) {
  const r = Math.random();
  const tier = box >= 4 ? (r < 0.6 ? 2 : 1) : box === 3 ? (r < 0.15 ? 2 : r < 0.85 ? 1 : 0) : (r < 0.15 ? 1 : 0);
  return pick(FISH.filter((f) => f.tier === tier));
}
const fishSvg = (color, known = true) => `<svg class="fishsvg" viewBox="0 0 64 36"><path d="M8 18c8-12 26-14 38-6l10-8v28l-10-8C34 32 16 30 8 18z" fill="${known ? color : '#cfc6b0'}" stroke="#4a3b33" stroke-width="3" stroke-linejoin="round"/>${known ? '<circle cx="18" cy="16" r="2.6" fill="#2a2320"/>' : ''}</svg>`;

const fishUI = $('#fish'), hint = $('#fish-hint'), reelEl = $('#reel'), zoneEl = $('#zone'), fishyEl = $('#fishy'), meterEl = $('#meter');
let fishing = false;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
// resolves true if tapped within ms
function tapWithin(ms) {
  return new Promise((resolve) => {
    const t = setTimeout(() => { fishUI.onpointerdown = null; resolve(false); }, ms);
    fishUI.onpointerdown = () => { clearTimeout(t); fishUI.onpointerdown = null; resolve(true); };
  });
}
// Hold to raise the green bar; keep the fish inside it until the meter fills.
function reel(tier) {
  return new Promise((resolve) => {
    const T = TIER[tier];
    reelEl.classList.add('show');
    zoneEl.style.height = `${T.zone * 100}%`;
    let zone = 0.1, vel = 0, fish = 0.5, target = 0.5, nextTarget = 0, progress = 0.3, holding = false, last = performance.now();
    fishUI.onpointerdown = () => { holding = true; };
    fishUI.onpointerup = fishUI.onpointercancel = () => { holding = false; };
    const step = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      vel += (holding ? 2.6 : -2.2) * dt;
      vel = Math.max(-1.2, Math.min(1.2, vel));
      zone += vel * dt;
      if (zone < 0) { zone = 0; vel = Math.max(0, vel) * -0.3; }
      if (zone > 1 - T.zone) { zone = 1 - T.zone; vel = 0; }
      nextTarget -= dt;
      if (nextTarget <= 0) { target = Math.random(); nextTarget = 0.5 + Math.random() * (1.4 - T.speed * 0.6); }
      fish += Math.sign(target - fish) * Math.min(Math.abs(target - fish), T.speed * dt);
      const inside = fish >= zone && fish <= zone + T.zone;
      progress += (inside ? 0.32 : -0.22) * dt;
      zoneEl.style.bottom = `${zone * 100}%`;
      zoneEl.classList.toggle('on', inside);
      fishyEl.style.bottom = `calc(${fish * 100}% - 12px)`;
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
async function goFishing() {
  if (fishing) return;
  const rev = nextReview();
  if (!rev) {
    await talk('note', ['Nothing is biting yet.', 'Fish here bite on things you\'ve read. Maple\'s library is up the road.']);
    return;
  }
  fishing = true;
  const fish = rollFish(rev.box);
  fishUI.classList.add('show');
  world.fishStart();
  hint.textContent = 'Wait for a bite...';
  await wait(1800 + Math.random() * 3500);
  world.fishBite(true);
  hint.textContent = 'Tap!';
  hint.classList.add('bite');
  const hooked = await tapWithin(1600);
  hint.classList.remove('bite');
  world.fishBite(false);
  let landed = false;
  if (hooked) {
    hint.textContent = 'Hold to raise the bar. Keep the fish inside it.';
    landed = await reel(fish.tier);
  }
  hint.textContent = '';
  fishUI.classList.remove('show');
  if (!hooked || !landed) {
    world.fishEnd(null);
    fishing = false;
    const again = await talk('note', [hooked ? 'It got away!' : 'Too slow. It took the bait and left.'], ['Cast again', 'Done']);
    if (again === 0) goFishing();
    return;
  }
  // On the line: answer to land it.
  const q = rev.q;
  const opts = shuffle([q.a, ...q.w]);
  const pickIdx = await talk('note', [`Something ${TIER[fish.tier].label} is on the line! ${q.q}`], opts);
  const right = pickIdx !== null && opts[pickIdx] === q.a;
  grade(rev.id, right);
  const lesson = LESSONS.find((l) => l.id === rev.id);
  if (right) {
    const first = !S.fish.some((f) => f.species === fish.id);
    S.fish.push({ species: fish.id, card: rev.id, ts: Date.now() });
    S.energy += 1;
    commit();
    floatReward(1);
    world.fishEnd(fish.color);
    fishing = false;
    const again = await talk('note', [`You caught a ${fish.name}!${first ? ' New to your collection.' : ''}`, q.why], ['Cast again', 'Done']);
    if (again === 0) goFishing();
  } else {
    save(S);
    world.fishEnd(null);
    fishing = false;
    const again = await talk('note', ['The fish slipped away!', `The answer was "${q.a}". ${q.why}`, `This one's from "${lesson.title}". It'll come back around soon.`], ['Cast again', 'Done']);
    if (again === 0) goFishing();
  }
}

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
    <p class="lead">What did you do? Honour system.</p>
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
function openBuild() {
  const rows = ITEMS.map((it) => {
    const built = isBuilt(it), unlocked = isUnlocked(it), p = progress(it);
    const src = unlockSource(it);
    const state = built ? 'built' : unlocked ? (S.energy >= it.cost ? 'ready' : 'short') : 'locked';
    const note = built ? 'On the island'
      : unlocked ? (src ? `From "${esc(src)}"` : reqLabel(it))
      : `${reqLabel(it)} (${p.have}/${p.need})`;
    return { state, html: `<button class="item ${state}" data-id="${it.id}">
      <span class="thumb"><img alt="" src="${world.thumbnail(it.id)}">${state === 'locked' ? `<span class="lock">${ICON.lock}</span>` : ''}</span>
      <span class="item-text"><b>${unlocked || built ? esc(it.name) : '???'}</b><small>${note}</small></span>
      <span class="item-cost">${built ? ICON.check : leafAmt(it.cost)}</span>
    </button>` };
  });
  const order = { ready: 0, short: 1, built: 2, locked: 3 };
  rows.sort((a, b) => order[a.state] - order[b.state]);
  openSheet('Workbench', `<p class="lead">You have ${leafAmt(S.energy)} to spend.</p><div class="items">${rows.map((r) => r.html).join('')}</div>`, 'build');
  sheet.querySelectorAll('.item').forEach((b) => b.onclick = () => {
    const it = ITEM_BY_ID[b.dataset.id];
    if (b.classList.contains('built')) return toast(`${it.name} is already on the island.`);
    if (b.classList.contains('locked')) return toast(`To unlock: ${reqLabel(it)}`);
    if (b.classList.contains('short')) return toast(`You need ${it.cost - S.energy} more energy.`);
    S.energy -= it.cost;
    S.built.push({ id: it.id, ts: Date.now() });
    commit();
    onClose = () => {
      talk('bram', [pick([`One ${it.name.toLowerCase()}, coming up.`, 'Right. Let\'s get to work.'])]);
      world.build(it.id, () => setTimeout(() => talk('pip', [pick(['Ta-da!', 'Done! What do you think?', 'Look at that.'])]), 300));
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
    <div class="catbars">${cats.map(({ c, n }) => `<span class="catbar" style="--c:${c.color}"><i></i>${c.label} ${n}</span>`).join('')}</div>
    <h4>Fish caught</h4>
    <div class="fishgrid">${FISH.map((f) => { const n = S.fish.filter((x) => x.species === f.id).length; return `<div class="fishcell ${n ? '' : 'unknown'}">${fishSvg(f.color, n > 0)}<small>${n ? `${esc(f.name)} ×${n}` : '???'}</small></div>`; }).join('')}</div>
    <h4>Your answers</h4>
    <div class="answers">${S.lessons.length ? S.lessons.slice().reverse().map((a) => {
      const l = LESSONS.find((x) => x.id === a.id);
      if (!a.answer) return '';
      return l ? `<details><summary><i style="background:${CATEGORIES[a.cat].color}"></i>${esc(l.title)}</summary><p class="q">${esc(l.question)}</p><p class="a">${esc(a.answer)}</p></details>` : '';
    }).join('') : '<p class="lead">Nothing yet. Your answers collect here.</p>'}</div>
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
      'The island\'s a little empty. I can build things, but only with energy.',
      'Maple at the library and Dot at the gym can help with that.',
    ]);
    S.introDone = true; save(S);
    toast('Tap a sign to visit. Tap the ground to walk.');
  }, 2600);
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  // When an update installs, reload once so every file comes from the new version.
  const hadController = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController && !reloaded) { reloaded = true; location.reload(); }
  });
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((r) => r.update()).catch(() => {});
}
