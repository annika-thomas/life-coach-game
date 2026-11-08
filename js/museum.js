// Museum rooms: small 3D galleries you look into, open at the front.
// Every exhibit has a fixed spot, filled or not, so you can see what's left
// to collect. Rooms are built from a plain spec by app.js:
//   { style, wall, floor, accent, slots: [{ key, filled, level, color, seed, kind }] }
// style: 'paint' | 'paper' | 'still' | 'diagram' (card frames), 'tank' (fish), 'case' (bugs, shells)
import * as THREE from '../vendor/three.module.min.js';

const matCache = new Map();
const M = (color, opts = {}) => {
  const k = color + JSON.stringify(opts);
  if (!matCache.has(k)) matCache.set(k, new THREE.MeshLambertMaterial({ color, ...opts }));
  return matCache.get(k);
};
function rng(seed) {
  let s = 0; for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
const shade = (hex, k) => { const c = new THREE.Color(hex); c.offsetHSL(0, 0, k); return `#${c.getHexString()}`; };

// ── Exhibit pictures, drawn per card so each one is its own ──────────
function picture(style, color, seed) {
  const c = document.createElement('canvas'); c.width = 128; c.height = 100;
  const g = c.getContext('2d'), r = rng(seed), W = 128, H = 100;
  // each picture gets its own hue, so a room full of them doesn't look all one colour
  if (style === 'paint' || style === 'still') { const c0 = new THREE.Color(color); c0.offsetHSL(r() * 0.8 - 0.4, (r() - 0.5) * 0.2, 0); color = `#${c0.getHexString()}`; }
  const pal = [color, shade(color, 0.18), shade(color, -0.18), '#f2c94c', '#3fa7b8', '#fbf6ec', '#e5483b'];
  const pick = () => pal[Math.floor(r() * pal.length)];
  if (style === 'paint') {
    g.fillStyle = shade(color, 0.32); g.fillRect(0, 0, W, H);
    g.fillStyle = shade(color, 0.22); g.fillRect(0, H * (0.45 + r() * 0.25), W, H);
    for (let i = 0; i < 4 + Math.floor(r() * 3); i++) {
      g.fillStyle = pick(); g.globalAlpha = 0.85;
      const x = r() * W, y = r() * H, s = 10 + r() * 28;
      if (r() < 0.5) { g.beginPath(); g.arc(x, y, s / 2, 0, 7); g.fill(); } else g.fillRect(x - s / 2, y - s / 3, s, s * 0.66);
    }
    g.globalAlpha = 1; g.strokeStyle = shade(color, -0.3); g.lineWidth = 3;
    g.beginPath(); g.moveTo(r() * 30, r() * H); g.bezierCurveTo(40, r() * H, 80, r() * H, W - r() * 30, r() * H); g.stroke();
  } else if (style === 'paper') {
    g.fillStyle = '#f6efe0'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#3a3330'; g.fillRect(8, 8, W - 16, 10);
    // a front page: masthead, a picture on one side, text on the other and below
    const left = r() < 0.5, px = left ? 8 : 66;
    g.fillStyle = shade(color, 0.1); g.fillRect(px, 24, 54, 34);
    g.fillStyle = '#b9b0a0';
    for (let i = 0; i < 5; i++) g.fillRect(left ? 68 : 8, 25 + i * 7, 50 * (0.7 + r() * 0.3), 3);
    for (let i = 0; i < 4; i++) g.fillRect(8, 64 + i * 7, W - 16 - r() * 30, 3);
  } else if (style === 'still') {
    g.fillStyle = shade(color, 0.3); g.fillRect(0, 0, W, H);
    g.fillStyle = '#8a5a35'; g.fillRect(0, 68, W, H);
    for (let i = 0; i < 3; i++) {
      const x = 22 + i * 38 + (r() - 0.5) * 10, k = r();
      g.fillStyle = pick();
      if (k < 0.33) { g.fillRect(x - 7, 30, 14, 40); g.fillRect(x - 3, 18, 6, 14); }
      else if (k < 0.66) { g.beginPath(); g.arc(x, 58, 12, 0, 7); g.fill(); }
      else { g.beginPath(); g.moveTo(x - 16, 70); g.lineTo(x + 16, 70); g.lineTo(x + 10, 52); g.closePath(); g.fill(); }
    }
  } else {
    g.fillStyle = '#2f4a3a'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(244,241,232,.25)'; g.lineWidth = 1;
    for (let x = 0; x < W; x += 16) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    g.strokeStyle = '#f4f1e8'; g.lineWidth = 2.5; g.lineCap = 'round';
    const k = r();
    g.beginPath();
    if (k < 0.33) { g.moveTo(10, 85); for (let x = 0; x <= 108; x += 4) g.lineTo(10 + x, 85 - 65 * Math.exp(-((x - 54) ** 2) / (150 + r() * 300))); }
    else if (k < 0.66) { g.moveTo(10, 50); for (let x = 0; x <= 108; x += 4) g.lineTo(10 + x, 50 + Math.sin(x / (6 + r() * 2)) * 25 * Math.exp(-x / 70)); }
    else { for (let i = 0; i < 14; i++) { const x = 12 + r() * 104, y = 12 + r() * 76; g.moveTo(x + 3, y); g.arc(x, y, 3, 0, 7); } }
    g.stroke();
    g.strokeStyle = color; g.beginPath(); g.arc(100, 22, 9, 0, 7); g.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Frame colour by how well the card is remembered (box 1..5); gold at the top.
const FRAME = ['#7d6a55', '#9a6b3e', '#a8773e', '#c0913f', '#d9ad45', '#e8bf4f'];

function fishMesh(color, dark) {
  const g = new THREE.Group();
  const mat = dark ? new THREE.MeshBasicMaterial({ color: '#1d2a33', transparent: true, opacity: 0.55 }) : M(color);
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), mat); body.scale.set(1.5, 0.75, 0.5); g.add(body);
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.16, 4), mat); tail.rotation.z = Math.PI / 2; tail.position.x = -0.28; tail.scale.set(1, 1, 0.4); g.add(tail);
  if (!dark) { const eye = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), M('#1d1d1d')); eye.position.set(0.14, 0.03, 0.07); g.add(eye); }
  return g;
}
function bugMesh(color, dark) {
  const g = new THREE.Group();
  const mat = dark ? new THREE.MeshBasicMaterial({ color: '#2a2622', transparent: true, opacity: 0.5 }) : M(color, { side: THREE.DoubleSide });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.14, 4, 6), dark ? mat : M('#3a3330')); g.add(body);
  for (const s of [-1, 1]) for (const [y, sz] of [[0.04, 0.13], [-0.05, 0.09]]) {
    const w = new THREE.Mesh(new THREE.CircleGeometry(sz, 10), mat); w.position.set(s * sz * 0.85, y, 0); w.scale.set(1, 0.8, 1); g.add(w);
  }
  return g;
}
function shellMesh(color, dark) {
  const mat = dark ? new THREE.MeshBasicMaterial({ color: '#2a2622', transparent: true, opacity: 0.5 }) : M(color);
  const m = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.22, 10), mat); m.rotation.z = -0.9;
  return m;
}

