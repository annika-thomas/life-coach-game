import { World } from './world.js';
import { ITEMS, ITEM_BY_ID } from './items.js';
import { LESSONS, CATEGORIES } from './lessons.js';
import { load, save, reset, dayKey, rhythm } from './state.js';

let S = load();
const $ = (sel) => document.querySelector(sel);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const commit = () => { save(S); renderHud(); };

const world = new World($('#world'));
S.built.forEach((b) => world.placeBuilt(b.id));
world.setEnergy(S.energy);

// ── HUD ────────────────────────────────────────────────────────────────
function renderHud() {
  const pips = $('#energy-pips');
  const shown = Math.min(S.energy, 10);
  pips.innerHTML = Array.from({ length: 10 }, (_, i) => `<span class="pip ${i < shown ? 'on' : ''}"></span>`).join('');
  $('#energy-num').textContent = S.energy;
  world.setEnergy(S.energy);
}
function renderClock() {
  const d = new Date();
  $('#clock-day').textContent = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  $('#clock-time').textContent = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const h = d.getHours();
  $('#clock-icon').textContent = h < 6 || h >= 20 ? '🌙' : h < 17 ? '☀️' : '🌅';
}
renderClock(); setInterval(renderClock, 15000);

// ── Speech bubble ─────────────────────────────────────────────────────
const bubble = $('#bubble');
let bubbleTimer;
function say(text, ms = 4200) {
  bubble.innerHTML = `<b>${esc(S.creatureName)}</b>${esc(text)}`;
  bubble.classList.add('show');
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.remove('show'), ms);
}
world.onFrame = () => {
  if (!bubble.classList.contains('show')) return;
  const p = world.creatureScreenPos();
  const half = bubble.offsetWidth / 2, vw = window.innerWidth;
  const x = Math.max(half + 8, Math.min(vw - half - 8, p.x));
  const y = Math.max(bubble.offsetHeight + 90, p.y);
  bubble.style.setProperty('--tail', `${Math.round(p.x - x)}px`);
  bubble.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px) translate(-50%, -100%)`;
};
function idleLine() {
  const last = S.lessons[S.lessons.length - 1];
  const lesson = last && LESSONS.find((l) => l.id === last.id);
  if (S.energy <= 0) return pick([
    'Zzz… a lesson or a walk would wake me up.',
    'Napping. Whenever you feel like it — no rush.',
    '…mm? Teach me something and I\'ll get building.',
  ]);
  const affordable = ITEMS.filter((i) => isUnlocked(i) && !isBuilt(i) && i.cost <= S.energy);
  return pick([
    `I've got ${S.energy} energy! Want me to build something?`,
    affordable.length ? `I could make a ${affordable[0].name.toLowerCase()} right now…` : 'Saving up for something bigger!',
    lesson ? `Still thinking about "${lesson.title}"…` : 'What should we learn first?',
    'What a lovely day on the island.',
  ]);
}
const pick = (a) => a[Math.floor(Math.random() * a.length)];
world.on('creatureTap', () => say(idleLine()));
world.on('itemTap', (id) => {
  const it = ITEM_BY_ID[id];
  const src = unlockSource(it);
  say(`${it.emoji} ${it.name}${src ? ` — from "${src}"` : ''}`);
});

// ── Unlock logic ──────────────────────────────────────────────────────
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
function reqLabel(it) {
  const r = it.req;
  if (r.type === 'none') return 'Starter';
  if (r.type === 'cat') return `${CATEGORIES[r.cat].emoji} ${CATEGORIES[r.cat].label} · ${r.n} lesson${r.n > 1 ? 's' : ''}`;
  if (r.type === 'lessons') return `📖 Any ${r.n} lessons`;
  if (r.type === 'log') return `${LOG_KINDS[r.kind].emoji} ${LOG_KINDS[r.kind].label} ×${r.n}`;
  return '';
}
function unlockSource(it) {
  if (it.req.type !== 'cat') return null;
  const first = S.lessons.find((l) => l.cat === it.req.cat);
  return first ? LESSONS.find((l) => l.id === first.id)?.title : null;
}

