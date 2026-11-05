// Little interactive demos that sit under a card's text: sliders and a
// chart showing how the idea actually behaves. mountDemo(el, cardId).

const INK = '#4a3b33', GRID = '#e8dfc8', GREEN = '#5bbf4a', RED = '#e5483b', BLUE = '#3f7fc4', GOLD = '#f2a33a';

function canvas(el, h = 170) {
  const c = document.createElement('canvas');
  const w = Math.min(560, el.clientWidth || 320);
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = w * dpr; c.height = h * dpr; c.style.width = '100%'; c.style.height = `${h}px`;
  const g = c.getContext('2d'); g.scale(dpr, dpr);
  el.appendChild(c);
  return { c, g, w, h };
}
function slider(el, label, min, max, step, value, fmt = (v) => v) {
  const row = document.createElement('label');
  row.className = 'demo-slider';
  row.innerHTML = `<span><b>${label}</b><i></i></span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}">`;
  el.appendChild(row);
  const input = row.querySelector('input'), out = row.querySelector('i');
  const api = { get value() { return +input.value; }, set value(v) { input.value = v; out.textContent = fmt(+v); }, on: (fn) => { input.addEventListener('input', () => { out.textContent = fmt(+input.value); fn(); }); } };
  out.textContent = fmt(+value);
  return api;
}
function buttons(el, list) {
  const row = document.createElement('div'); row.className = 'demo-buttons';
  for (const [label, fn] of list) { const b = document.createElement('button'); b.className = 'demo-btn'; b.textContent = label; b.onclick = fn; row.appendChild(b); }
  el.appendChild(row);
}
function readout(el) { const p = document.createElement('p'); p.className = 'demo-read'; el.appendChild(p); return p; }
function axes(g, w, h, pad = 24) {
  g.clearRect(0, 0, w, h);
  g.fillStyle = '#fffdf4'; g.fillRect(0, 0, w, h);
  g.strokeStyle = GRID; g.lineWidth = 1;
  for (let i = 1; i < 4; i++) { const y = pad / 2 + ((h - pad) * i) / 4; g.beginPath(); g.moveTo(pad, y); g.lineTo(w - 6, y); g.stroke(); }
  g.strokeStyle = INK; g.lineWidth = 1.5; g.beginPath(); g.moveTo(pad, 6); g.lineTo(pad, h - pad / 2); g.lineTo(w - 6, h - pad / 2); g.stroke();
}
function line(g, pts, color, width = 2.5) { g.strokeStyle = color; g.lineWidth = width; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); }
function label(g, text, x, y, color = INK, align = 'left') { g.fillStyle = color; g.font = '700 11px Nunito, sans-serif'; g.textAlign = align; g.fillText(text, x, y); }
const alive = (el) => el.isConnected;