// ── A room ──────────────────────────────────────────────────────────
export function buildRoom(spec, makeCreature) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(shade(spec.wall, -0.25));
  scene.add(new THREE.HemisphereLight('#fff6e8', '#7a6a5a', 1.9));
  const key = new THREE.DirectionalLight('#fff1d6', 1.6); key.position.set(2, 6, 7); scene.add(key);
  const RW = 6.6, RD = 3.6, RH = 6.6;   // room width, depth, height: tall, to suit a phone held upright
  const box = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); scene.add(m); return m; };
  const wall = M(spec.wall), trim = M(shade(spec.wall, -0.2));
  box(RW, 0.1, RD, M(spec.floor), 0, -0.05, 0);
  box(RW, RH, 0.1, wall, 0, RH / 2, -RD / 2);
  for (const s of [-1, 1]) box(0.1, RH, RD, wall, s * RW / 2, RH / 2, 0);
  box(RW, 0.2, 0.12, trim, 0, 0.1, -RD / 2 + 0.06);
  for (const s of [-1, 1]) box(0.12, 0.2, RD, trim, s * (RW / 2 - 0.06), 0.1, 0);
  // a rug in the accent colour
  const rug = box(RW * 0.5, 0.02, RD * 0.45, M(spec.accent), 0, 0.01, 0.4); void rug;

  // Spots: back wall 5 rows x 4 (20), then the side walls, top rows first (28 in all)
  const spots = [];
  const rows = [5.75, 4.6, 3.45, 2.3, 1.15];
  for (const y of rows) for (let i = 0; i < 4; i++) spots.push({ pos: new THREE.Vector3(-2.25 + i * 1.5, y, -RD / 2 + 0.08), rotY: 0 });
  for (const y of rows.slice(0, 4)) for (const s of [-1, 1]) spots.push({ pos: new THREE.Vector3(s * (RW / 2 - 0.08), y, -0.6), rotY: -s * Math.PI / 2 });
  // aquarium and cases sit on stands in rows instead
  const pick = [], swimmers = [], textures = [];
  const isFrames = ['paint', 'paper', 'still', 'diagram'].includes(spec.style);
  spec.slots.forEach((slot, i) => {
    const sp = spots[i];
    if (!sp) return;
    const g = new THREE.Group(); g.position.copy(sp.pos); g.rotation.y = sp.rotY; scene.add(g);
    if (isFrames) {
      const lvl = slot.filled ? Math.max(1, Math.min(5, slot.level || 1)) : 0;
      const fm = lvl >= 4 ? new THREE.MeshLambertMaterial({ color: FRAME[lvl], emissive: '#7a5a10', emissiveIntensity: lvl === 5 ? 0.35 : 0.18 }) : M(FRAME[lvl]);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.92, 0.08), fm); g.add(frame);
      let face;
      if (slot.filled) { const t = picture(spec.style, slot.color, slot.seed); textures.push(t); face = new THREE.MeshBasicMaterial({ map: t }); }
      else face = M(shade(spec.wall, -0.35));
      const pic = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 0.74), face); pic.position.z = 0.045; g.add(pic);
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.03), M(slot.filled ? '#e8d2a8' : shade(spec.wall, -0.1))); plaque.position.set(0, -0.56, 0.02); g.add(plaque);
      frame.userData.slot = i; pic.userData.slot = i; pick.push(frame, pic);
    } else if (spec.style === 'tank') {
      const stand = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.6), M('#6b4a2b')); stand.position.set(0, -0.42, 0.18); g.add(stand);
      const backing = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 0.74), M(slot.filled ? '#2f6f8f' : '#6f8790')); backing.position.set(0, -0.02, -0.06); g.add(backing);
      const water = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.74, 0.5), new THREE.MeshLambertMaterial({ color: slot.filled ? '#6fc6e0' : '#b5c7cc', transparent: true, opacity: slot.filled ? 0.5 : 0.4 }));
      water.position.set(0, -0.02, 0.18); g.add(water);
      const sand = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.48), M('#e8d6a8')); sand.position.set(0, -0.34, 0.18); g.add(sand);
      const f = fishMesh(slot.color, !slot.filled); f.position.set(0, 0, 0.2); f.scale.setScalar(slot.size || 1); g.add(f);
      if (slot.filled) swimmers.push({ f, phase: i * 1.7, base: f.position.clone() });
      water.userData.slot = i; pick.push(water);
    } else {
      const back = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 0.06), M('#efe3c8')); g.add(back);
      const rim = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.88, 0.04), M(slot.filled ? '#8a5a35' : '#7d6a55')); rim.position.z = -0.02; g.add(rim);
      const thing = slot.kind === 'shell' ? shellMesh(slot.color, !slot.filled) : bugMesh(slot.color, !slot.filled);
      thing.position.z = 0.06; thing.scale.setScalar(slot.kind === 'shell' ? 1.6 : 2.2); g.add(thing);
      back.userData.slot = i; pick.push(back);
    }
  });
  // Pip, admiring
  if (makeCreature) { const pip = makeCreature(); pip.position.set(2.5, 0, 1.3); pip.rotation.y = Math.PI * 1.15; pip.scale.setScalar(1.15); scene.add(pip); }

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const fit = (aspect) => {
    camera.aspect = aspect;
    const halfW = RW / 2 + 0.15, halfH = RH / 2 + 0.3;
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const d = Math.max(halfH / t, halfW / (t * aspect));
    camera.position.set(0, RH / 2 + 0.4, d + RD / 2 - 0.4);
    camera.lookAt(0, RH / 2 - 0.1, 0);
    camera.updateProjectionMatrix();
  };
  const update = (dt, time) => {
    for (const s of swimmers) {
      s.f.position.x = s.base.x + Math.sin(time * 0.8 + s.phase) * 0.28;
      s.f.position.y = s.base.y + Math.sin(time * 1.3 + s.phase) * 0.06;
      s.f.rotation.y = Math.cos(time * 0.8 + s.phase) > 0 ? 0 : Math.PI;
    }
  };
  const dispose = () => {
    textures.forEach((t) => t.dispose());
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
  };
  return { scene, camera, fit, update, pick, dispose };
}