// ── Sheets ─────────────────────────────────────────────────────────────
const sheet = $('#sheet');
function openSheet(title, html, cls = '') {
  $('#sheet-title').textContent = title;
  $('#sheet-body').innerHTML = html;
  sheet.className = `sheet open ${cls}`;
  $('#scrim').classList.add('show');
  $('#sheet-body').scrollTop = 0;
}
function closeSheet() {
  sheet.classList.remove('open');
  $('#scrim').classList.remove('show');
}
$('#sheet-close').onclick = closeSheet;
$('#scrim').onclick = closeSheet;

function floatReward(text, fromEl) {
  const r = (fromEl || $('#energy')).getBoundingClientRect();
  const f = document.createElement('div');
  f.className = 'reward';
  f.textContent = text;
  f.style.left = `${r.left + r.width / 2}px`;
  f.style.top = `${r.top}px`;
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1400);
  $('#energy').classList.remove('bump'); void $('#energy').offsetWidth; $('#energy').classList.add('bump');
}

// ── Lessons: the endless feed ─────────────────────────────────────────
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
    `<button class="chip ${filters.has(k) ? 'on' : ''}" data-cat="${k}" style="--c:${c.color}">${c.emoji} ${c.label}</button>`).join('')}</div>`;
}
function cardHtml(l) {
  const c = CATEGORIES[l.cat];
  const prior = S.lessons.filter((x) => x.id === l.id).length;
  const unlock = l.unlocks && ITEM_BY_ID[l.unlocks];
  return `<article class="card" data-id="${l.id}">
    <div class="card-tag" style="--c:${c.color}">${c.emoji} ${c.label}${prior ? ' · revisit' : ''}</div>
    <h3>${esc(l.title)}</h3>
    ${l.body.map((p) => `<p>${esc(p)}</p>`).join('')}
    ${unlock ? `<div class="card-unlock">Counts toward: ${unlock.emoji} ${esc(unlock.name)}</div>` : ''}
    <div class="asks"><span class="asks-who">${esc(S.creatureName)} asks:</span> ${esc(l.question)}</div>
    <textarea rows="3" placeholder="Your take — a sentence or two is plenty…"></textarea>
    <div class="card-actions">
      <button class="btn ghost skip">Skip</button>
      <button class="btn primary answer" disabled>Answer · +1 ⚡</button>
    </div>
  </article>`;
}
function openLessons() {
  openSheet('Learn', `${chipsHtml()}<div id="feed"></div>`, 'lessons');
  const feed = $('#feed');
  const shown = [];
  const append = () => {
    const l = nextLesson(shown);
    shown.push(l.id);
    feed.insertAdjacentHTML('beforeend', cardHtml(l));
    wire(feed.lastElementChild, l);
  };
  const wire = (card, l) => {
    const ta = card.querySelector('textarea');
    const btn = card.querySelector('.answer');
    ta.addEventListener('input', () => { btn.disabled = ta.value.trim().length < 3; });
    btn.onclick = () => {
      const answer = ta.value.trim();
      S.lessons.push({ id: l.id, cat: l.cat, answer, ts: Date.now() });
      S.skipped = S.skipped.filter((x) => x !== l.id);
      S.energy += 1;
      commit();
      floatReward('+1 ⚡', btn);
      card.classList.add('done');
      card.querySelector('.card-actions').innerHTML = `<div class="answered">✓ Answered — ${esc(S.creatureName)} has ${S.energy} energy</div>`;
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
  append();
  sheet.querySelectorAll('.chip').forEach((ch) => ch.onclick = () => {
    const k = ch.dataset.cat;
    filters.has(k) ? filters.delete(k) : filters.add(k);
    ch.classList.toggle('on');
    // replace the unanswered card with one matching the new filter
    const open = feed.querySelector('.card:not(.done)');
    if (open) open.remove();
    append();
  });
}

let knownUnlocked = new Set(ITEMS.filter(isUnlocked).map((i) => i.id));
function newlyUnlocked() {
  const now = ITEMS.filter(isUnlocked).map((i) => i.id).filter((id) => !knownUnlocked.has(id));
  now.forEach((id) => knownUnlocked.add(id));
  if (now.length) {
    const it = ITEM_BY_ID[now[0]];
    toast(`New build unlocked: ${it.emoji} ${it.name}`);
  }
}
function toast(t) {
  const el = $('#toast');
  el.textContent = t;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

// ── Log real-world actions ────────────────────────────────────────────
const LOG_KINDS = {
  workout: { label: 'Workout', emoji: '🏋️' },
  walk:    { label: 'Walk',    emoji: '🚶' },
  cooked:  { label: 'Cooked',  emoji: '🍳' },
  read:    { label: 'Read',    emoji: '📖' },
};
function weekStrip() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const monday = new Date(today); monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const logged = new Map();
  S.logs.forEach((l) => { const k = dayKey(l.ts); logged.set(k, [...(logged.get(k) || []), l.kind]); });
  return `<div class="week">${Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday); d.setDate(monday.getDate() + i);
    const kinds = logged.get(dayKey(d)) || [];
    const isToday = d.getTime() === today.getTime();
    return `<div class="day ${kinds.length ? 'on' : ''} ${isToday ? 'today' : ''}">
      <span>${'MTWTFSS'[i]}</span><i>${kinds.length ? LOG_KINDS[kinds[kinds.length - 1]].emoji : ''}</i></div>`;
  }).join('')}</div>`;
}
function openLog() {
  let kind = null;
  const r = rhythm(S);
  openSheet('I moved', `
    <p class="lead">Did something real? Tell ${esc(S.creatureName)}. Honour system — it's your island.</p>
    <div class="tiles">${Object.entries(LOG_KINDS).map(([k, v]) =>
      `<button class="tile" data-kind="${k}"><span>${v.emoji}</span>${v.label}</button>`).join('')}</div>
    <input id="log-note" class="note" placeholder="Optional note — 5k loop, pasta from scratch…" maxlength="120">
    <button id="log-go" class="btn primary wide" disabled>I did it · +2 ⚡</button>
    <h4>This week</h4>
    ${weekStrip()}
    ${r > 1 ? `<p class="rhythm">🌱 ${r} days in a row of showing up.</p>` : ''}
    <div class="recent">${S.logs.slice(-5).reverse().map((l) =>
      `<div class="recent-row">${LOG_KINDS[l.kind].emoji} ${LOG_KINDS[l.kind].label}${l.note ? ` — ${esc(l.note)}` : ''}<span>${new Date(l.ts).toLocaleDateString(undefined, { weekday: 'short' })}</span></div>`).join('')}</div>
  `, 'log');
  sheet.querySelectorAll('.tile').forEach((t) => t.onclick = () => {
    sheet.querySelectorAll('.tile').forEach((x) => x.classList.remove('on'));
    t.classList.add('on'); kind = t.dataset.kind; $('#log-go').disabled = false;
  });
  $('#log-go').onclick = () => {
    S.logs.push({ kind, note: $('#log-note').value.trim(), ts: Date.now() });
    S.energy += 2;
    commit();
    floatReward('+2 ⚡', $('#log-go'));
    newlyUnlocked();
    closeSheet();

    setTimeout(() => { world.hop(); say(pick(['You moved! I feel so awake now.', 'Real-world energy is the best kind. +2!', 'Nice. Shall we build something?'])); }, 350);
  };
}

// ── Build ──────────────────────────────────────────────────────────────
function openBuild() {
  const rows = ITEMS.map((it) => {
    const built = isBuilt(it), unlocked = isUnlocked(it), p = progress(it);
    const src = unlockSource(it);
    const state = built ? 'built' : unlocked ? (S.energy >= it.cost ? 'ready' : 'short') : 'locked';
    const note = built ? 'Built ✓'
      : unlocked ? (src ? `Unlocked by “${esc(src)}”` : reqLabel(it))
      : `${reqLabel(it)} — ${p.have}/${p.need}`;
    return `<button class="item ${state}" data-id="${it.id}" ${state === 'locked' || state === 'short' ? 'aria-disabled="true"' : ''}>
      <span class="item-emoji">${unlocked || built ? it.emoji : '🔒'}</span>
      <span class="item-text"><b>${esc(it.name)}</b><small>${note}</small></span>
      <span class="item-cost">${built ? '' : `${it.cost} ⚡`}</span>
    </button>`;
  });
  const order = { ready: 0, short: 1, built: 2, locked: 3 };
  rows.sort((a, b) => order[a.match(/class="item (\w+)"/)[1]] - order[b.match(/class="item (\w+)"/)[1]]);
  openSheet('Build', `<p class="lead">${esc(S.creatureName)} has <b>${S.energy} ⚡</b>. Learn things to unlock more.</p><div class="items">${rows.join('')}</div>`, 'build');
  sheet.querySelectorAll('.item').forEach((b) => b.onclick = () => {
    const it = ITEM_BY_ID[b.dataset.id];
    if (b.classList.contains('built')) { closeSheet(); say(`${it.emoji} The ${it.name.toLowerCase()}!`); return; }
    if (b.classList.contains('locked')) { toast(`Locked — ${reqLabel(it)}`); return; }
    if (b.classList.contains('short')) { toast(`Needs ${it.cost - S.energy} more ⚡`); return; }
    S.energy -= it.cost;
    S.built.push({ id: it.id, ts: Date.now() });
    commit();
    closeSheet();
    say(`On it! One ${it.name.toLowerCase()} coming up…`, 2500);
    world.build(it.id, () => setTimeout(() => say(`Ta-da! ${it.emoji}`), 300));
  });
}

// ── Journal (your past answers + settings) ────────────────────────────
function openJournal() {
  const cats = Object.entries(CATEGORIES).map(([k, c]) => ({ k, c, n: S.lessons.filter((l) => l.cat === k).length }));
  openSheet('Journal', `
    <div class="stats">
      <div><b>${S.lessons.length}</b><small>lessons</small></div>
      <div><b>${S.logs.length}</b><small>real things</small></div>
      <div><b>${S.built.length}</b><small>built</small></div>
    </div>
    <div class="catbars">${cats.map(({ c, n }) => `<span class="catbar" style="--c:${c.color}">${c.emoji} ${n}</span>`).join('')}</div>
    <h4>Your answers</h4>
    <div class="answers">${S.lessons.length ? S.lessons.slice().reverse().map((a) => {
      const l = LESSONS.find((x) => x.id === a.id);
      return l ? `<details><summary>${CATEGORIES[a.cat].emoji} ${esc(l.title)}</summary><p class="q">${esc(l.question)}</p><p class="a">${esc(a.answer)}</p></details>` : '';
    }).join('') : '<p class="lead">Nothing yet — your answers will collect here.</p>'}</div>
    <h4>Settings</h4>
    <label class="field">Creature's name <input id="name" value="${esc(S.creatureName)}" maxlength="16"></label>
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
$('#btn-learn').onclick = openLessons;
$('#btn-moved').onclick = openLog;
$('#btn-build').onclick = openBuild;
$('#btn-journal').onclick = openJournal;
$('#energy').onclick = openBuild;

renderHud();
setTimeout(() => $('#title-sign').classList.add('gone'), 2200);
setTimeout(() => say(S.lessons.length || S.logs.length ? idleLine() : `Hi! I'm ${S.creatureName}. Feed me a lesson or a walk and I'll build us an island.`, 6000), 2600);

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