const DEMOS = {
  // ── Robotics ────────────────────────────────────────────────────────
  'robo-pid': (el) => {
    const { g, w, h } = canvas(el);
    const P = slider(el, 'P (present)', 0, 6, 0.1, 1.2), I = slider(el, 'I (past)', 0, 3, 0.05, 0), Dd = slider(el, 'D (future)', 0, 3, 0.05, 0);
    const out = readout(el);
    const draw = () => {
      // a cart pushed towards position 1, with friction and a steady load pulling it back
      let x = 0, v = 0, integ = 0, prev = 1;
      const pts = [], dt = 0.02, T = 12;
      let peak = 0;
      for (let t = 0; t <= T; t += dt) {
        const err = 1 - x; integ += err * dt;
        const deriv = (err - prev) / dt; prev = err;
        const u = P.value * err + I.value * integ + Dd.value * deriv;
        v += (u - 0.6 * v - 0.4) * dt; x += v * dt;
        peak = Math.max(peak, x);
        pts.push([t, x]);
      }
      const pad = 24, sx = (t) => pad + (t / T) * (w - pad - 8), sy = (y) => h - pad / 2 - (y / 2) * (h - pad);
      axes(g, w, h);
      g.setLineDash([5, 4]); line(g, [[sx(0), sy(1)], [sx(T), sy(1)]], GREEN, 2); g.setLineDash([]);
      label(g, 'target', w - 8, sy(1) - 4, GREEN, 'right');
      line(g, pts.map(([t, y]) => [sx(t), sy(Math.max(-0.2, Math.min(2, y)))]), BLUE);
      const end = pts[pts.length - 1][1], over = Math.max(0, peak - 1) * 100;
      out.textContent = `${over > 2 ? `Overshoots by ${over.toFixed(0)}%. ` : ''}${Math.abs(1 - end) > 0.03 ? `Ends ${Math.round(Math.abs(1 - end) * 100)}% off target${I.value === 0 ? ' (add some I to close the gap)' : ''}.` : 'Settles on target.'}`;
    };
    [P, I, Dd].forEach((s) => s.on(draw));
    buttons(el, [['Too gentle', () => { P.value = 0.5; I.value = 0; Dd.value = 0; draw(); }], ['Jumpy', () => { P.value = 6; I.value = 1.5; Dd.value = 0; draw(); }], ['Well tuned', () => { P.value = 1.5; I.value = 0.2; Dd.value = 1.6; draw(); }]]);
    draw();
  },
  'robo-feedback': (el) => {
    const { g, w, h } = canvas(el);
    const band = slider(el, 'Thermostat dead band', 0.2, 3, 0.1, 1, (v) => `±${v}°C`);
    const out = readout(el);
    const draw = () => {
      let temp = 16, heat = true; const pts = [], set = 20, T = 240;
      let lo = 99, hi = -99;
      for (let t = 0; t <= T; t += 0.5) {
        if (temp > set + band.value) heat = false; if (temp < set - band.value) heat = true;
        temp += ((heat ? 0.12 : 0) - 0.04 * ((temp - 12) / 8)) * 0.5 * 2;
        pts.push([t, temp]); if (t > 60) { lo = Math.min(lo, temp); hi = Math.max(hi, temp); }
      }
      const pad = 24, sx = (t) => pad + (t / T) * (w - pad - 8), sy = (y) => h - pad / 2 - ((y - 14) / 10) * (h - pad);
      axes(g, w, h);
      g.setLineDash([5, 4]); line(g, [[sx(0), sy(set)], [sx(T), sy(set)]], GREEN, 2); g.setLineDash([]);
      label(g, '20°C wanted', w - 8, sy(set) - 4, GREEN, 'right');
      line(g, pts.map(([t, y]) => [sx(t), sy(y)]), RED);
      out.textContent = `The room swings between ${lo.toFixed(1)}°C and ${hi.toFixed(1)}°C. A wider band means fewer on/off clicks but bigger swings.`;
    };
    band.on(draw); draw();
  },
  'robo-dof': (el) => {
    const { g, w, h } = canvas(el, 190);
    const a1 = slider(el, 'Shoulder', -170, 170, 1, 40, (v) => `${v}°`), a2 = slider(el, 'Elbow', -170, 170, 1, -70, (v) => `${v}°`);
    const out = readout(el);
    const trail = [];
    const draw = () => {
      const cx = w / 2, cy = h - 22, L1 = 62, L2 = 50, r = Math.PI / 180;
      const t1 = (a1.value - 90) * r, t2 = t1 + a2.value * r;
      const ex = cx + Math.cos(t1) * L1, ey = cy + Math.sin(t1) * L1, hx = ex + Math.cos(t2) * L2, hy = ey + Math.sin(t2) * L2;
      trail.push([hx, hy]); if (trail.length > 200) trail.shift();
      g.clearRect(0, 0, w, h); g.fillStyle = '#fffdf4'; g.fillRect(0, 0, w, h);
      g.strokeStyle = GRID; g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, L1 + L2, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.arc(cx, cy, L1 - L2, 0, Math.PI * 2); g.stroke();
      g.fillStyle = 'rgba(63,127,196,.25)'; trail.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 2, 0, 7); g.fill(); });
      line(g, [[cx, cy], [ex, ey]], GOLD, 9); line(g, [[ex, ey], [hx, hy]], GOLD, 7);
      g.fillStyle = INK; [[cx, cy], [ex, ey]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 5, 0, 7); g.fill(); });
      g.fillStyle = RED; g.beginPath(); g.arc(hx, hy, 6, 0, 7); g.fill();
      out.textContent = 'Two joints, two degrees of freedom: the hand can reach any point in the ring, but you cannot also choose which way it points. That needs a third joint, and full position plus orientation in 3D needs six.';
    };
    a1.on(draw); a2.on(draw); draw();
  },
  'robo-lidar': (el) => {
    const d = slider(el, 'Distance to the wall', 0.5, 200, 0.5, 10, (v) => `${v} m`);
    const err = slider(el, 'Timing error', 0, 5, 0.1, 1, (v) => `${v} ns`);
    const out = readout(el);
    const draw = () => { const ns = (2 * d.value / 299792458) * 1e9; out.innerHTML = `The pulse comes back after <b>${ns.toFixed(1)} nanoseconds</b>. A ${err.value} ns timing slip puts the wall <b>${(err.value * 15).toFixed(0)} cm</b> off.`; };
    d.on(draw); err.on(draw); draw();
  },
  'robo-mars': (el) => {
    const { g, w, h } = canvas(el, 90);
    const d = slider(el, 'Earth to Mars', 55, 401, 1, 225, (v) => `${v} million km`);
    const out = readout(el);
    const draw = () => {
      const min = (d.value * 1e9) / 299792458 / 60;
      g.clearRect(0, 0, w, h); g.fillStyle = '#1f2a4a'; g.fillRect(0, 0, w, h);
      const x2 = 30 + ((d.value - 55) / 346) * (w - 70) + 10;
      g.fillStyle = '#4fa6d8'; g.beginPath(); g.arc(24, h / 2, 12, 0, 7); g.fill();
      g.fillStyle = '#d9734a'; g.beginPath(); g.arc(x2 + 20, h / 2, 9, 0, 7); g.fill();
      g.setLineDash([4, 6]); line(g, [[38, h / 2], [x2 + 9, h / 2]], '#fff3c4', 2); g.setLineDash([]);
      out.innerHTML = `A command takes <b>${min.toFixed(1)} minutes</b> to arrive, and seeing the result takes another ${min.toFixed(1)}.`;
    };
    d.on(draw); draw();
  },

  // ── Probability ─────────────────────────────────────────────────────
  'stats-clt': (el) => {
    const { g, w, h } = canvas(el, 200);
    const rows = slider(el, 'Rows of pegs', 2, 16, 1, 10);
    const out = readout(el);
    let bins = [], dropping = 0, total = 0;
    const reset = () => { bins = Array(rows.value + 1).fill(0); total = 0; };
    const draw = () => {
      g.clearRect(0, 0, w, h); g.fillStyle = '#fffdf4'; g.fillRect(0, 0, w, h);
      const n = rows.value, bw = (w - 20) / (n + 1), max = Math.max(1, ...bins);
      for (let r = 0; r < n; r++) for (let k = 0; k <= r; k++) { g.fillStyle = '#b8a983'; g.beginPath(); g.arc(w / 2 + (k - r / 2) * bw, 10 + r * (60 / n), 2, 0, 7); g.fill(); }
      bins.forEach((c, i) => { const bh = (c / max) * (h - 90); g.fillStyle = RED; g.fillRect(10 + i * bw + 1, h - 8 - bh, bw - 2, bh); });
      out.textContent = total ? `${total} beads. Each bounces left or right at random at every row, yet together they pile into a bell curve.` : 'Drop some beads.';
    };
    const tick = () => {
      if (!alive(el)) return;
      if (dropping > 0) { for (let k = 0; k < 4 && dropping > 0; k++, dropping--) { let pos = 0; for (let r = 0; r < rows.value; r++) pos += Math.random() < 0.5 ? 1 : 0; bins[pos] += 1; total += 1; } draw(); }
      requestAnimationFrame(tick);
    };
    rows.on(() => { reset(); draw(); });
    buttons(el, [['Drop 100', () => { dropping += 100; }], ['Drop 1,000', () => { dropping += 1000; }], ['Clear', () => { reset(); dropping = 0; draw(); }]]);
    reset(); draw(); tick();
  },
  'stats-birthday': (el) => {
    const { g, w, h } = canvas(el);
    const n = slider(el, 'People in the room', 2, 80, 1, 23);
    const out = readout(el);
    const p = (k) => { let q = 1; for (let i = 0; i < k; i++) q *= (365 - i) / 365; return 1 - q; };
    const draw = () => {
      const pad = 24, sx = (k) => pad + ((k - 1) / 79) * (w - pad - 8), sy = (y) => h - pad / 2 - y * (h - pad);
      axes(g, w, h);
      g.setLineDash([5, 4]); line(g, [[sx(1), sy(0.5)], [sx(80), sy(0.5)]], GOLD, 1.5); g.setLineDash([]);
      line(g, Array.from({ length: 80 }, (_, i) => [sx(i + 1), sy(p(i + 1))]), BLUE);
      g.fillStyle = RED; g.beginPath(); g.arc(sx(n.value), sy(p(n.value)), 6, 0, 7); g.fill();
      label(g, '50%', pad + 4, sy(0.5) - 4, GOLD);
      out.innerHTML = `With ${n.value} people there are ${(n.value * (n.value - 1) / 2).toLocaleString()} pairs, and a <b>${(p(n.value) * 100).toFixed(1)}%</b> chance two share a birthday.`;
    };
    n.on(draw); draw();
  },
  'stats-baserate': (el) => {
    const { g, w, h } = canvas(el, 200);
    const prev = slider(el, 'How common', 0.1, 20, 0.1, 1, (v) => `${v}%`), sens = slider(el, 'Catches the sick', 50, 100, 1, 90, (v) => `${v}%`), fp = slider(el, 'Flags the healthy', 0, 20, 0.5, 9, (v) => `${v}%`);
    const out = readout(el);
    const draw = () => {
      const N = 1000, sick = Math.round(N * prev.value / 100), tp = Math.round(sick * sens.value / 100), fpos = Math.round((N - sick) * fp.value / 100);
      g.clearRect(0, 0, w, h); g.fillStyle = '#fffdf4'; g.fillRect(0, 0, w, h);
      const cols = 50, s = Math.min((w - 8) / cols, (h - 8) / 20);
      for (let i = 0; i < N; i++) {
        const isSick = i < sick, pos = isSick ? i < tp : i - sick < fpos;
        g.fillStyle = isSick ? (pos ? RED : '#f3b6b0') : pos ? GOLD : '#e2d6b6';
        g.fillRect(4 + (i % cols) * s, 4 + Math.floor(i / cols) * s, s - 1, s - 1);
      }
      const ppv = tp + fpos ? (tp / (tp + fpos)) * 100 : 0;
      out.innerHTML = `Of 1,000 people: <b style="color:${RED}">${tp} real positives</b>, <b style="color:${GOLD}">${fpos} false alarms</b>. If you test positive, the chance you have it is <b>${ppv.toFixed(0)}%</b>.`;
    };
    [prev, sens, fp].forEach((s) => s.on(draw)); draw();
  },
  'stats-monty-hall': (el) => {
    const { g, w, h } = canvas(el, 150);
    const doors = slider(el, 'Doors', 3, 100, 1, 3);
    const out = readout(el);
    let stick = 0, sw = 0, games = 0, todo = 0;
    const draw = () => {
      const pad = 24; axes(g, w, h);
      const bars = [['Stick', games ? stick / games : 0, RED], ['Switch', games ? sw / games : 0, GREEN]];
      bars.forEach(([name, v, c], i) => { const x = pad + 30 + i * (w - pad - 60) / 2, bw = (w - pad - 100) / 2; g.fillStyle = c; g.fillRect(x, h - pad / 2 - v * (h - pad - 10), bw, v * (h - pad - 10)); label(g, `${name} ${(v * 100).toFixed(0)}%`, x + bw / 2, h - pad / 2 - v * (h - pad - 10) - 4, INK, 'center'); });
      out.textContent = games ? `${games} games with ${doors.value} doors. Switching wins about ${((doors.value - 1) / doors.value * 100).toFixed(0)}% of the time in theory.` : 'Play some games.';
    };
    const tick = () => {
      if (!alive(el)) return;
      if (todo > 0) { for (let k = 0; k < 10 && todo > 0; k++, todo--) { const car = Math.floor(Math.random() * doors.value), pickd = Math.floor(Math.random() * doors.value); games++; if (pickd === car) stick++; else sw++; } draw(); }
      requestAnimationFrame(tick);
    };
    doors.on(() => { stick = sw = games = 0; draw(); });
    buttons(el, [['Play 100', () => { todo += 100; }], ['Play 1,000', () => { todo += 1000; }]]);
    draw(); tick();
  },
  'stats-large-numbers': (el) => {
    const { g, w, h } = canvas(el);
    const out = readout(el);
    let flips = [], todo = 0;
    const draw = () => {
      const pad = 24, N = Math.max(10, flips.length), sx = (i) => pad + (Math.log10(i + 1) / Math.log10(N + 1)) * (w - pad - 8), sy = (y) => h - pad / 2 - y * (h - pad);
      axes(g, w, h);
      g.setLineDash([5, 4]); line(g, [[pad, sy(0.5)], [w - 6, sy(0.5)]], GREEN, 1.5); g.setLineDash([]);
      let heads = 0; const pts = flips.map((f, i) => { heads += f; return [sx(i), sy(heads / (i + 1))]; });
      if (pts.length) line(g, pts, BLUE, 2);
      const tails = flips.length - heads;
      out.textContent = flips.length ? `${flips.length.toLocaleString()} tosses: ${(heads / flips.length * 100).toFixed(1)}% heads. The gap between heads and tails is ${Math.abs(heads - tails)}, yet the percentage keeps closing in on 50%.` : 'Toss some coins.';
    };
    const tick = () => { if (!alive(el)) return; if (todo > 0) { const k = Math.min(todo, 200); for (let i = 0; i < k; i++) flips.push(Math.random() < 0.5 ? 1 : 0); todo -= k; draw(); } requestAnimationFrame(tick); };
    buttons(el, [['Toss 10', () => { todo += 10; }], ['Toss 1,000', () => { todo += 1000; }], ['Toss 10,000', () => { todo += 10000; }], ['Reset', () => { flips = []; todo = 0; draw(); }]]);
    draw(); tick();
  },
  'stats-small-samples': (el) => {
    const small = slider(el, 'Small hospital births a day', 5, 60, 1, 15), large = slider(el, 'Large hospital births a day', 20, 200, 1, 45);
    const out = readout(el);
    const days = (n) => { let c = 0; for (let d = 0; d < 365; d++) { let boys = 0; for (let i = 0; i < n; i++) boys += Math.random() < 0.5; if (boys / n > 0.6) c++; } return c; };
    const run = () => { out.innerHTML = `In a year, days with over 60% boys: small hospital <b>${days(small.value)}</b>, large hospital <b>${days(large.value)}</b>. Small groups stray from 50% far more often.`; };
    small.on(run); large.on(run); buttons(el, [['Run another year', run]]); run();
  },

  // ── Science ─────────────────────────────────────────────────────────
  'sci-skyblue': (el) => {
    const { g, w, h } = canvas(el, 160);
    const sun = slider(el, 'Sun height', 1, 90, 1, 60, (v) => `${v}°`);
    const out = readout(el);
    const draw = () => {
      // Rayleigh: scattering ~ 1/λ⁴. Longer paths through air at low sun strip out blue.
      const lam = { r: 680, g: 550, b: 450 }, airmass = 1 / Math.max(0.05, Math.sin((sun.value * Math.PI) / 180)), k = 0.11;
      const tr = (l) => Math.exp(-k * airmass * Math.pow(450 / l, 4));
      const sunC = ['r', 'g', 'b'].map((c) => Math.round(255 * tr(lam[c])));
      // sky: blue overhead, with the horizon taking on the colour of the light that gets through
      const e = Math.min(1, sun.value / 35), mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
      const top = mix([38, 52, 110], [79, 143, 224], e), horizon = mix([255, 140, 70], [196, 228, 250], e);
      const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, `rgb(${top.join(',')})`); gr.addColorStop(0.55, `rgb(${mix(top, horizon, 0.5).join(',')})`); gr.addColorStop(1, `rgb(${horizon.join(',')})`);
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
      const sy = h - 18 - (sun.value / 90) * (h - 40);
      g.fillStyle = `rgb(${sunC.join(',')})`; g.beginPath(); g.arc(w * 0.7, sy, 16, 0, 7); g.fill();
      g.fillStyle = '#3f6a3a'; g.fillRect(0, h - 14, w, 14);
      out.textContent = sun.value > 25 ? 'High sun: light crosses little air. Blue scatters most (about 5 times more than red), so it comes at you from every part of the sky.' : 'Low sun: light crosses much more air. Most blue is scattered away before it reaches you, leaving oranges and reds.';
    };
    sun.on(draw); draw();
  },
  'sci-carbondating': (el) => {
    const { g, w, h } = canvas(el);
    const yrs = slider(el, 'Years since death', 0, 50000, 10, 5730, (v) => `${(+v).toLocaleString()} years`);
    const out = readout(el);
    const draw = () => {
      const pad = 24, sx = (t) => pad + (t / 50000) * (w - pad - 8), sy = (y) => h - pad / 2 - y * (h - pad);
      axes(g, w, h);
      line(g, Array.from({ length: 101 }, (_, i) => { const t = i * 500; return [sx(t), sy(Math.pow(0.5, t / 5730))]; }), BLUE);
      for (let k = 1; k <= 3; k++) label(g, `${k * 5730}`, sx(k * 5730), h - 2, INK, 'center');
      const left = Math.pow(0.5, yrs.value / 5730);
      g.fillStyle = RED; g.beginPath(); g.arc(sx(yrs.value), sy(left), 6, 0, 7); g.fill();
      out.innerHTML = `<b>${(left * 100).toFixed(left < 0.01 ? 2 : 1)}%</b> of the original carbon-14 is left. Every 5,730 years it halves again.`;
    };
    yrs.on(draw); draw();
  },
  'sci-icefloats': (el) => {
    const { g, w, h } = canvas(el);
    const temp = slider(el, 'Temperature', -10, 20, 0.5, 4, (v) => `${v}°C`);
    const out = readout(el);
    // standard empirical fit for liquid water density (kg/m³), valid 0 to 40°C
    const rho = (T) => 1000 * (1 - ((T + 288.9414) / (508929.2 * (T + 68.12963))) * Math.pow(T - 3.9863, 2));
    const draw = () => {
      const pad = 24, lo = 995, hi = 1000.5, sx = (t) => pad + ((t + 10) / 30) * (w - pad - 8), sy = (y) => h - pad / 2 - ((y - lo) / (hi - lo)) * (h - pad);
      axes(g, w, h);
      line(g, Array.from({ length: 81 }, (_, i) => { const t = i * 0.25; return [sx(t), sy(rho(t))]; }), BLUE);
      label(g, 'ice: 917 (far below)', sx(-9.5), h - 16, RED);
      line(g, [[sx(-10), h - 13], [sx(0), h - 13]], RED, 3);
      const T = temp.value, d = T < 0 ? 917 : rho(T);
      if (T >= 0) { g.fillStyle = RED; g.beginPath(); g.arc(sx(T), sy(d), 6, 0, 7); g.fill(); }
      out.innerHTML = T < 0 ? 'Frozen: ice is about <b>917 kg per m³</b>, roughly 9% lighter than the water around it, so it floats.' : `Water at ${T}°C: <b>${d.toFixed(2)} kg per m³</b>.${Math.abs(T - 4) < 0.6 ? ' This is the densest it gets.' : ''}`;
    };
    temp.on(draw); draw();
  },
};

export const hasDemo = (id) => !!DEMOS[id];
export function mountDemo(el, id) {
  if (!DEMOS[id] || el.dataset.mounted) return;
  el.dataset.mounted = '1';
  el.innerHTML = '<p class="demo-title">Try it</p>';
  DEMOS[id](el);
}
