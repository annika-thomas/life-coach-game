// The island: a tilted-camera 2.5D tile diorama rendered with three.js.
// All models are built from primitives + small canvas textures, so there are
// no external art assets to load.
import * as THREE from '../vendor/three.module.min.js';
import { ITEMS, ITEM_BY_ID } from './items.js';

// ── Map ────────────────────────────────────────────────────────────────
// H plateau (observatory hill)  . grass   # dirt path   c cobbles (town square)
// S stairs   s sand   w water (sea + fish pond)
const MAP = [
  'HHHHHHHHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHHHHHHHH',
  'HHHHHSHHHHHHHHHHSHHHHH',
  '.....#..........#.....',
  '.....#..........#.....',
  '.....#....#.....#.....',
  '.....#..ccccc...#.....',
  '.....#..ccccc...#.....',
  '.....#....#.....#.....',
  '..##################..',
  '..........#...........',
  '..........#...........',
  '..........#...........',
  '..........#....www....',
  '..........#....www....',
  '..........#...........',
  'ss........#.......ssss',
  'ssssssssssssssssssssss',
  'wwwwwwwwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwwwwwwwww',
];
const W = MAP[0].length;
const D = MAP.length;
const tileAt = (x, z) => (x < 0 || z < 0 || x >= W || z >= D ? 'w' : MAP[z][x]);
const HEIGHT = { H: 1, '.': 0, '#': 0, c: 0, S: 0.5, s: -0.2, w: -0.8 };
// The fishing dock: wooden planks over the sand and water you can walk on.
const DOCK = new Set(['10,19', '10,20', '10,21']);
const tileH = (x, z) => (DOCK.has(`${x},${z}`) ? -0.1 : HEIGHT[tileAt(x, z)]);

const HOME = [10, 9];    // where Pip stands: the town square in front of the cottage

// ── Small helpers ──────────────────────────────────────────────────────
const matCache = new Map();
function M(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) matCache.set(key, new THREE.MeshLambertMaterial({ color, ...opts }));
  return matCache.get(key);
}
function mesh(geo, mat, x = 0, y = 0, z = 0, parent) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  if (parent) parent.add(m);
  return m;
}
const box = (w, h, d, c, x, y, z, p) => mesh(new THREE.BoxGeometry(w, h, d), typeof c === 'string' || typeof c === 'number' ? M(c) : c, x, y, z, p);
const cyl = (rt, rb, h, c, x, y, z, p, seg = 14) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg), typeof c === 'object' ? c : M(c), x, y, z, p);
const sph = (r, c, x, y, z, p, seg = 14) => mesh(new THREE.SphereGeometry(r, seg, Math.max(8, seg - 4)), typeof c === 'object' ? c : M(c), x, y, z, p);

function canvasTex(size, draw, repeat) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  draw(g, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  return t;
}
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// ── Textures ───────────────────────────────────────────────────────────
function cobbleTex() {
  return canvasTex(128, (g, s) => {
    g.fillStyle = '#b9ad98'; g.fillRect(0, 0, s, s);
    const r = rng(23);
    for (let row = 0; row < 4; row++) for (let i = 0; i < 4; i++) {
      const x = i * 32 + (row % 2) * 16, y = row * 32;
      g.fillStyle = ['#d8ccb4', '#cfc2a8', '#e2d7c2', '#c9bca2'][Math.floor(r() * 4)];
      g.beginPath(); g.roundRect ? g.roundRect(x + 2, y + 2, 28, 28, 8) : g.rect(x + 2, y + 2, 28, 28); g.fill();
      g.fillStyle = 'rgba(255,255,255,.35)'; g.fillRect(x + 8, y + 6, 10, 3);
    }
  });
}
function grassTex() {
  return canvasTex(128, (g, s) => {
    g.fillStyle = '#62b947'; g.fillRect(0, 0, s, s);
    const r = rng(7);
    for (let i = 0; i < 26; i++) {
      const x = r() * s, y = r() * s, sz = 3 + r() * 3;
      g.fillStyle = r() < 0.6 ? '#86d35e' : '#4f9e38';
      g.beginPath(); g.moveTo(x, y - sz); g.lineTo(x + sz * 0.8, y + sz * 0.6); g.lineTo(x - sz * 0.8, y + sz * 0.6); g.closePath(); g.fill();
    }
  });
}
function plateauGrassTex() {
  return canvasTex(128, (g, s) => {
    g.fillStyle = '#8ad35c'; g.fillRect(0, 0, s, s);
    const r = rng(11);
    for (let i = 0; i < 22; i++) {
      const x = r() * s, y = r() * s, sz = 3 + r() * 3;
      g.fillStyle = r() < 0.6 ? '#a6e27a' : '#72bd4a';
      g.beginPath(); g.moveTo(x, y - sz); g.lineTo(x + sz * 0.8, y + sz * 0.6); g.lineTo(x - sz * 0.8, y + sz * 0.6); g.closePath(); g.fill();
    }
  });
}
function speckleTex(base, light, dark, seed) {
  return canvasTex(128, (g, s) => {
    g.fillStyle = base; g.fillRect(0, 0, s, s);
    const r = rng(seed);
    for (let i = 0; i < 70; i++) {
      g.fillStyle = r() < 0.5 ? light : dark;
      g.beginPath(); g.arc(r() * s, r() * s, 1 + r() * 2.2, 0, Math.PI * 2); g.fill();
    }
  });
}
function cliffTex() {
  // Stratified earth with a grassy lip — terrace-style cliffs.
  return canvasTex(128, (g, s) => {
    const bands = ['#c9a06a', '#b98d58', '#d2ad78', '#b28552', '#c49a64'];
    for (let i = 0; i < 8; i++) { g.fillStyle = bands[i % bands.length]; g.fillRect(0, (i * s) / 8, s, s / 8 + 1); }
    const r = rng(3);
    for (let i = 0; i < 18; i++) {
      g.fillStyle = r() < 0.5 ? 'rgba(120,80,40,.35)' : 'rgba(255,240,200,.25)';
      g.fillRect(r() * s, s * 0.15 + r() * s * 0.85, 10 + r() * 22, 6 + r() * 8);
    }
    g.fillStyle = '#6fbf47'; g.fillRect(0, 0, s, s * 0.12);
    g.fillStyle = '#5aa83c';
    for (let x = 0; x < s; x += 8) { g.beginPath(); g.arc(x + 4, s * 0.12, 4, 0, Math.PI); g.fill(); }
  });
}
function waterTex() {
  return canvasTex(256, (g, s) => {
    g.fillStyle = '#4fc3dc'; g.fillRect(0, 0, s, s);
    const r = rng(5);
    g.strokeStyle = 'rgba(255,255,255,.45)'; g.lineWidth = 3; g.lineCap = 'round';
    for (let i = 0; i < 26; i++) {
      const x = r() * s, y = r() * s, w = 10 + r() * 22;
      g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + w / 2, y - 4, x + w, y); g.stroke();
    }
  }, true);
}
function leafTex(base, light, dark) {
  return canvasTex(128, (g, s) => {
    g.fillStyle = base; g.fillRect(0, 0, s, s);
    const r = rng(17);
    for (let i = 0; i < 60; i++) {
      const x = r() * s, y = r() * s, rad = 5 + r() * 6;
      g.fillStyle = r() < 0.5 ? light : dark;
      g.beginPath(); g.arc(x, y, rad, Math.PI, 0); g.fill();
    }
  });
}
function stripeTex(a, b, n = 6) {
  return canvasTex(64, (g, s) => {
    for (let i = 0; i < n; i++) { g.fillStyle = i % 2 ? b : a; g.fillRect(0, (i * s) / n, s, s / n + 1); }
  });
}

// ── Static props ───────────────────────────────────────────────────────
let LEAF_MAT, LEAF_MAT_DARK;
function tree(fruit = '#e8312f', seed = 1) {
  const g = new THREE.Group();
  const r = rng(seed);
  cyl(0.11, 0.17, 0.75, '#8a5a35', 0, 0.37, 0, g, 10);
  cyl(0.2, 0.22, 0.08, '#7a4e2c', 0, 0.04, 0, g, 10);
  const blobs = [[0, 1.05, 0, 0.55], [-0.28, 0.95, 0.1, 0.38], [0.3, 0.98, 0.05, 0.4], [0.05, 1.4, 0, 0.42], [0, 1.0, 0.3, 0.38]];
  for (const [x, y, z, rad] of blobs) sph(rad, LEAF_MAT, x, y, z, g, 16);
  if (fruit) {
    for (let i = 0; i < 5; i++) {
      const a = -0.9 + (i / 4) * 1.8 + (r() - 0.5) * 0.3;
      const y = 0.9 + r() * 0.55;
      sph(0.085, fruit, Math.sin(a) * 0.55, y, Math.cos(a) * 0.5 + 0.08, g, 10);
    }
  }
  g.userData.sway = r() * 6;
  return g;
}
function conifer(seed) {
  const g = new THREE.Group();
  cyl(0.08, 0.12, 0.4, '#7a4e2c', 0, 0.2, 0, g, 8);
  const r = rng(seed); const s = 0.85 + r() * 0.35;
  [[0.5, 0.7, 0.55], [0.4, 0.6, 0.95], [0.28, 0.5, 1.3]].forEach(([rad, h, y]) => {
    mesh(new THREE.ConeGeometry(rad * s, h * s, 10), LEAF_MAT_DARK, 0, y * s, 0, g);
  });
  return g;
}
function flower(color, kind = 0) {
  const g = new THREE.Group();
  cyl(0.012, 0.012, 0.18, '#3f8f2f', 0, 0.09, 0, g, 5);
  sph(0.04, '#4fa53a', 0.03, 0.04, 0, g, 6).scale.set(1, 0.4, 0.6);
  if (kind === 0) { // tulip cup
    cyl(0.055, 0.04, 0.09, color, 0, 0.21, 0, g, 6);
  } else { // daisy-ish disc
    const head = cyl(0.07, 0.07, 0.02, color, 0, 0.2, 0, g, 8); head.rotation.x = 0.5;
    sph(0.03, '#ffd23f', 0, 0.21, 0.01, g, 8);
  }
  return g;
}
function flowerCluster(seed, palette = ['#ff4d4d', '#ffd23f', '#ffffff', '#ff8fc8']) {
  const g = new THREE.Group(); const r = rng(seed);
  for (let i = 0; i < 6; i++) {
    const f = flower(palette[Math.floor(r() * palette.length)], r() < 0.6 ? 0 : 1);
    f.position.set((r() - 0.5) * 0.7, 0, (r() - 0.5) * 0.7);
    g.add(f);
  }
  return g;
}
function rock() {
  const g = new THREE.Group();
  const m = mesh(new THREE.DodecahedronGeometry(0.25, 0), M('#a7a39a', { flatShading: true }), 0, 0.15, 0, g);
  m.scale.set(1.2, 0.7, 1);
  return g;
}
function cottage() {
  const g = new THREE.Group();
  // stone foundation, walls, timber
  box(2.7, 0.18, 1.9, '#b9b2a6', 0, 0.09, 0, g);
  box(2.5, 1.4, 1.7, '#f6ecd6', 0, 0.88, 0, g);
  for (const x of [-1.24, 1.24]) box(0.1, 1.4, 1.74, '#c9733e', x, 0.88, 0, g);
  box(2.54, 0.1, 1.74, '#c9733e', 0, 1.55, 0, g);
  // gable wall (cream triangle above the walls, facing front)
  const gs = new THREE.Shape();
  gs.moveTo(-1.25, 0); gs.lineTo(0, 1.0); gs.lineTo(1.25, 0); gs.lineTo(-1.25, 0);
  const gable = mesh(new THREE.ExtrudeGeometry(gs, { depth: 1.7, bevelEnabled: false }), M('#f6ecd6'), 0, 1.58, -0.85, g);
  void gable;
  box(0.05, 0.9, 0.04, '#c9733e', 0, 1.95, 0.86, g);
  // roof — two thick slabs meeting at the ridge, gable facing front
  const ang = Math.atan2(1.0, 1.25);
  const slabLen = Math.hypot(1.25, 1.0) + 0.35;
  const roofMats = [M('#e5483b'), M('#e5483b'), M('#ef5a45'), M('#b8352c'), M('#c63c30'), M('#c63c30')];
  for (const sgn of [-1, 1]) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(slabLen, 0.16, 2.15), roofMats);
    slab.castShadow = slab.receiveShadow = true;
    slab.rotation.z = -sgn * ang;
    const mx = sgn * (1.25 / 2 + 0.1), my = 1.58 + 0.5 - 0.02;
    slab.position.set(mx + sgn * Math.sin(ang) * 0.08, my + Math.cos(ang) * 0.08, 0);
    g.add(slab);
  }
  box(0.16, 0.16, 2.2, '#c63c30', 0, 2.68, 0, g);
  // chimney
  box(0.3, 0.7, 0.3, '#b9b2a6', 0.7, 2.4, -0.3, g);
  box(0.36, 0.08, 0.36, '#9e978b', 0.7, 2.78, -0.3, g);
  // rounded door
  const ds = new THREE.Shape();
  ds.moveTo(-0.28, 0); ds.lineTo(-0.28, 0.6); ds.absarc(0, 0.6, 0.28, Math.PI, 0, true); ds.lineTo(0.28, 0); ds.lineTo(-0.28, 0);
  const doorGeo = new THREE.ExtrudeGeometry(ds, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.03, bevelSegments: 2 });
  mesh(doorGeo, M('#d0603a'), 0, 0.18, 0.84, g);
  sph(0.035, '#f2c94c', 0.17, 0.62, 0.95, g, 8);
  // round-top windows with cross bars
  for (const x of [-0.78, 0.78]) {
    const ws = new THREE.Shape();
    ws.moveTo(-0.2, 0); ws.lineTo(-0.2, 0.25); ws.absarc(0, 0.25, 0.2, Math.PI, 0, true); ws.lineTo(0.2, 0);
    mesh(new THREE.ExtrudeGeometry(ws, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.04, bevelSegments: 1 }), M('#c9733e'), x, 0.7, 0.84, g);
    mesh(new THREE.ExtrudeGeometry(ws, { depth: 0.05, bevelEnabled: false }), M('#3c4f6b'), x, 0.7, 0.86, g).scale.set(0.8, 0.85, 1);
    box(0.03, 0.4, 0.02, '#c9733e', x, 0.9, 0.92, g);
    box(0.32, 0.03, 0.02, '#c9733e', x, 0.9, 0.92, g);
  }
  // step
  box(0.8, 0.08, 0.35, '#9e978b', 0, 0.04, 1.1, g);
  return g;
}
function mailbox() {
  const g = new THREE.Group();
  box(0.06, 0.55, 0.06, '#8a5a35', 0, 0.27, 0, g);
  const body = cyl(0.13, 0.13, 0.36, '#e5483b', 0, 0.62, 0, g, 12); body.rotation.x = Math.PI / 2;
  box(0.26, 0.13, 0.36, '#e5483b', 0, 0.56, 0, g);
  box(0.03, 0.14, 0.03, '#f2c94c', 0.15, 0.7, -0.08, g);
  return g;
}

// ── Buildable models ───────────────────────────────────────────────────
function colourFieldTex() {
  return canvasTex(128, (g, s) => {
    g.fillStyle = '#8c1d1d'; g.fillRect(0, 0, s, s);
    g.filter = 'blur(4px)';
    g.fillStyle = '#e8732c'; g.fillRect(14, 12, s - 28, s * 0.48);
    g.fillStyle = '#5a0f2a'; g.fillRect(14, s * 0.66, s - 28, s * 0.24);
  });
}
function checkerTex(a, b) {
  return canvasTex(64, (g, s) => {
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { g.fillStyle = (i + j) % 2 ? a : b; g.fillRect(i * 8, j * 8, 8, 8); }
  });
}
const BUILDERS = {
  appletree: () => tree('#e8312f', 21),
  peachtree: () => tree('#ffab91', 33),
  flowerbed: () => {
    const g = new THREE.Group();
    box(0.9, 0.1, 0.9, '#8a5a35', 0, 0.05, 0, g);
    box(0.8, 0.11, 0.8, '#6b4a2b', 0, 0.06, 0, g);
    const pal = ['#ff4d4d', '#ffd23f', '#ff8fc8', '#ffffff', '#b07cff'];
    for (let i = 0; i < 9; i++) {
      const f = flower(pal[i % pal.length], i % 3 === 0 ? 1 : 0);
      f.position.set(((i % 3) - 1) * 0.25, 0.1, (Math.floor(i / 3) - 1) * 0.25);
      g.add(f);
    }
    return g;
  },
  bench: () => {
    const g = new THREE.Group();
    for (const x of [-0.32, 0.32]) { box(0.06, 0.25, 0.3, '#7a4e2c', x, 0.12, 0, g); box(0.06, 0.3, 0.05, '#7a4e2c', x, 0.38, -0.14, g); }
    for (const z of [-0.08, 0.04, 0.14]) box(0.85, 0.04, 0.09, '#c98f55', 0, 0.26, z, g);
    for (const y of [0.4, 0.5]) box(0.85, 0.07, 0.03, '#c98f55', 0, y, -0.16, g);
    g.rotation.y = -Math.PI / 2;
    return g;
  },
  easel: (st = 3) => {
    const g = new THREE.Group();
    const wood = M('#b07a45');
    const l1 = box(0.05, 1.2, 0.05, wood, -0.2, 0.58, 0, g); l1.rotation.z = -0.12;
    const l2 = box(0.05, 1.2, 0.05, wood, 0.2, 0.58, 0, g); l2.rotation.z = 0.12;
    const l3 = box(0.05, 1.1, 0.05, wood, 0, 0.52, -0.22, g); l3.rotation.x = 0.35;
    box(0.55, 0.04, 0.1, wood, 0, 0.42, 0.04, g);
    box(0.5, 0.62, 0.04, '#f4ead2', 0, 0.76, 0.05, g);
    if (st >= 2) {
      const canvas = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.58), new THREE.MeshLambertMaterial({ map: colourFieldTex() }));
      canvas.position.set(0, 0.76, 0.075); g.add(canvas);
    }
    if (st >= 3) {
      const c2 = box(0.32, 0.4, 0.03, '#3f7fc4', 0.42, 0.2, 0.15, g); c2.rotation.z = -0.25;
      [['#e5483b', -0.3], ['#f2c94c', -0.4], ['#3f7fc4', -0.2]].forEach(([c, x]) => cyl(0.05, 0.05, 0.08, c, x, 0.04, 0.3, g, 10));
    }
    return g;
  },
  trellis: (st = 3) => {
    const g = new THREE.Group();
    for (const x of [-0.4, 0.4]) box(0.07, 1.0, 0.07, '#8a5a35', x, 0.5, 0, g);
    for (const y of [0.45, 0.7, 0.95]) box(0.9, 0.03, 0.03, '#8a5a35', 0, y, 0, g);
    const r = rng(4);
    for (let i = 0; i < [4, 9, 12][st - 1]; i++) sph(0.09 + r() * 0.05, LEAF_MAT, (r() - 0.5) * 0.8, 0.45 + r() * 0.55, 0.04, g, 8);
    for (let i = 0; i < (st >= 3 ? 4 : 0); i++) {
      const cx = -0.3 + i * 0.2, cy = 0.5 + r() * 0.3;
      for (let k = 0; k < 5; k++) sph(0.035, '#6a2c74', cx + (k % 2) * 0.04 - 0.02, cy - Math.floor(k / 2) * 0.05, 0.1, g, 6);
    }
    return g;
  },
  cheesecart: (st = 3) => {
    const g = new THREE.Group();
    box(0.8, 0.35, 0.5, '#c98f55', 0, 0.42, 0, g);
    for (const x of [-0.3, 0.3]) { const w = cyl(0.17, 0.17, 0.05, '#7a4e2c', x, 0.17, 0.27, g, 14); w.rotation.x = Math.PI / 2; }
    for (const x of [-0.36, 0.36]) box(0.04, 0.6, 0.04, '#8a5a35', x, 0.9, -0.2, g);
    const aw = box(0.9, 0.04, 0.5, new THREE.MeshLambertMaterial({ map: stripeTex('#ffffff', '#f2c94c', 8) }), 0, 1.2, 0, g); aw.rotation.x = 0.25;
    for (const [x, h] of [[-0.2, 0.12], [0.12, 0.1], [0.26, 0.08]].slice(0, st)) {
      cyl(0.13, 0.13, h, '#f6c445', x, 0.6 + h / 2, 0, g, 16);
    }
    if (st >= 2) cyl(0.09, 0.09, 0.08, '#f2a33a', -0.2, 0.76, 0, g, 16);
    if (st >= 3) for (let i = 0; i < 6; i++) { const f = mesh(new THREE.ConeGeometry(0.05, 0.1, 3), M(['#e5483b', '#3fa7b8', '#f2c94c'][i % 3]), -0.36 + i * 0.145, 1.05, 0.22, g); f.rotation.z = Math.PI; }
    return g;
  },
  galton: (st = 3) => {
    const g = new THREE.Group();
    box(0.8, 1.2, 0.08, '#c98f55', 0, 0.6, 0, g);
    box(0.7, 1.05, 0.02, '#fdf6e6', 0, 0.65, 0.05, g);
    for (let row = 0; row < 6; row++) for (let k = 0; k <= row; k++) {
      sph(0.018, '#7a4e2c', (k - row / 2) * 0.09, 1.0 - row * 0.07, 0.07, g, 6);
    }
    const heights = st >= 3 ? [1, 2, 4, 6, 4, 2, 1] : st === 2 ? [0, 1, 2, 3, 2, 1, 0] : [];
    heights.forEach((h, i) => {
      for (let k = 0; k < h; k++) sph(0.03, '#e5483b', (i - 3) * 0.08, 0.18 + k * 0.055, 0.08, g, 6);
    });
    for (let i = 0; i <= 7; i++) box(0.01, 0.4, 0.03, '#7a4e2c', (i - 3.5) * 0.08, 0.32, 0.07, g);
    if (st >= 2) g.userData.bead = sph(0.03, '#e5483b', 0, 1.1, 0.08, g, 6);
    return g;
  },
  robot: (st = 3) => {
    const g = new THREE.Group();
    for (const x of [-0.15, 0.15]) { const w = cyl(0.08, 0.08, 0.06, '#4a4f5a', x, 0.08, 0, g, 12); w.rotation.z = Math.PI / 2; }
    box(0.36, 0.3, 0.28, '#d9dee6', 0, 0.3, 0, g);
    box(0.2, 0.12, 0.02, '#7ad3e8', 0, 0.32, 0.15, g);
    sph(0.18, '#eef1f5', 0, 0.6, 0, g, 16);
    box(0.22, 0.1, 0.05, '#2d3440', 0, 0.62, 0.15, g);
    for (const x of [-0.05, 0.05]) sph(0.025, '#7ae8ff', x, 0.62, 0.18, g, 8);
    cyl(0.01, 0.01, 0.18, '#4a4f5a', 0, 0.85, 0, g, 6);
    const light = sph(0.035, new THREE.MeshLambertMaterial({ color: '#ff5a5a', emissive: '#ff2020', emissiveIntensity: 0.6 }), 0, 0.95, 0, g, 8);
    g.userData.blink = light;
    for (const x of [-0.22, 0.22]) sph(0.06, '#c7ccd4', x, 0.32, 0.02, g, 8);
    if (st >= 2) box(0.06, 0.06, 0.02, '#f2c94c', 0, 0.22, 0.15, g);
    if (st >= 3) {
      const d = new THREE.Group(); d.position.set(0.4, 1.0, 0); g.add(d);
      sph(0.08, '#eef1f5', 0, 0, 0, d, 12); sph(0.025, '#7ae8ff', 0, 0, 0.07, d, 8);
      mesh(new THREE.TorusGeometry(0.12, 0.012, 6, 20), M('#4a4f5a'), 0, 0, 0, d).rotation.x = Math.PI / 2;
      g.userData.drone = d;
    }
    return g;
  },
  cinema: (st = 3) => {
    const g = new THREE.Group();
    for (const x of [-0.75, 0.75]) box(0.08, 1.4, 0.08, '#7a4e2c', x, 0.7, -0.2, g);
    box(1.6, 0.9, 0.06, '#3a3a44', 0, 1.0, -0.2, g);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 0.78), st < 2 ? M('#f4f1e8') : new THREE.MeshLambertMaterial({
      map: canvasTex(128, (c, s) => { const gr = c.createLinearGradient(0, 0, 0, s); gr.addColorStop(0, '#ffcf8a'); gr.addColorStop(1, '#ff7aa2'); c.fillStyle = gr; c.fillRect(0, 0, s, s); c.fillStyle = '#ffe9b8'; c.beginPath(); c.arc(s / 2, s * 0.62, 18, 0, Math.PI * 2); c.fill(); c.fillStyle = '#5a5f8f'; c.fillRect(0, s * 0.72, s, s); }),
      emissive: '#222222',
    }));
    scr.position.set(0, 1.0, -0.165); g.add(scr);
    for (const x of [-0.35, 0.35]) { cyl(0.13, 0.13, 0.25, '#e5483b', x, 0.13, 0.45, g, 12); }
    if (st >= 3) {
      for (const x of [-0.35, 0.35]) cyl(0.13, 0.13, 0.25, '#3f7fc4', x, 0.13, 0.85, g, 12);
      for (let i = 0; i < 9; i++) sph(0.035, new THREE.MeshLambertMaterial({ color: '#fff3c4', emissive: '#ffd36b', emissiveIntensity: 0.6 }), -0.72 + i * 0.18, 1.5 - Math.sin((i / 8) * Math.PI) * 0.08, -0.15, g, 6);
    }
    return g;
  },
  dressform: (st = 3) => {
    const g = new THREE.Group();
    cyl(0.14, 0.18, 0.05, '#7a4e2c', 0, 0.03, 0, g, 12);
    cyl(0.02, 0.02, 0.5, '#7a4e2c', 0, 0.3, 0, g, 6);
    const torso = sph(0.17, '#f6d2c4', 0, 0.75, 0, g, 14); torso.scale.set(1, 1.2, 0.75);
    if (st >= 2) mesh(new THREE.ConeGeometry(0.28, 0.45, 16, 1, true), M('#e27fb0', { side: THREE.DoubleSide }), 0, 0.5, 0, g);
    cyl(0.04, 0.05, 0.08, '#f6d2c4', 0, 0.98, 0, g, 8);
    sph(0.04, '#7a4e2c', 0, 1.05, 0, g, 8);
    if (st >= 3) {
      const sash = mesh(new THREE.TorusGeometry(0.15, 0.025, 6, 18), M('#f2c94c'), 0, 0.72, 0, g); sash.rotation.x = Math.PI / 2 - 0.2;
      cyl(0.2, 0.2, 0.02, '#3a3a44', 0, 1.1, 0, g, 16); cyl(0.09, 0.1, 0.12, '#3a3a44', 0, 1.17, 0, g, 14);
    }
    return g;
  },
  grill: (st = 3) => {
    const g = new THREE.Group();
    box(0.7, 0.45, 0.45, '#c46a4a', 0, 0.23, 0, g);
    box(0.72, 0.05, 0.47, '#9e978b', 0, 0.47, 0, g);
    box(0.4, 0.04, 0.3, '#33363d', -0.1, 0.51, 0, g);
    cyl(0.1, 0.09, 0.12, '#4a4f5a', 0.2, 0.56, 0, g, 12);
    for (const [x, z] of [[-0.18, -0.06], [-0.05, 0.05]]) sph(0.05, '#e5483b', x, 0.55, z, g, 8);
    if (st >= 2) for (const x of [-0.25, 0.25]) { box(0.2, 0.14, 0.18, '#8a5a35', x, 0.07, 0.38, g); sph(0.1, LEAF_MAT, x, 0.2, 0.38, g, 8); }
    if (st >= 3) {
      for (const x of [-0.33, 0.33]) box(0.04, 1.0, 0.04, '#8a5a35', x, 0.5, -0.25, g);
      box(0.7, 0.04, 0.04, '#8a5a35', 0, 0.98, -0.25, g);
      for (let i = 0; i < 5; i++) { const p = mesh(new THREE.ConeGeometry(0.03, 0.12, 6), M(i % 2 ? '#e5483b' : '#f2a33a'), -0.24 + i * 0.12, 0.88, -0.25, g); p.rotation.z = Math.PI; }
    }
    return g;
  },
  signpost: (st = 3) => {
    const g = new THREE.Group();
    box(0.08, 1.1, 0.08, '#7a4e2c', 0, 0.55, 0, g);
    if (st >= 3) { box(0.02, 0.4, 0.02, '#7a4e2c', 0, 1.3, 0, g); box(0.22, 0.14, 0.01, '#e5483b', 0.11, 1.42, 0, g); }
    [['#3fa7b8', 0.95, 0.4], ['#f2c94c', 0.75, -0.6], ['#e5483b', 0.55, 1.6]].slice(0, st).forEach(([c, y, rot]) => {
      const arm = new THREE.Group(); arm.position.y = y; arm.rotation.y = rot; g.add(arm);
      box(0.5, 0.13, 0.04, c, 0.25, 0, 0, arm);
      const tip = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.04, 3), M(c), 0.52, 0, 0, arm); tip.rotation.x = Math.PI / 2; tip.rotation.y = Math.PI / 2;
    });
    return g;
  },
  kiosk: (st = 3) => {
    const g = new THREE.Group();
    box(0.8, 0.5, 0.45, '#5aa0c8', 0, 0.25, 0, g);
    box(0.84, 0.05, 0.5, '#f4ead2', 0, 0.52, 0, g);
    for (const x of [-0.38, 0.38]) box(0.05, 0.6, 0.05, '#f4ead2', x, 0.85, -0.18, g);
    if (st >= 2) { const aw = box(0.95, 0.05, 0.6, new THREE.MeshLambertMaterial({ map: stripeTex('#ffffff', '#e86a5c', 8) }), 0, 1.15, 0, g); aw.rotation.x = 0.3; }
    for (let i = 0; i < st; i++) box(0.18, 0.04 + i * 0.03, 0.24, '#fdfdfd', -0.25 + i * 0.25, 0.57 + i * 0.015, 0.05, g);
    if (st >= 3) { box(0.5, 0.16, 0.03, '#2f5f9e', 0, 1.36, 0.1, g); box(0.4, 0.04, 0.035, '#fdfdfd', 0, 1.36, 0.11, g); }
    return g;
  },
  column: (st = 3) => {
    const g = new THREE.Group();
    box(0.5, 0.12, 0.5, '#e9e3d6', 0, 0.06, 0, g);
    cyl(0.17, 0.19, 1.0, M('#f4efe4', { flatShading: true }), 0, 0.62, 0, g, 12);
    if (st >= 2) { box(0.46, 0.1, 0.46, '#e9e3d6', 0, 1.17, 0, g); box(0.36, 0.06, 0.36, '#e9e3d6', 0, 1.1, 0, g); }
    if (st >= 3) {
      cyl(0.16, 0.16, 0.28, '#e9e3d6', 0.45, 0.14, 0.25, g, 12);
      sph(0.12, '#f4efe4', 0, 1.36, 0, g, 12); cyl(0.07, 0.1, 0.1, '#f4efe4', 0, 1.25, 0, g, 10);
      const laurel = mesh(new THREE.TorusGeometry(0.12, 0.02, 6, 16), LEAF_MAT, 0, 1.42, 0, g); laurel.rotation.x = Math.PI / 2;
    }
    return g;
  },
  lanterns: (st = 3) => {
    const g = new THREE.Group();
    box(0.07, 1.25, 0.07, '#7a4e2c', 0, 0.62, 0, g);
    box(0.9, 0.05, 0.05, '#7a4e2c', 0, 1.2, 0, g);
    const glow = (c) => new THREE.MeshLambertMaterial({ color: c, emissive: c, emissiveIntensity: 0.35 });
    g.userData.lanterns = [];
    if (st >= 3) { box(0.07, 1.0, 0.07, '#7a4e2c', 0.8, 0.5, 0, g); box(0.07, 1.0, 0.07, '#7a4e2c', -0.8, 0.5, 0, g); }
    [[0, '#f2c94c'], [-0.32, '#e5483b'], [0.32, '#ef8a3c'], [-0.65, '#e27fb0'], [0.65, '#3fa7b8']].slice(0, [1, 3, 5][st - 1]).forEach(([x, c], i) => {
      const hang = new THREE.Group(); hang.position.set(x, 1.18, 0.0); g.add(hang);
      cyl(0.005, 0.005, 0.15, '#333', 0, -0.07, 0, hang, 4);
      const l = sph(0.12, glow(c), 0, -0.25, 0, hang, 14); l.scale.y = 1.15;
      cyl(0.06, 0.06, 0.03, '#33363d', 0, -0.12, 0, hang, 10);
      hang.userData.phase = i * 1.7;
      g.userData.lanterns.push(hang);
    });
    return g;
  },
  telescope: (st = 3) => {
    const g = new THREE.Group();
    if (st >= 2) {
      box(0.04, 0.8, 0.04, '#7a4e2c', 0.45, 0.4, -0.2, g);
      const chart = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.02), [M('#7a4e2c'), M('#7a4e2c'), M('#7a4e2c'), M('#7a4e2c'), new THREE.MeshLambertMaterial({ map: canvasTex(64, (c, sz) => { c.fillStyle = '#1f2a4a'; c.fillRect(0, 0, sz, sz); c.fillStyle = '#fff3c4'; const r = rng(8); for (let i = 0; i < 22; i++) { c.beginPath(); c.arc(r() * sz, r() * sz, 0.8 + r() * 1.6, 0, 7); c.fill(); } }) }), M('#7a4e2c')]);
      chart.position.set(0.45, 0.85, -0.18); g.add(chart);
    }
    if (st >= 3) { cyl(0.13, 0.13, 0.22, '#c98f55', -0.4, 0.11, 0.2, g, 12); mesh(new THREE.TorusGeometry(0.14, 0.015, 6, 20), M('#f2c94c'), 0, 0.68, 0, g).rotation.x = Math.PI / 2; }
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const leg = box(0.04, 0.7, 0.04, '#7a4e2c', Math.sin(a) * 0.15, 0.33, Math.cos(a) * 0.15, g);
      leg.rotation.set(Math.cos(a) * 0.35, 0, -Math.sin(a) * 0.35);
    }
    const tube = cyl(0.07, 0.1, 0.8, '#3f7fc4', 0, 0.78, 0, g, 14); tube.rotation.x = -0.9;
    cyl(0.11, 0.11, 0.06, '#f2c94c', 0, 0.78 + Math.cos(0.9) * 0.4, Math.sin(-0.9) * -0.4, g, 14).rotation.x = -0.9;
    return g;
  },
  library: (st = 3) => {
    const g = new THREE.Group();
    if (st >= 3) { [[-0.3, '#ff8fc8'], [0.3, '#ffd23f']].forEach(([x, c]) => { box(0.22, 0.12, 0.18, '#8a5a35', x, 0.06, 0.3, g); for (let i = 0; i < 3; i++) sph(0.04, c, x - 0.06 + i * 0.06, 0.16, 0.3, g, 6); }); }
    box(0.08, 0.6, 0.08, '#7a4e2c', 0, 0.3, 0, g);
    box(0.55, 0.5, 0.4, '#a5794a', 0, 0.85, 0, g);
    const roof = mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.5, 3), M('#e5483b'), 0, 1.18, 0, g); roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 2; roof.scale.set(0.55, 1, 0.45);
    box(0.45, 0.38, 0.02, '#3a3020', 0, 0.85, 0.2, g);
    const cols = ['#e5483b', '#3f7fc4', '#f2c94c', '#4a9b6e', '#8a72b8'];
    for (let i = 0; i < [2, 5, 5][st - 1]; i++) box(0.06, 0.16 + (i % 2) * 0.03, 0.02, cols[i], -0.15 + i * 0.075, 0.76, 0.21, g);
    for (let i = 0; i < [0, 2, 4][st - 1]; i++) box(0.06, 0.14, 0.02, cols[(i + 2) % 5], -0.12 + i * 0.08, 0.95, 0.21, g);
    return g;
  },
  pullupbar: () => {
    const g = new THREE.Group();
    for (const x of [-0.45, 0.45]) box(0.08, 1.3, 0.08, '#4a4f5a', x, 0.65, 0, g);
    const bar = cyl(0.025, 0.025, 0.95, '#c7ccd4', 0, 1.25, 0, g, 8); bar.rotation.z = Math.PI / 2;
    const tire = mesh(new THREE.TorusGeometry(0.17, 0.07, 8, 16), M('#33363d'), 0.25, 0.07, 0.3, g); tire.rotation.x = Math.PI / 2;
    return g;
  },
  lamppost: () => {
    const g = new THREE.Group();
    cyl(0.04, 0.06, 1.3, '#33363d', 0, 0.65, 0, g, 8);
    const l = sph(0.13, new THREE.MeshLambertMaterial({ color: '#fff3c4', emissive: '#ffd36b', emissiveIntensity: 0.5 }), 0, 1.38, 0, g, 12);
    void l;
    mesh(new THREE.ConeGeometry(0.17, 0.12, 12), M('#33363d'), 0, 1.53, 0, g);
    return g;
  },
  picnic: () => {
    const g = new THREE.Group();
    const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.75), new THREE.MeshLambertMaterial({ map: checkerTex('#e5483b', '#ffffff') }));
    blanket.position.y = 0.01; blanket.receiveShadow = true; g.add(blanket);
    box(0.28, 0.16, 0.2, '#c98f55', -0.2, 0.1, -0.1, g);
    const h = mesh(new THREE.TorusGeometry(0.1, 0.012, 6, 12, Math.PI), M('#8a5a35'), -0.2, 0.18, -0.1, g); void h;
    for (const [x, z] of [[0.15, 0.1], [0.27, -0.05]]) cyl(0.07, 0.07, 0.02, '#ffffff', x, 0.03, z, g, 12);
    sph(0.04, '#e8312f', 0.15, 0.06, 0.1, g, 8);
    sph(0.035, '#ffd23f', 0.27, 0.06, -0.05, g, 8);
    return g;
  },
  hammock: () => {
    const g = new THREE.Group();
    for (const x of [-0.5, 0.5]) box(0.08, 0.8, 0.08, '#7a4e2c', x, 0.4, 0, g);
    const sling = sph(0.5, new THREE.MeshLambertMaterial({ map: stripeTex('#f6ecd6', '#3fa7b8', 10), side: THREE.DoubleSide }), 0, 0.72, 0, g, 18);
    sling.scale.set(1, 0.4, 0.35);
    // only show the lower half of the sphere as a sling
    sling.geometry = new THREE.SphereGeometry(0.5, 18, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    box(0.16, 0.04, 0.12, '#e5483b', 0.05, 0.6, 0, g);
    return g;
  },
  fountain: () => {
    const g = new THREE.Group();
    cyl(0.55, 0.6, 0.25, M('#c7c0b3', { flatShading: true }), 0, 0.12, 0, g, 16);
    const water = cyl(0.48, 0.48, 0.03, new THREE.MeshLambertMaterial({ color: '#6fd3ea', emissive: '#1a5a6a', emissiveIntensity: 0.3 }), 0, 0.24, 0, g, 16);
    void water;
    cyl(0.08, 0.1, 0.5, '#c7c0b3', 0, 0.45, 0, g, 10);
    cyl(0.25, 0.12, 0.1, '#c7c0b3', 0, 0.72, 0, g, 14);
    const jet = sph(0.08, new THREE.MeshLambertMaterial({ color: '#bff0fb', transparent: true, opacity: 0.85 }), 0, 0.85, 0, g, 10);
    g.userData.jet = jet;
    return g;
  },
  // ── Town square ──
  podium: () => {
    const g = new THREE.Group();
    box(0.5, 0.6, 0.4, '#c98f55', 0, 0.3, 0, g);
    box(0.56, 0.06, 0.46, '#8a5a35', 0, 0.63, 0, g);
    box(0.4, 0.3, 0.02, '#e5483b', 0, 0.35, 0.21, g);
    box(0.25, 0.04, 0.025, '#f2c94c', 0, 0.42, 0.22, g);
    box(0.04, 1.1, 0.04, '#8a5a35', 0.35, 0.55, -0.1, g);
    box(0.2, 0.04, 0.04, '#8a5a35', 0.27, 1.08, -0.1, g);
    mesh(new THREE.CylinderGeometry(0.05, 0.1, 0.14, 12), M('#f2c94c'), 0.2, 0.98, -0.1, g);
    return g;
  },
  clocktower: () => {
    const g = new THREE.Group();
    box(0.85, 0.25, 0.85, '#b9b2a6', 0, 0.12, 0, g);
    box(0.62, 1.9, 0.62, '#f0dcae', 0, 1.2, 0, g);
    for (const x of [-0.31, 0.31]) for (const z of [-0.31, 0.31]) box(0.08, 1.9, 0.08, '#7a4e2c', x, 1.2, z, g);
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.22, 24), new THREE.MeshLambertMaterial({ map: canvasTex(64, (c, sz) => {
      c.fillStyle = '#fffdf4'; c.fillRect(0, 0, sz, sz); c.strokeStyle = '#3a3020'; c.lineWidth = 4; c.lineCap = 'round';
      c.beginPath(); c.arc(32, 32, 28, 0, 7); c.stroke();
      c.beginPath(); c.moveTo(32, 32); c.lineTo(32, 12); c.moveTo(32, 32); c.lineTo(46, 38); c.stroke();
    }) }));
    face.position.set(0, 1.75, 0.315); g.add(face);
    const roof = mesh(new THREE.ConeGeometry(0.55, 0.6, 4), M('#2f8fa3'), 0, 2.45, 0, g); roof.rotation.y = Math.PI / 4;
    mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.16, 10), M('#f2c94c'), 0, 2.12, 0, g);
    return g;
  },
  globe: () => {
    const g = new THREE.Group();
    cyl(0.2, 0.25, 0.08, '#8a5a35', 0, 0.04, 0, g, 14);
    cyl(0.03, 0.04, 0.5, '#8a5a35', 0, 0.3, 0, g, 8);
    const earth = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 14), new THREE.MeshLambertMaterial({ map: canvasTex(128, (c, sz) => {
      c.fillStyle = '#4fa6d8'; c.fillRect(0, 0, sz, sz); c.fillStyle = '#7cc96a';
      const r = rng(31); for (let i = 0; i < 9; i++) { c.beginPath(); c.ellipse(r() * sz, 20 + r() * 88, 8 + r() * 16, 6 + r() * 12, r() * 3, 0, 7); c.fill(); }
    }) }));
    earth.position.y = 0.8; earth.rotation.z = 0.4; earth.castShadow = true; g.add(earth);
    const ring = mesh(new THREE.TorusGeometry(0.29, 0.015, 6, 24, Math.PI), M('#f2c94c'), 0, 0.8, 0, g); ring.rotation.z = Math.PI / 2 + 0.4;
    g.userData.spin = earth;
    return g;
  },
  balloon: () => {
    const g = new THREE.Group();
    const lift = new THREE.Group(); g.add(lift);
    box(0.4, 0.28, 0.4, '#a5794a', 0, 0.55, 0, lift);
    box(0.44, 0.05, 0.44, '#7a4e2c', 0, 0.7, 0, lift);
    for (const x of [-0.17, 0.17]) for (const z of [-0.17, 0.17]) { const r = cyl(0.008, 0.008, 0.6, '#5a3a2a', x * 1.4, 1.0, z * 1.4, lift, 4); r.rotation.set(-z * 1.0, 0, x * 1.0); }
    const env = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 16), new THREE.MeshLambertMaterial({ map: canvasTex(128, (c, sz) => {
      ['#e5483b', '#f2c94c', '#3fa7b8', '#f6ecd6'].forEach((col, i) => { c.fillStyle = col; for (let k = 0; k < 4; k++) c.fillRect((i + k * 4) * 8, 0, 8, sz); });
    }) }));
    env.position.y = 1.65; env.scale.y = 1.15; env.castShadow = true; lift.add(env);
    cyl(0.01, 0.01, 0.6, '#5a3a2a', 0.15, 0.3, 0, g, 4);
    box(0.1, 0.08, 0.1, '#7a4e2c', 0.15, 0.04, 0, g);
    g.userData.float = lift;
    return g;
  },
  sundial: () => {
    const g = new THREE.Group();
    cyl(0.18, 0.24, 0.6, M('#c7c0b3', { flatShading: true }), 0, 0.3, 0, g, 8);
    cyl(0.3, 0.3, 0.05, '#e9e3d6', 0, 0.63, 0, g, 24);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; box(0.02, 0.01, 0.07, '#7a7f8a', Math.sin(a) * 0.24, 0.66, Math.cos(a) * 0.24, g).rotation.y = a; }
    const gn = mesh(new THREE.CylinderGeometry(0.0, 0.18, 0.2, 3), M('#7a7f8a'), 0, 0.74, 0, g); gn.scale.z = 0.1;
    return g;
  },
  pyramid: () => {
    const g = new THREE.Group();
    const p = mesh(new THREE.ConeGeometry(0.6, 0.85, 4), M('#e2c48a', { flatShading: true }), 0, 0.43, 0, g); p.rotation.y = Math.PI / 4;
    box(0.9, 0.04, 0.9, '#d9c48f', 0, 0.02, 0, g);
    return g;
  },
  // ── Arts corner ──
  sculpture: () => {
    const g = new THREE.Group();
    box(0.45, 0.5, 0.45, '#f4efe4', 0, 0.25, 0, g);
    const t = mesh(new THREE.TorusGeometry(0.16, 0.06, 10, 20), M('#e5483b'), 0, 0.72, 0, g); t.rotation.y = 0.6;
    sph(0.1, '#3f7fc4', 0.05, 0.98, 0, g, 14);
    const c = box(0.14, 0.14, 0.14, '#f2c94c', -0.05, 1.12, 0, g); c.rotation.set(0.6, 0.6, 0);
    g.userData.spin = t;
    return g;
  },
  mural: () => {
    const g = new THREE.Group();
    box(1.4, 0.15, 0.25, '#b9b2a6', 0, 0.07, 0, g);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.95, 0.14), [M('#f0dcae'), M('#f0dcae'), M('#f0dcae'), M('#f0dcae'), new THREE.MeshLambertMaterial({ map: canvasTex(128, (c, sz) => {
      c.fillStyle = '#ffe9b8'; c.fillRect(0, 0, sz, sz);
      [['#e5483b', 20, 40, 26], ['#3f7fc4', 70, 30, 30], ['#4a9b6e', 100, 80, 22], ['#f2c94c', 40, 90, 20], ['#e27fb0', 90, 100, 14]].forEach(([col, x, y, r]) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); });
      c.strokeStyle = '#3a3020'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 64); c.bezierCurveTo(40, 20, 80, 110, 128, 60); c.stroke();
    }) }), M('#f0dcae')]);
    wall.position.y = 0.62; wall.castShadow = wall.receiveShadow = true; g.add(wall);
    return g;
  },
  dirchair: () => {
    const g = new THREE.Group();
    for (const s of [-1, 1]) { const a = box(0.03, 0.5, 0.03, '#7a4e2c', s * 0.2, 0.24, 0.12, g); a.rotation.x = 0.4; const b = box(0.03, 0.5, 0.03, '#7a4e2c', s * 0.2, 0.24, -0.12, g); b.rotation.x = -0.4; box(0.03, 0.4, 0.03, '#7a4e2c', s * 0.2, 0.65, -0.14, g); }
    box(0.42, 0.02, 0.3, '#e5483b', 0, 0.46, 0, g);
    box(0.42, 0.16, 0.02, '#e5483b', 0, 0.72, -0.14, g);
    const cl = new THREE.Group(); cl.position.set(0.35, 0.03, 0.3); cl.rotation.y = -0.4; g.add(cl);
    box(0.24, 0.02, 0.18, '#2d3440', 0, 0, 0, cl);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.05), new THREE.MeshLambertMaterial({ map: stripeTex('#ffffff', '#2d3440', 6) }));
    top.position.set(0, 0.03, -0.1); top.rotation.x = -0.4; cl.add(top);
    return g;
  },
  popcorn: () => {
    const g = new THREE.Group();
    box(0.6, 0.5, 0.4, new THREE.MeshLambertMaterial({ map: stripeTex('#e5483b', '#ffffff', 8) }), 0, 0.4, 0, g);
    for (const x of [-0.25, 0.25]) { const w = cyl(0.12, 0.12, 0.04, '#4a4f5a', x, 0.12, 0.22, g, 12); w.rotation.x = Math.PI / 2; }
    const glass = mesh(new THREE.BoxGeometry(0.5, 0.35, 0.34), new THREE.MeshLambertMaterial({ color: '#dff4fb', transparent: true, opacity: 0.45 }), 0, 0.83, 0, g);
    glass.castShadow = false;
    const r = rng(12); for (let i = 0; i < 26; i++) sph(0.04, '#fff3c4', (r() - 0.5) * 0.42, 0.7 + r() * 0.15, (r() - 0.5) * 0.26, g, 6);
    const roof = box(0.66, 0.05, 0.44, '#e5483b', 0, 1.04, 0, g); void roof;
    return g;
  },
  rack: () => {
    const g = new THREE.Group();
    for (const x of [-0.42, 0.42]) { box(0.04, 1.1, 0.04, '#7a7f8a', x, 0.55, 0, g); box(0.2, 0.03, 0.2, '#7a7f8a', x, 0.02, 0, g); }
    const bar = cyl(0.015, 0.015, 0.86, '#7a7f8a', 0, 1.06, 0, g, 6); bar.rotation.z = Math.PI / 2;
    ['#e27fb0', '#3f7fc4', '#f2c94c', '#4a9b6e', '#f4ead2'].forEach((c, i) => {
      const x = -0.3 + i * 0.15;
      mesh(new THREE.TorusGeometry(0.04, 0.008, 4, 10, Math.PI), M('#7a7f8a'), x, 1.0, 0, g).rotation.y = Math.PI / 2;
      const d = mesh(new THREE.ConeGeometry(0.11, 0.5, 4, 1, true), M(c, { side: THREE.DoubleSide }), x, 0.72, 0, g); d.scale.z = 0.35;
    });
    return g;
  },
  runway: () => {
    const g = new THREE.Group();
    box(0.6, 0.12, 0.95, '#f4efe4', 0, 0.06, 0, g);
    box(0.3, 0.01, 0.9, '#e27fb0', 0, 0.125, 0, g);
    for (const z of [-0.35, 0, 0.35]) for (const x of [-0.27, 0.27]) sph(0.025, new THREE.MeshLambertMaterial({ color: '#fff3c4', emissive: '#ffd36b', emissiveIntensity: 0.7 }), x, 0.14, z, g, 6);
    for (const x of [-0.36, 0.36]) { box(0.03, 0.9, 0.03, '#33363d', x, 0.45, -0.45, g); const l = cyl(0.04, 0.07, 0.1, '#33363d', x * 0.8, 0.9, -0.4, g, 8); l.rotation.x = 0.8; }
    return g;
  },
  teatable: () => {
    const g = new THREE.Group();
    cyl(0.32, 0.32, 0.05, '#7a4e2c', 0, 0.22, 0, g, 18);
    cyl(0.04, 0.06, 0.2, '#5a3a22', 0, 0.1, 0, g, 8);
    for (const s of [-1, 1]) sph(0.16, s < 0 ? '#e5483b' : '#3fa7b8', s * 0.42, 0.06, 0.1, g, 12).scale.set(1, 0.35, 1);
    sph(0.08, '#f4f1e8', 0, 0.3, 0, g, 12);
    const sp = cyl(0.012, 0.018, 0.08, '#f4f1e8', 0.09, 0.32, 0, g, 6); sp.rotation.z = -0.9;
    for (const [x, z] of [[-0.18, 0.12], [0.16, 0.14]]) cyl(0.035, 0.03, 0.04, '#f4f1e8', x, 0.27, z, g, 10);
    return g;
  },
  arch: () => {
    const g = new THREE.Group();
    for (const x of [-0.42, 0.42]) box(0.06, 0.9, 0.06, '#7a4e2c', x, 0.45, 0, g);
    const a = mesh(new THREE.TorusGeometry(0.42, 0.04, 8, 20, Math.PI), M('#7a4e2c'), 0, 0.9, 0, g); void a;
    const r = rng(9);
    for (let i = 0; i <= 14; i++) {
      const t = i / 14, ang = Math.PI * t;
      sph(0.065 + r() * 0.02, r() < 0.7 ? '#f08a3c' : '#f2c94c', Math.cos(ang) * 0.42, 0.9 + Math.sin(ang) * 0.42, 0.03, g, 8);
    }
    for (let i = 0; i < 6; i++) sph(0.06, '#f08a3c', (i % 2 ? -0.42 : 0.42), 0.15 + Math.floor(i / 2) * 0.25, 0.04, g, 8);
    return g;
  },
  // ── Market street ──
  veggies: () => {
    const g = new THREE.Group();
    box(0.9, 0.1, 0.9, '#6b4a2b', 0, 0.05, 0, g);
    for (let i = 0; i < 3; i++) {
      const x = -0.3 + i * 0.3;
      sph(0.1, '#9bd162', x, 0.16, -0.28, g, 10).scale.set(1, 0.8, 1);
      const st = cyl(0.01, 0.01, 0.35, '#4fa53a', x, 0.27, 0.02, g, 4); void st;
      sph(0.09, LEAF_MAT, x, 0.4, 0.02, g, 8);
      sph(0.04, '#e5483b', x + 0.05, 0.32, 0.07, g, 8);
      mesh(new THREE.ConeGeometry(0.04, 0.12, 6), M('#4fa53a'), x, 0.16, 0.3, g);
      mesh(new THREE.ConeGeometry(0.03, 0.06, 6), M('#ef8a3c'), x, 0.11, 0.3, g).rotation.z = Math.PI;
    }
    return g;
  },
  pizzaoven: () => {
    const g = new THREE.Group();
    box(0.85, 0.5, 0.75, '#c46a4a', 0, 0.25, 0, g);
    box(0.9, 0.05, 0.8, '#9e978b', 0, 0.52, 0, g);
    mesh(new THREE.SphereGeometry(0.38, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), M('#d98a5a'), 0, 0.54, -0.02, g);
    const door = mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16, 1, false, 0, Math.PI), M('#2a2320'), 0, 0.55, 0.33, g); door.rotation.x = Math.PI / 2; door.rotation.y = Math.PI / 2;
    cyl(0.06, 0.06, 0.4, '#9e978b', 0.18, 0.95, -0.15, g, 10);
    g.userData.glow = sph(0.06, new THREE.MeshLambertMaterial({ color: '#ffb35a', emissive: '#ff7a1a', emissiveIntensity: 0.8 }), 0, 0.6, 0.28, g, 8);
    return g;
  },
  barrels: () => {
    const g = new THREE.Group();
    const barrel = (x, y, z) => {
      const b = cyl(0.17, 0.17, 0.4, '#a5794a', x, y, z, g, 14); b.rotation.x = Math.PI / 2;
      for (const dz of [-0.13, 0.13]) { const h = mesh(new THREE.TorusGeometry(0.17, 0.012, 6, 18), M('#4a4f5a'), x, y, z + dz, g); void h; }
      cyl(0.13, 0.13, 0.01, '#8a5a35', x, y, z + 0.205, g, 14).rotation.x = Math.PI / 2;
    };
    barrel(-0.18, 0.17, 0); barrel(0.18, 0.17, 0); barrel(0, 0.48, 0);
    return g;
  },
  tasting: () => {
    const g = new THREE.Group();
    cyl(0.32, 0.32, 0.04, '#f4ead2', 0, 0.55, 0, g, 18);
    cyl(0.04, 0.08, 0.55, '#7a4e2c', 0, 0.27, 0, g, 8);
    const red = new THREE.MeshLambertMaterial({ color: '#7a1f3a', transparent: true, opacity: 0.9 });
    for (const [x, z] of [[-0.15, 0.1], [0.12, 0.14], [0.02, -0.12]]) {
      cyl(0.035, 0.035, 0.01, '#e8f4f8', x, 0.575, z, g, 10);
      cyl(0.006, 0.006, 0.08, '#e8f4f8', x, 0.62, z, g, 4);
      mesh(new THREE.ConeGeometry(0.045, 0.07, 10, 1, true), M('#e8f4f8', { transparent: true, opacity: 0.5, side: THREE.DoubleSide }), x, 0.7, z, g).rotation.x = Math.PI;
      sph(0.03, red, x, 0.68, z, g, 8);
    }
    cyl(0.045, 0.045, 0.22, '#2f4a3a', 0.2, 0.68, -0.1, g, 10); cyl(0.015, 0.02, 0.07, '#2f4a3a', 0.2, 0.82, -0.1, g, 6);
    return g;
  },
  cow: () => {
    const g = new THREE.Group();
    const spots = new THREE.MeshLambertMaterial({ map: canvasTex(64, (c, sz) => {
      c.fillStyle = '#fbf6ec'; c.fillRect(0, 0, sz, sz); c.fillStyle = '#2a2320';
      [[14, 18, 9], [42, 12, 7], [30, 44, 11], [54, 46, 6]].forEach(([x, y, r]) => { c.beginPath(); c.ellipse(x, y, r, r * 0.8, 0.5, 0, 7); c.fill(); });
    }) });
    const body = sph(0.28, spots, 0, 0.45, 0, g, 16); body.scale.set(1.45, 0.9, 0.85);
    for (const x of [-0.25, 0.25]) for (const z of [-0.13, 0.13]) cyl(0.05, 0.05, 0.3, '#fbf6ec', x, 0.15, z, g, 8);
    const head = new THREE.Group(); head.position.set(0.45, 0.62, 0); g.add(head);
    sph(0.18, '#fbf6ec', 0, 0, 0, head, 14).scale.set(1, 1, 0.9);
    sph(0.11, '#f3b6b0', 0.13, -0.06, 0, head, 12).scale.set(0.7, 0.7, 1.2);
    for (const z of [-0.08, 0.08]) { sph(0.025, '#2a2320', 0.13, 0.06, z, head, 6); const h = mesh(new THREE.ConeGeometry(0.025, 0.1, 6), M('#f2e3c0'), 0, 0.18, z * 1.6, head); h.rotation.x = z * 6; }
    const bell = mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.06, 10), M('#f2c94c'), 0.38, 0.4, 0, g); void bell;
    g.rotation.y = -0.5;
    g.userData.nod = head;
    return g;
  },
  fondue: () => {
    const g = new THREE.Group();
    cyl(0.32, 0.32, 0.04, '#c98f55', 0, 0.5, 0, g, 18);
    cyl(0.04, 0.08, 0.5, '#7a4e2c', 0, 0.25, 0, g, 8);
    for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2; const l = box(0.015, 0.14, 0.015, '#33363d', Math.sin(a) * 0.08, 0.59, Math.cos(a) * 0.08, g); void l; }
    cyl(0.03, 0.03, 0.03, new THREE.MeshLambertMaterial({ color: '#ffd36b', emissive: '#ff9a2a', emissiveIntensity: 0.8 }), 0, 0.54, 0, g, 8);
    cyl(0.13, 0.1, 0.12, '#c63c30', 0, 0.7, 0, g, 16);
    cyl(0.11, 0.11, 0.01, '#f6c445', 0, 0.76, 0, g, 16);
    for (let i = 0; i < 3; i++) { const a = i * 2.1; const f = cyl(0.006, 0.006, 0.3, '#c7ccd4', Math.sin(a) * 0.12, 0.82, Math.cos(a) * 0.12, g, 4); f.rotation.set(Math.cos(a) * 0.7, 0, -Math.sin(a) * 0.7); }
    for (let i = 0; i < 5; i++) box(0.05, 0.05, 0.05, '#e8c08a', 0.18 + (i % 2) * 0.06, 0.55, -0.12 + i * 0.05, g);
    return g;
  },
  // ── Observatory hill ──
  dice: () => {
    const g = new THREE.Group();
    const pips = (n) => new THREE.MeshLambertMaterial({ map: canvasTex(64, (c, sz) => {
      c.fillStyle = '#fbf6ec'; c.fillRect(0, 0, sz, sz); c.fillStyle = '#2a2320';
      const P = { 1: [[32, 32]], 2: [[18, 18], [46, 46]], 3: [[16, 16], [32, 32], [48, 48]], 4: [[18, 18], [46, 18], [18, 46], [46, 46]], 5: [[16, 16], [48, 16], [32, 32], [16, 48], [48, 48]], 6: [[18, 14], [46, 14], [18, 32], [46, 32], [18, 50], [46, 50]] }[n];
      P.forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); });
    }) });
    const mats = [1, 6, 2, 5, 3, 4].map(pips);
    const d1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), mats); d1.position.set(-0.18, 0.2, 0.05); d1.rotation.y = 0.4; d1.castShadow = true; g.add(d1);
    const d2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), mats); d2.position.set(0.25, 0.15, -0.1); d2.rotation.set(0, -0.5, 0); d2.castShadow = true; g.add(d2);
    return g;
  },
  bellhedge: () => {
    const g = new THREE.Group();
    box(0.95, 0.08, 0.35, '#6b4a2b', 0, 0.04, 0, g);
    [0.15, 0.3, 0.55, 0.75, 0.55, 0.3, 0.15].forEach((h, i) => { const b = box(0.12, h, 0.25, LEAF_MAT, -0.39 + i * 0.13, 0.08 + h / 2, 0, g); void b; });
    return g;
  },
  labbench: () => {
    const g = new THREE.Group();
    box(0.85, 0.06, 0.45, '#f4f1e8', 0, 0.55, 0, g);
    for (const x of [-0.38, 0.38]) for (const z of [-0.18, 0.18]) box(0.05, 0.55, 0.05, '#7a7f8a', x, 0.27, z, g);
    const glass = (c) => new THREE.MeshLambertMaterial({ color: c, transparent: true, opacity: 0.75 });
    cyl(0.05, 0.05, 0.16, glass('#7ad3e8'), -0.3, 0.66, 0, g, 12);
    sph(0.08, glass('#9bd162'), -0.1, 0.66, 0.05, g, 12); cyl(0.02, 0.02, 0.1, glass('#e8f4f8'), -0.1, 0.77, 0.05, g, 8);
    cyl(0.04, 0.05, 0.12, glass('#e27fb0'), 0.05, 0.64, -0.08, g, 12);
    box(0.12, 0.03, 0.12, '#33363d', 0.25, 0.6, 0, g); cyl(0.02, 0.02, 0.2, '#33363d', 0.25, 0.7, -0.04, g, 6); const ey = cyl(0.03, 0.03, 0.1, '#33363d', 0.25, 0.8, 0, g, 8); ey.rotation.x = 0.4;
    return g;
  },
  orrery: () => {
    const g = new THREE.Group();
    cyl(0.2, 0.25, 0.1, '#8a5a35', 0, 0.05, 0, g, 16);
    cyl(0.025, 0.025, 0.6, '#f2c94c', 0, 0.4, 0, g, 8);
    const spin = new THREE.Group(); spin.position.y = 0.75; g.add(spin);
    sph(0.12, new THREE.MeshLambertMaterial({ color: '#ffd23f', emissive: '#ff9a2a', emissiveIntensity: 0.5 }), 0, 0, 0, spin, 16);
    [[0.25, '#3f7fc4', 0.045], [0.38, '#e5483b', 0.04], [0.5, '#e8c08a', 0.06]].forEach(([r, c, sz], i) => {
      const ring = mesh(new THREE.TorusGeometry(r, 0.006, 4, 40), M('#c7a24a'), 0, 0, 0, spin); ring.rotation.x = Math.PI / 2;
      const arm = new THREE.Group(); arm.rotation.y = i * 2.1; spin.add(arm);
      sph(sz, c, r, 0, 0, arm, 10);
    });
    g.userData.spin = spin;
    return g;
  },
  robotarm: () => {
    const g = new THREE.Group();
    cyl(0.22, 0.26, 0.15, '#4a4f5a', 0, 0.075, 0, g, 16);
    const turn = new THREE.Group(); turn.position.y = 0.15; g.add(turn);
    cyl(0.1, 0.12, 0.15, '#f2a33a', 0, 0.075, 0, turn, 12);
    const shoulder = new THREE.Group(); shoulder.position.y = 0.18; shoulder.rotation.z = -0.5; turn.add(shoulder);
    sph(0.08, '#4a4f5a', 0, 0, 0, shoulder, 10); box(0.1, 0.45, 0.1, '#f2a33a', 0, 0.22, 0, shoulder);
    const elbow = new THREE.Group(); elbow.position.y = 0.45; elbow.rotation.z = 1.4; shoulder.add(elbow);
    sph(0.07, '#4a4f5a', 0, 0, 0, elbow, 10); box(0.08, 0.35, 0.08, '#f2a33a', 0, 0.17, 0, elbow);
    for (const s of [-1, 1]) box(0.02, 0.08, 0.04, '#4a4f5a', s * 0.04, 0.38, 0, elbow);
    g.userData.arm = { turn, shoulder, elbow };
    return g;
  },
  rover: () => {
    const g = new THREE.Group();
    box(0.6, 0.15, 0.4, '#d9dee6', 0, 0.25, 0, g);
    for (const x of [-0.24, 0, 0.24]) for (const z of [-0.24, 0.24]) { const w = cyl(0.08, 0.08, 0.06, '#33363d', x, 0.1, z, g, 12); w.rotation.x = Math.PI / 2; }
    box(0.4, 0.04, 0.3, '#3f7fc4', -0.02, 0.35, 0, g);
    cyl(0.02, 0.02, 0.3, '#7a7f8a', 0.2, 0.48, 0, g, 6);
    const lidar = cyl(0.07, 0.07, 0.08, '#33363d', 0.2, 0.66, 0, g, 12);
    sph(0.025, '#7ae8ff', 0.27, 0.66, 0, lidar.parent, 6);
    g.userData.lidar = lidar;
    return g;
  },
  chess: () => {
    const g = new THREE.Group();
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.5), [M('#7a4e2c'), M('#7a4e2c'), new THREE.MeshLambertMaterial({ map: checkerTex('#3a3020', '#f4ead2') }), M('#7a4e2c'), M('#7a4e2c'), M('#7a4e2c')]);
    top.position.y = 0.5; top.castShadow = true; g.add(top);
    cyl(0.04, 0.12, 0.48, '#7a4e2c', 0, 0.24, 0, g, 8);
    for (const z of [-0.45, 0.45]) cyl(0.14, 0.14, 0.3, '#c7c0b3', 0, 0.15, z, g, 12);
    [[-0.1, 0.1, '#f4ead2'], [0.05, -0.15, '#3a3020'], [0.15, 0.05, '#f4ead2']].forEach(([x, z, c]) => { cyl(0.02, 0.03, 0.06, c, x, 0.555, z, g, 8); sph(0.022, c, x, 0.6, z, g, 6); });
    return g;
  },
  theseus: () => {
    const g = new THREE.Group();
    box(0.12, 0.3, 0.12, '#7a4e2c', 0, 0.15, 0, g);
    const hull = new THREE.Group(); hull.position.y = 0.42; g.add(hull);
    const r = rng(5);
    for (let i = 0; i < 7; i++) box(0.12, 0.14, 0.26, r() < 0.4 ? '#e8c08a' : '#8a5a35', -0.36 + i * 0.12, 0, 0, hull);
    box(0.84, 0.04, 0.3, '#5a3a22', 0, -0.07, 0, hull);
    box(0.025, 0.65, 0.025, '#5a3a22', 0, 0.38, 0, hull);
    const sail = box(0.4, 0.38, 0.01, '#f6ecd6', 0.02, 0.42, 0.02, hull); void sail;
    box(0.2, 0.08, 0.01, '#e5483b', 0.12, 0.72, 0, hull);
    return g;
  },
};


// ── Stations: the places you visit to learn, log and build ─────────────
function signTex(text, bg, fg = '#fff8e4') {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64;
  const g = c.getContext('2d');
  const paint = () => {
    g.fillStyle = bg; g.fillRect(0, 0, 256, 64);
    g.fillStyle = fg; g.font = '800 40px "Baloo 2", sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, 128, 36);
  };
  paint();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  if (document.fonts) document.fonts.ready.then(() => { paint(); t.needsUpdate = true; });
  return t;
}
function shelvesTex() {
  return canvasTex(128, (g, s) => {
    g.fillStyle = '#5a3a22'; g.fillRect(0, 0, s, s);
    const cols = ['#e5483b', '#3f7fc4', '#f2c94c', '#4a9b6e', '#8a72b8', '#ef8a3c', '#f6ecd6'];
    const r = rng(42);
    for (let row = 0; row < 3; row++) {
      let x = 6; const y0 = 8 + row * 40;
      while (x < s - 10) {
        const w = 6 + r() * 7, h = 22 + r() * 10;
        g.fillStyle = cols[Math.floor(r() * cols.length)];
        g.fillRect(x, y0 + 32 - h, w, h); x += w + 1.5;
      }
      g.fillStyle = '#8a5a35'; g.fillRect(0, y0 + 32, s, 5);
    }
  });
}
function libraryModel() {
  const g = new THREE.Group();
  box(1.95, 0.16, 1.75, '#b9b2a6', 0, 0.08, 0, g);
  box(1.75, 1.25, 1.45, '#f0dcae', 0, 0.78, -0.05, g);
  for (const x of [-0.86, 0.86]) box(0.1, 1.25, 1.5, '#7a4e2c', x, 0.78, -0.05, g);
  box(1.8, 0.1, 1.5, '#7a4e2c', 0, 1.42, -0.05, g);
  // front gable + teal roof
  const gs = new THREE.Shape();
  gs.moveTo(-0.875, 0); gs.lineTo(0, 0.75); gs.lineTo(0.875, 0); gs.lineTo(-0.875, 0);
  mesh(new THREE.ExtrudeGeometry(gs, { depth: 1.45, bevelEnabled: false }), M('#f0dcae'), 0, 1.45, -0.78, g);
  const ang = Math.atan2(0.75, 0.875), len = Math.hypot(0.875, 0.75) + 0.3;
  const mats = [M('#2f8fa3'), M('#2f8fa3'), M('#3fa7b8'), M('#25707f'), M('#2a7f91'), M('#2a7f91')];
  for (const sgn of [-1, 1]) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(len, 0.14, 1.85), mats);
    slab.castShadow = slab.receiveShadow = true;
    slab.rotation.z = -sgn * ang;
    slab.position.set(sgn * (0.875 / 2 + 0.08) + sgn * Math.sin(ang) * 0.07, 1.45 + 0.375 + Math.cos(ang) * 0.07, -0.05);
    g.add(slab);
  }
  box(0.14, 0.14, 1.9, '#25707f', 0, 2.25, -0.05, g);
  // big round-top double door
  const ds = new THREE.Shape();
  ds.moveTo(-0.3, 0); ds.lineTo(-0.3, 0.55); ds.absarc(0, 0.55, 0.3, Math.PI, 0, true); ds.lineTo(0.3, 0); ds.lineTo(-0.3, 0);
  mesh(new THREE.ExtrudeGeometry(ds, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.03, bevelSegments: 2 }), M('#2f6fa8'), 0, 0.16, 0.68, g);
  box(0.02, 0.8, 0.02, '#1f4f7a', 0, 0.56, 0.76, g);
  for (const x of [-0.07, 0.07]) sph(0.03, '#f2c94c', x, 0.5, 0.77, g, 8);
  // windows showing bookshelves
  const shelf = new THREE.MeshLambertMaterial({ map: shelvesTex() });
  for (const x of [-0.58, 0.58]) {
    box(0.42, 0.48, 0.04, '#7a4e2c', x, 0.82, 0.68, g);
    const w = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.4), shelf); w.position.set(x, 0.82, 0.705); g.add(w);
  }
  // sign over the door
  const sign = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 0.05), [M('#7a4e2c'), M('#7a4e2c'), M('#7a4e2c'), M('#7a4e2c'), new THREE.MeshLambertMaterial({ map: signTex('LIBRARY', '#8a5a35') }), M('#7a4e2c')]);
  sign.position.set(0, 1.62, 0.72); sign.castShadow = true; g.add(sign);
  // book stack + reading lamp outside
  [['#e5483b', 0], ['#3f7fc4', 0.05], ['#f2c94c', 0.1]].forEach(([c, y], i) => { const b = box(0.24, 0.05, 0.17, c, 0.78, 0.03 + y, 0.95, g); b.rotation.y = i * 0.3; });
  cyl(0.025, 0.035, 0.9, '#33363d', -0.82, 0.45, 0.95, g, 8);
  sph(0.09, new THREE.MeshLambertMaterial({ color: '#fff3c4', emissive: '#ffd36b', emissiveIntensity: 0.5 }), -0.82, 0.95, 0.95, g, 10);
  return g;
}
function gymModel() {
  const g = new THREE.Group();
  const mat = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.05, 1.85), new THREE.MeshLambertMaterial({
    map: canvasTex(128, (c, s) => {
      c.fillStyle = '#3b8f86'; c.fillRect(0, 0, s, s);
      c.strokeStyle = '#f6ecd6'; c.lineWidth = 4; c.strokeRect(6, 6, s - 12, s - 12);
      c.beginPath(); c.arc(s / 2, s / 2, 18, 0, Math.PI * 2); c.stroke();
    }),
  }));
  mat.position.y = 0.025; mat.receiveShadow = true; g.add(mat);
  // sign
  for (const x of [-0.55, 0.55]) box(0.07, 1.35, 0.07, '#7a4e2c', x, 0.67, -0.8, g);
  const sign = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.32, 0.06), [M('#7a4e2c'), M('#7a4e2c'), M('#7a4e2c'), M('#7a4e2c'), new THREE.MeshLambertMaterial({ map: signTex('GYM', '#e5483b') }), M('#7a4e2c')]);
  sign.position.set(0, 1.2, -0.8); sign.castShadow = true; g.add(sign);
  // dumbbell rack
  box(0.08, 0.5, 0.35, '#4a4f5a', -0.75, 0.3, -0.3, g); box(0.08, 0.5, 0.35, '#4a4f5a', -0.25, 0.3, -0.3, g);
  box(0.58, 0.04, 0.35, '#4a4f5a', -0.5, 0.33, -0.3, g); box(0.58, 0.04, 0.35, '#4a4f5a', -0.5, 0.53, -0.3, g);
  const dumbbell = (x, y, z, c) => {
    const bar = cyl(0.015, 0.015, 0.2, '#c7ccd4', x, y, z, g, 6); bar.rotation.x = Math.PI / 2;
    for (const dz of [-0.08, 0.08]) { const d = cyl(0.045, 0.045, 0.04, c, x, y, z + dz, g, 10); d.rotation.x = Math.PI / 2; }
  };
  dumbbell(-0.62, 0.4, -0.3, '#e5483b'); dumbbell(-0.4, 0.4, -0.3, '#3f7fc4');
  dumbbell(-0.62, 0.6, -0.3, '#f2c94c'); dumbbell(-0.4, 0.6, -0.3, '#4a9b6e');
  // barbell on stands
  for (const x of [0.15, 0.85]) box(0.06, 0.7, 0.06, '#4a4f5a', x, 0.37, -0.25, g);
  const bar = cyl(0.02, 0.02, 1.0, '#c7ccd4', 0.5, 0.7, -0.25, g, 8); bar.rotation.z = Math.PI / 2;
  for (const x of [0.08, 0.92]) { const d = cyl(0.17, 0.17, 0.05, '#33363d', x, 0.7, -0.25, g, 16); d.rotation.z = Math.PI / 2; }
  // padded bench
  box(0.3, 0.07, 0.75, '#e5483b', 0.5, 0.3, 0.35, g);
  for (const z of [0.08, 0.62]) box(0.06, 0.27, 0.06, '#4a4f5a', 0.5, 0.14, z, g);
  // kettlebells
  [[-0.6, 0.5, '#33363d'], [-0.3, 0.6, '#f07a5f']].forEach(([x, z, c]) => {
    sph(0.1, c, x, 0.12, z, g, 12);
    const h = mesh(new THREE.TorusGeometry(0.06, 0.018, 6, 12, Math.PI), M(c), x, 0.2, z, g); void h;
  });
  // water bottle
  cyl(0.035, 0.035, 0.16, '#7ad3e8', -0.75, 0.13, 0.75, g, 10);
  return g;
}
function workbenchModel() {
  const g = new THREE.Group();
  const wood = M('#c98f55'), dark = M('#8a5a35');
  box(0.95, 0.08, 0.55, wood, 0, 0.55, 0, g);
  for (const [x, z] of [[-0.42, -0.22], [0.42, -0.22], [-0.42, 0.22], [0.42, 0.22]]) box(0.07, 0.55, 0.07, dark, x, 0.27, z, g);
  box(0.85, 0.04, 0.45, dark, 0, 0.18, 0, g);
  // back pegboard with tools
  box(0.95, 0.5, 0.04, wood, 0, 0.85, -0.26, g);
  for (const x of [-0.42, 0.42]) box(0.05, 0.6, 0.05, dark, x, 0.85, -0.26, g);
  const hammer = new THREE.Group(); hammer.position.set(-0.22, 0.88, -0.22); g.add(hammer);
  box(0.03, 0.25, 0.02, dark, 0, 0, 0, hammer); box(0.12, 0.05, 0.04, '#7a7f8a', 0, 0.12, 0, hammer);
  const saw = box(0.3, 0.1, 0.01, '#c7ccd4', 0.15, 0.88, -0.23, g); saw.rotation.z = 0.15;
  box(0.08, 0.1, 0.03, '#e5483b', 0.32, 0.9, -0.23, g);
  // vise + plank on top
  box(0.12, 0.1, 0.12, '#3f7fc4', 0.38, 0.64, 0.15, g);
  box(0.5, 0.03, 0.12, '#e8c08a', -0.1, 0.605, 0.08, g);
  // planks leaning on the side
  for (let i = 0; i < 3; i++) { const p = box(0.08, 0.7, 0.03, '#e8c08a', 0.55 + i * 0.04, 0.34, 0.15 - i * 0.08, g); p.rotation.z = -0.25; }
  return g;
}
function dockModel() {
  const g = new THREE.Group(); // origin at (8.5, 18.5)
  const wood = M('#c98f55'), dark = M('#8a5a35');
  for (let i = 0; i < 9; i++) box(1.0, 0.06, 0.3, i % 2 ? wood : M('#d39c62'), 0, -0.1, -1.55 + i * 0.36, g);
  for (const x of [-0.45, 0.45]) {
    box(0.06, 0.08, 3.2, dark, x, -0.06, -0.15, g);
    for (const z of [-0.3, 0.7, 1.4]) cyl(0.06, 0.06, 0.9, dark, x, -0.45, z, g, 8);
  }
  cyl(0.06, 0.06, 0.5, dark, 0.45, 0.1, 1.4, g, 8);
  cyl(0.06, 0.06, 0.5, dark, -0.45, 0.1, 1.4, g, 8);
  // a bucket at the end
  cyl(0.12, 0.1, 0.2, '#7a8ca8', 0.3, 0.0, 1.1, g, 12);
  return g;
}
function fishMesh(color) {
  const g = new THREE.Group();
  const body = sph(0.16, color, 0, 0, 0, g, 14); body.scale.set(1.5, 0.9, 0.55);
  const tail = mesh(new THREE.ConeGeometry(0.12, 0.18, 4), M(color), -0.3, 0, 0, g); tail.rotation.z = Math.PI / 2;
  sph(0.03, '#2a2320', 0.15, 0.04, 0.07, g, 6);
  return g;
}
function noticeBoardModel() {
  const g = new THREE.Group();
  for (const x of [-0.38, 0.38]) box(0.07, 1.3, 0.07, '#7a4e2c', x, 0.65, 0, g);
  box(0.85, 0.6, 0.06, '#c98f55', 0, 0.95, 0, g);
  box(0.75, 0.5, 0.02, '#d9a96a', 0, 0.95, 0.035, g);
  [['#fdfdfd', -0.2, 1.05], ['#fff3b0', 0.05, 0.98], ['#d8f0ff', 0.24, 1.07], ['#ffd6cf', -0.12, 0.83], ['#fdfdfd', 0.18, 0.84]].forEach(([c, x, y]) => {
    const n = box(0.16, 0.18, 0.01, c, x, y, 0.05, g); n.rotation.z = (x * 7) % 0.3 - 0.15;
  });
  const roof = mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.0, 3), M('#e5483b'), 0, 1.38, 0, g); roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 2; roof.scale.set(0.5, 1, 0.5);
  return g;
}
function stallModel() {
  const g = new THREE.Group();
  box(0.9, 0.5, 0.5, '#c98f55', 0, 0.25, 0, g);
  for (const x of [-0.42, 0.42]) box(0.05, 1.1, 0.05, '#8a5a35', x, 0.75, -0.2, g);
  const aw = box(1.0, 0.05, 0.6, new THREE.MeshLambertMaterial({ map: stripeTex('#ffffff', '#4a9b6e', 8) }), 0, 1.3, 0, g); aw.rotation.x = 0.3;
  [[-0.28, '#e5483b'], [0, '#ef8a3c'], [0.28, '#9bd162']].forEach(([x, c]) => {
    box(0.24, 0.1, 0.3, '#8a5a35', x, 0.55, 0.02, g);
    for (let i = 0; i < 4; i++) sph(0.05, c, x - 0.06 + (i % 2) * 0.12, 0.64, -0.06 + Math.floor(i / 2) * 0.12, g, 8);
  });
  return g;
}
function chalkboardModel() {
  const g = new THREE.Group();
  const face = new THREE.MeshLambertMaterial({ map: canvasTex(128, (c, sz) => {
    c.fillStyle = '#2f4a3a'; c.fillRect(0, 0, sz, sz);
    c.strokeStyle = '#f4f1e8'; c.lineWidth = 3; c.lineCap = 'round';
    c.beginPath(); c.moveTo(12, 96); for (let x = 0; x <= 100; x += 4) c.lineTo(12 + x, 96 - 70 * Math.exp(-((x - 50) ** 2) / 300)); c.stroke();
    c.beginPath(); c.arc(92, 30, 12, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.moveTo(14, 20); c.lineTo(40, 20); c.moveTo(14, 32); c.lineTo(32, 32); c.stroke();
  }) });
  for (const sgn of [-1, 1]) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.04), [M('#8a5a35'), M('#8a5a35'), M('#8a5a35'), M('#8a5a35'), sgn > 0 ? face : M('#8a5a35'), sgn > 0 ? M('#8a5a35') : face]);
    b.position.set(0, 0.48, sgn * 0.14); b.rotation.x = sgn * -0.28; b.castShadow = true; g.add(b);
  }
  return g;
}
// What each keeper does when nobody's visiting: a few spots to stroll
// between (on paths, so builds never block them) and a little activity.
const ROUTINES = {
  library:     { act: 'read',     points: [[4.5, 10.5], [4.6, 11.45], [5.6, 11.4]],   face: null },
  gym:         { act: 'exercise', points: [[17.5, 10.5], [17.5, 11.45], [16.5, 10.4]], face: null },
  workbench:   { act: 'hammer',   points: [[13.5, 7.5], [13.4, 7.85], [13.6, 7.25]],  face: [12.5, 7.5] },
  square:      { act: 'letters',  points: [[7.5, 9.5], [8.5, 9.6], [7.5, 10.4]],      face: [7.5, 8.5] },
  market:      { act: 'stir',     points: [[11.5, 14.5], [10.5, 14.6], [10.5, 15.6]], face: [11.5, 13.5] },
  observatory: { act: 'stargaze', points: [[14.5, 3.5], [14.5, 4.4], [15.3, 4.45]],   face: [13.5, 3.5] },
};
function keeperProp(act) {
  const g = new THREE.Group();
  if (act === 'read') {
    for (const s of [-1, 1]) { const p = box(0.12, 0.16, 0.012, '#fffdf4', s * 0.06, 0, 0, g); p.rotation.y = s * -0.35; }
    box(0.26, 0.17, 0.008, '#8a5a9e', 0, 0, -0.012, g);
    g.position.set(0, 0.3, 0.22); g.rotation.x = -0.6;
  } else if (act === 'letters') {
    box(0.16, 0.11, 0.015, '#fffdf4', 0, 0, 0, g); sph(0.018, '#e5483b', 0, 0, 0.01, g, 6);
    g.position.set(0.2, 0.3, 0.12);
  } else if (act === 'stir') {
    cyl(0.12, 0.1, 0.14, '#4a4f5a', 0, 0.07, 0, g, 14); cyl(0.1, 0.1, 0.01, '#e8c08a', 0, 0.13, 0, g, 14);
    const ladle = new THREE.Group(); ladle.position.set(0.03, 0.2, 0); g.add(ladle);
    cyl(0.008, 0.008, 0.28, '#8a5a35', 0, 0.06, 0, ladle, 4);
    g.userData.ladle = ladle; g.position.set(0, 0, 0.32);
  } else if (act === 'stargaze') {
    cyl(0.01, 0.01, 0.06, '#ffffff', 0, 0, 0, g, 4); g.position.set(0.2, 0.3, 0.12);
  }
  g.visible = false;
  return g;
}
const STATIONS = {
  library:     { model: libraryModel,     tiles: [[2, 9], [3, 9], [2, 10], [3, 10]],     at: [3.0, 10.0],  approach: [3, 11],  labelY: 2.7, keeper: makeMaple,  keeperAt: [4, 10], pin: true },
  gym:         { model: gymModel,         tiles: [[18, 9], [19, 9], [18, 10], [19, 10]], at: [19.0, 10.0], approach: [19, 11], labelY: 1.7, keeper: makeDot,    keeperAt: [17, 10], pin: true },
  workbench:   { model: workbenchModel,   tiles: [[12, 7]],                              at: [12.5, 7.5],  approach: [12, 8],  labelY: 1.4, keeper: makeBram,   keeperAt: [13, 7], pin: true },
  dock:        { model: dockModel,        tiles: [],                                     at: [10.5, 20.5], approach: [10, 21], labelY: 1.1, pin: true },
  square:      { model: noticeBoardModel, tiles: [[7, 8]],                               at: [7.5, 8.5],   approach: [8, 8],   labelY: 1.8, keeper: makeFennel, keeperAt: [7, 9] },
  market:      { model: stallModel,       tiles: [[11, 13]],                             at: [11.5, 13.5], approach: [10, 13], labelY: 1.8, keeper: makePepper, keeperAt: [11, 14] },
  observatory: { model: chalkboardModel,  tiles: [[13, 3]],                              at: [13.5, 3.5],  approach: [12, 3],  labelY: 2.0, keeper: makeSage,   keeperAt: [14, 3] },
};
export const PINNED = Object.keys(STATIONS).filter((k) => STATIONS[k].pin);

// ── The creature ───────────────────────────────────────────────────────
// Pip: an original round sprout-creature in a striped knit sweater.
// One rig for every character: big round head, tiny body, dot eyes, blush.
// Options recolour it and add species details.
function makeCritter(o) {
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const fur = M(o.fur);
  const top = new THREE.MeshLambertMaterial({ map: stripeTex(o.top[0], o.top[1], 6) });
  const torso = sph(0.17, top, 0, 0.2, 0, body, 16); torso.scale.set(1, 1.05, 0.9);
  for (const x of [-0.09, 0.09]) { const f = sph(0.06, o.feet || '#8a5a35', x, 0.04, 0.03, body, 10); f.scale.set(1, 0.6, 1.3); }
  const arms = [];
  for (const x of [-0.17, 0.17]) arms.push(sph(0.055, fur, x, 0.22, 0.02, body, 10));
  const head = new THREE.Group(); head.position.y = 0.55; body.add(head);
  const skull = sph(0.3, fur, 0, 0, 0, head, 22); skull.scale.set(...(o.skull || [1.05, 0.95, 0.95]));
  if (o.ears !== false) {
    for (const x of [-0.2, 0.2]) { const e = sph(0.08, fur, x, 0.22, -0.03, head, 10); e.scale.set(1, 1, 0.6); sph(0.045, o.innerEar || '#f3a9a0', x, 0.22, 0.01, head, 8).scale.set(1, 1, 0.3); }
  }
  const eyes = [];
  const ey = o.eyeY ?? 0.02;
  for (const x of [-0.1, 0.1]) {
    const e = sph(0.046, '#2a2320', x, ey, 0.27, head, 10); e.scale.set(0.85, 1.15, 0.6); eyes.push(e);
    sph(0.012, '#ffffff', x + 0.012, ey + 0.025, 0.3, head, 6);
  }
  const blushMat = new THREE.MeshBasicMaterial({ color: '#ff9a9a', transparent: true, opacity: 0.7 });
  for (const x of [-0.17, 0.17]) { const b = new THREE.Mesh(new THREE.CircleGeometry(0.045, 14), blushMat); b.position.set(x, -0.06, 0.255); b.rotation.y = x * 1.6; head.add(b); }
  const mouth = mesh(new THREE.TorusGeometry(0.025, 0.008, 6, 10, Math.PI), M('#5a3a2a'), 0, -0.05, 0.285, head); mouth.rotation.z = Math.PI;
  if (o.extra) o.extra(head, body, fur);
  const hammer = new THREE.Group();
  box(0.025, 0.22, 0.025, '#8a5a35', 0, 0.11, 0, hammer);
  box(0.1, 0.06, 0.06, '#7a7f8a', 0, 0.22, 0, hammer);
  hammer.position.set(0.17, 0.22, 0.05); hammer.visible = false; body.add(hammer);
  root.userData = { body, head, eyes, arms, hammer };
  root.scale.setScalar(1.35);
  return root;
}
// Pip: a round sprout creature in a striped sweater.
function makeCreature() {
  return makeCritter({
    fur: '#f7dcae', top: ['#3fb3a5', '#f6ecd6'],
    extra: (head) => {
      cyl(0.012, 0.012, 0.12, '#4fa53a', 0, 0.33, 0, head, 5);
      for (const s of [-1, 1]) { const l = sph(0.07, '#6cc04a', s * 0.06, 0.4, 0, head, 10); l.scale.set(1.2, 0.45, 0.7); l.rotation.z = s * 0.5; }
    },
  });
}
// Maple, the librarian: a sheep in a plum cardigan and round glasses.
function makeMaple() {
  return makeCritter({
    fur: '#fbf3e4', top: ['#8a5a9e', '#9d6db1'], ears: false, feet: '#5a4a44',
    extra: (head) => {
      const wool = M('#ffffff');
      [[0, 0.24, 0, 0.13], [-0.14, 0.2, 0.02, 0.11], [0.14, 0.2, 0.02, 0.11], [-0.08, 0.28, -0.08, 0.1], [0.08, 0.28, -0.08, 0.1], [-0.24, 0.08, -0.04, 0.1], [0.24, 0.08, -0.04, 0.1]]
        .forEach(([x, y, z, r]) => sph(r, wool, x, y, z, head, 12));
      for (const s of [-1, 1]) { const e = sph(0.09, '#e9dcc6', s * 0.3, -0.02, -0.02, head, 10); e.scale.set(1.3, 0.5, 0.7); e.rotation.z = s * -0.4; }
      for (const x of [-0.1, 0.1]) { const r = mesh(new THREE.TorusGeometry(0.06, 0.01, 6, 18), M('#5a3a2a'), x, 0.02, 0.28, head); void r; }
      box(0.06, 0.012, 0.012, '#5a3a2a', 0, 0.03, 0.29, head);
    },
  });
}
// Dot, the coach: a frog in a red headband and tank top.
function makeDot() {
  return makeCritter({
    fur: '#7cc96a', top: ['#f07a5f', '#ffffff'], ears: false, skull: [1.15, 0.85, 0.95], feet: '#5aa84a', eyeY: 0.08,
    extra: (head, body, fur) => {
      for (const x of [-0.12, 0.12]) sph(0.1, fur, x, 0.2, 0.08, head, 12);
      const band = mesh(new THREE.TorusGeometry(0.3, 0.035, 8, 24), M('#e5483b'), 0, 0.06, 0, head);
      band.rotation.x = Math.PI / 2; band.scale.set(1.15, 1, 1);
      sph(0.07, '#e9f5c9', 0, -0.1, 0.22, head, 10).scale.set(1.6, 0.6, 0.6);
    },
  });
}
// Bram, the carpenter: a beaver in blue overalls and a hard hat.
function makeBram() {
  return makeCritter({
    fur: '#b07a48', top: ['#3f6fb0', '#3f6fb0'], innerEar: '#8a5a35', feet: '#6b4a2b',
    extra: (head, body) => {
      sph(0.1, '#e2c49b', 0, -0.08, 0.22, head, 12).scale.set(1.3, 0.8, 0.8);
      box(0.05, 0.05, 0.02, '#ffffff', -0.03, -0.17, 0.29, head); box(0.05, 0.05, 0.02, '#ffffff', 0.03, -0.17, 0.29, head);
      const hat = mesh(new THREE.SphereGeometry(0.24, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), M('#f2c94c'), 0, 0.14, -0.01, head);
      void hat;
      cyl(0.27, 0.27, 0.025, '#f2c94c', 0, 0.14, 0.03, head, 18);
      const tail = box(0.18, 0.04, 0.3, '#6b4a2b', 0, 0.08, -0.25, body); tail.rotation.x = -0.3;
    },
  });
}

// Fennel, the postmaster of the town square: a fox in a blue cap.
function makeFennel() {
  return makeCritter({
    fur: '#e8873a', top: ['#3f6fb0', '#f6ecd6'], ears: false, feet: '#5a3a2a',
    extra: (head, body, fur) => {
      for (const s of [-1, 1]) { const e = mesh(new THREE.ConeGeometry(0.09, 0.2, 4), fur, s * 0.17, 0.27, -0.02, head); e.rotation.z = s * -0.35; }
      sph(0.11, '#fff3e4', 0, -0.1, 0.2, head, 12).scale.set(1.4, 0.75, 0.9);
      sph(0.03, '#2a2320', 0, -0.06, 0.32, head, 8);
      cyl(0.24, 0.26, 0.1, '#2f5f9e', 0, 0.22, 0, head, 18);
      box(0.3, 0.025, 0.14, '#2a4a7a', 0, 0.18, 0.2, head);
      const tail = sph(0.11, fur, 0, 0.18, -0.22, body, 10); tail.scale.set(0.8, 0.8, 1.6);
    },
  });
}
// Pepper, the cook on market street: a hedgehog in a chef's hat.
function makePepper() {
  return makeCritter({
    fur: '#f1d3a8', top: ['#ffffff', '#f2ece0'], feet: '#6b4a2b', innerEar: '#e9b28c',
    extra: (head) => {
      const spike = M('#7a5638');
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 1.4 - Math.PI * 0.7, b = 0.3 + (i % 3) * 0.25;
        const c = mesh(new THREE.ConeGeometry(0.06, 0.18, 6), spike, Math.sin(a) * 0.24, Math.cos(b) * 0.18 + 0.02, -0.18 - Math.cos(a) * 0.05, head);
        c.rotation.set(-1.0 - b * 0.3, 0, -Math.sin(a) * 0.8);
      }
      sph(0.035, '#2a2320', 0, -0.06, 0.31, head, 8);
      cyl(0.17, 0.15, 0.16, '#ffffff', 0, 0.32, -0.02, head, 16);
      sph(0.2, '#ffffff', 0, 0.44, -0.02, head, 14).scale.set(1, 0.6, 1);
    },
  });
}
// Sage, the professor on observatory hill: a tortoise with glasses and a bow tie.
function makeSage() {
  return makeCritter({
    fur: '#9cc77a', top: ['#c9a06a', '#b98d58'], ears: false, feet: '#7aa45a',
    extra: (head, body) => {
      for (const x of [-0.1, 0.1]) mesh(new THREE.TorusGeometry(0.06, 0.01, 6, 18), M('#3a3020'), x, 0.02, 0.28, head);
      box(0.06, 0.012, 0.012, '#3a3020', 0, 0.03, 0.29, head);
      const shell = mesh(new THREE.SphereGeometry(0.24, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M('#6f8a3c'), 0, 0.12, -0.12, body);
      shell.rotation.x = -1.2; shell.scale.set(1, 1, 0.8);
      for (const sx of [-1, 1]) { const t = mesh(new THREE.ConeGeometry(0.05, 0.08, 3), M('#e5483b'), sx * 0.05, 0.36, 0.15, body); t.rotation.z = sx * Math.PI / 2; }
    },
  });
}

// ── The world ──────────────────────────────────────────────────────────
export class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#a8e3f7');
    this.scene.fog = new THREE.Fog('#a8e3f7', 38, 70);
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
    this.clock = new THREE.Clock();
    this.target = new THREE.Vector3(HOME[0] + 0.5, 0, HOME[1] - 1);
    this.built = new Map();
    this.occupied = new Set();
    this.ground = [];
    this.path = [];
    this.stick = new THREE.Vector2();   // joystick input, length 0..1
    this.anims = [];
    this.energy = 0;
    this.listeners = { creatureTap: [], itemTap: [], station: [] };

    LEAF_MAT = new THREE.MeshLambertMaterial({ map: leafTex('#4cae3f', '#6ccb52', '#3c9632') });
    LEAF_MAT_DARK = new THREE.MeshLambertMaterial({ color: '#3f8f4a' });

    this._lights();
    this._terrain();
    this._decor();
    this.creature = makeCreature();
    this.scene.add(this.creature);
    this.pos = new THREE.Vector3(HOME[0] + 0.5, 0, HOME[1] + 0.5);
    this.creature.position.copy(this.pos);
    this.state = 'idle';
    this.idleTimer = 2;
    this._input();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.renderer.setAnimationLoop(() => this._tick());
  }

  on(evt, cb) { this.listeners[evt].push(cb); }
  _emit(evt, ...a) { this.listeners[evt].forEach((cb) => cb(...a)); }

  _lights() {
    const hemi = new THREE.HemisphereLight('#fff6e0', '#6a9a50', 1.6);
    this.scene.add(hemi);
    const sun = new THREE.DirectionalLight('#fff1d6', 2.4);
    sun.position.set(-6, 14, 8);
    sun.target.position.set(0, 0, 0);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera; sc.left = -14; sc.right = 14; sc.top = 14; sc.bottom = -14; sc.near = 1; sc.far = 50;
    sun.shadow.bias = -0.0008;
    sun.shadow.normalBias = 0.02;
    this.sun = sun;
    this.scene.add(sun, sun.target);
  }

  _terrain() {
    const grassTop = new THREE.MeshLambertMaterial({ map: grassTex() });
    const plateauTop = new THREE.MeshLambertMaterial({ map: plateauGrassTex() });
    const pathTop = new THREE.MeshLambertMaterial({ map: speckleTex('#dcb978', '#ecd29a', '#c49a5e', 9) });
    const sandTop = new THREE.MeshLambertMaterial({ map: speckleTex('#f3e3b3', '#fbf1d0', '#e2cd92', 13) });
    const seabed = M('#d9c48f');
    const cliff = new THREE.MeshLambertMaterial({ map: cliffTex() });
    const sandSide = M('#e2cd92');
    const bottom = M('#6b4a2b');
    const BOT = -1.6;
    const groups = {
      '.': { top: grassTop, side: cliff, list: [] },
      '#': { top: pathTop, side: cliff, list: [] },
      c: { top: new THREE.MeshLambertMaterial({ map: cobbleTex() }), side: cliff, list: [] },
      H: { top: plateauTop, side: cliff, list: [] },
      s: { top: sandTop, side: sandSide, list: [] },
      w: { top: seabed, side: sandSide, list: [] },
    };
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
      const t = tileAt(x, z);
      if (t === 'S') continue;
      groups[t].list.push([x, z]);
    }
    const tmp = new THREE.Object3D();
    const col = new THREE.Color();
    for (const [t, grp] of Object.entries(groups)) {
      const h = HEIGHT[t];
      const geo = new THREE.BoxGeometry(1, h - BOT, 1);
      geo.translate(0, (h + BOT) / 2, 0);
      const mats = [grp.side, grp.side, grp.top, bottom, grp.side, grp.side];
      const inst = new THREE.InstancedMesh(geo, mats, grp.list.length);
      inst.receiveShadow = true;
      grp.list.forEach(([x, z], i) => {
        tmp.position.set(x + 0.5, 0, z + 0.5);
        tmp.updateMatrix();
        inst.setMatrixAt(i, tmp.matrix);
        // A faint checkerboard, a nod to classic tile grids.
        const k = (x + z) % 2 ? 1.0 : 0.965;
        inst.setColorAt(i, col.setRGB(k, k, k));
      });
      this.scene.add(inst);
      this.ground.push(inst);
    }
    // stairs
    for (let z = 0; z < D; z++) for (let x = 0; x < W; x++) {
      if (tileAt(x, z) !== 'S') continue;
      for (let k = 0; k < 3; k++) {
        const top = 1 - (k + 1) / 3 + 0.17;
        const geo = new THREE.BoxGeometry(1, top - BOT, 1 / 3);
        const m = new THREE.Mesh(geo, [cliff, cliff, pathTop, bottom, M('#c49a5e'), cliff]);
        m.position.set(x + 0.5, (top + BOT) / 2, z + k / 3 + 1 / 6);
        m.receiveShadow = true;
        this.scene.add(m);
        this.ground.push(m);
      }
    }
    // water
    const wt = waterTex(); wt.repeat.set(10, 10);
    this.waterTex = wt;
    const water = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshLambertMaterial({ map: wt, transparent: true, opacity: 0.88 }));
    water.rotation.x = -Math.PI / 2; water.position.set(W / 2, -0.32, D / 2);
    water.receiveShadow = true;
    this.scene.add(water);
    // backdrop: more plateau behind and beside, so edges read as land
    const backTop = new THREE.Mesh(new THREE.BoxGeometry(60, 2.6, 20), [cliff, cliff, plateauTop, bottom, cliff, cliff]);
    backTop.position.set(W / 2, -0.3, -10); this.scene.add(backTop);
    for (const sx of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.BoxGeometry(20, 1.6, D - 3), [cliff, cliff, grassTop, bottom, cliff, cliff]);
      side.position.set(sx < 0 ? -10 : W + 10, -0.8, (D - 3) / 2);
      side.receiveShadow = true;
      this.scene.add(side);
    }
  }

  _districtDecor() {
    const lamp = (x, z, y = 0) => {
      const g = new THREE.Group();
      cyl(0.035, 0.05, 1.2, '#33363d', 0, 0.6, 0, g, 8);
      sph(0.11, new THREE.MeshLambertMaterial({ color: '#fff3c4', emissive: '#ffd36b', emissiveIntensity: 0.5 }), 0, 1.28, 0, g, 10);
      mesh(new THREE.ConeGeometry(0.15, 0.1, 10), M('#33363d'), 0, 1.4, 0, g);
      g.position.set(x, y, z); this.scene.add(g);
    };
    // town square: lamps at the plaza corners
    lamp(8.1, 9.9); lamp(12.9, 9.9);
    // observatory hill: lamps by the stairs
    lamp(4.5, 3.6, 1); lamp(15.5, 3.7, 1);
    // market street: bunting strung along the south path
    const flagCols = ['#e5483b', '#f2c94c', '#3fa7b8', '#4a9b6e', '#e27fb0'];
    for (const x of [10.06, 10.94]) {
      for (const z of [12.0, 15.0, 18.0]) cyl(0.03, 0.03, 1.7, '#8a5a35', x, 0.85, z, this.scene, 6);
      for (let seg = 0; seg < 2; seg++) {
        const z0 = 12 + seg * 3;
        for (let i = 0; i < 9; i++) {
          const t = (i + 0.5) / 9, z = z0 + t * 3, y = 1.62 - Math.sin(t * Math.PI) * 0.25;
          const f = mesh(new THREE.ConeGeometry(0.07, 0.14, 3), M(flagCols[(i + seg) % 5]), x, y - 0.07, z, this.scene);
          f.rotation.z = Math.PI; f.rotation.y = Math.PI / 2; f.castShadow = false;
        }
      }
    }
    // arts corner: a low white picket fence along the road
    for (let x = 0; x < 2; x++) {
      const g = new THREE.Group();
      for (let i = 0; i < 4; i++) box(0.06, 0.32, 0.04, '#fbf6ec', -0.4 + i * 0.27, 0.16, 0, g);
      box(1, 0.05, 0.03, '#fbf6ec', 0, 0.2, 0, g);
      g.position.set(x + 0.5, 0, 10.9); this.scene.add(g);
    }
    // fish pond: a clearer water surface so the fish show, and a stone rim
    const pond = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), new THREE.MeshLambertMaterial({ color: '#7fd3e8', transparent: true, opacity: 0.45 }));
    pond.rotation.x = -Math.PI / 2; pond.position.set(16.5, -0.1, 16.0); this.scene.add(pond);
    this.pondFish = [];
  }
  // Caught species swim in the pond.
  setPondFish(colors) {
    for (const f of this.pondFish) this.scene.remove(f);
    this.pondFish = colors.map((c, i) => {
      const f = fishMesh(c); f.scale.setScalar(0.55);
      f.userData = { r: 0.35 + (i % 3) * 0.2, speed: 0.4 + (i % 4) * 0.15, phase: i * 1.3, dir: i % 2 ? 1 : -1 };
      this.scene.add(f);
      return f;
    });
  }

  _place(obj, x, z, block = true) {
    obj.position.set(x + 0.5, tileH(x, z), z + 0.5);
    this.scene.add(obj);
    if (block) this.occupied.add(`${x},${z}`);
    return obj;
  }

  _decor() {
    this.sways = [];
    const c = cottage();
    c.position.set(10.5, 0, 6.0); this.scene.add(c);
    for (const x of [9, 10, 11]) for (const z of [5, 6]) this.occupied.add(`${x},${z}`);
    this._place(mailbox(), 9, 7);
    this.stations = new Map();
    this.keepers = new Map();
    for (const [id, st] of Object.entries(STATIONS)) {
      const m = st.model();
      m.position.set(st.at[0], 0, st.at[1]);
      m.traverse((o) => { o.userData.station = id; });
      this.scene.add(m);
      this.stations.set(id, m);
      st.tiles.forEach(([x, z]) => this.occupied.add(`${x},${z}`));
      if (!st.keeper) continue;
      const k = st.keeper();
      const [kx, kz] = st.keeperAt;
      k.position.set(kx + 0.5, tileH(kx, kz), kz + 0.5);
      k.rotation.y = 0.35 * (kx > st.approach[0] ? -1 : 1);
      k.traverse((o) => { o.userData.station = id; });
      k.userData.phase = Math.random() * 6;
      const R = ROUTINES[id];
      if (R) {
        const prop = keeperProp(R.act);
        if (R.act === 'stir') k.add(prop); else k.userData.body.add(prop);
        k.userData.ai = { ...R, prop, at: 0, mode: 'act', timer: 2 + Math.random() * 3, target: null };
      }
      this.scene.add(k);
      this.keepers.set(id, k);
      this.occupied.add(`${kx},${kz}`);
    }
    const trees = [[21, 6, '#ff9f1c'], [0, 12, '#e8312f'], [21, 17, '#e8312f'], [6, 17, '#ff9f1c'], [3, 17, null], [19, 5, null], [17, 17, '#e8312f']];
    trees.forEach(([x, z, f], i) => { const t = this._place(tree(f, i + 3), x, z); this.sways.push(t); });
    // backdrop trees on the terrace and beyond
    for (let x = -4; x < W + 4; x += 1) {
      const r = rng(x * 31 + 7);
      const z = r() * 0.8;
      const t = r() < 0.45 ? conifer(x + 50) : tree(r() < 0.5 ? null : '#e8312f', x + 100);
      t.position.set(x + 0.5 + (r() - 0.5) * 0.4, 1, z + 0.2);
      t.scale.setScalar(0.9 + r() * 0.35);
      this.scene.add(t);
      if (x >= 0 && x < W) this.occupied.add(`${x},0`);
      const t2 = r() < 0.6 ? conifer(x + 80) : tree(null, x + 140);
      t2.position.set(x + 0.5, 1.2, -1.2 - r() * 1.5); t2.scale.setScalar(1.1 + r() * 0.4);
      this.scene.add(t2);
    }
    for (const sx of [-1, W]) for (let z = 3; z < 16; z += 1.3) {
      const r = rng(z * 13 + sx);
      const t = tree(r() < 0.5 ? '#e8312f' : null, Math.floor(z * 7 + sx));
      t.position.set(sx + 0.5 + (sx < 0 ? -r() * 1.5 : r() * 1.5), 0, z + r() * 0.5);
      this.scene.add(t);
    }
    [[0, 5, 1], [2, 6, 2], [0, 7, 3], [2, 8, 4], [4, 6, 5], [1, 12, 6], [5, 15, 7], [7, 13, 8], [8, 6, 9], [13, 6, 10], [20, 10, 11], [17, 13, 12]].forEach(([x, z, s]) => {
      const f = flowerCluster(s); f.position.set(x + 0.5, 0, z + 0.5); this.scene.add(f);
    });
    // little grass tufts scattered over open grass (non-blocking)
    const tuftGeo = new THREE.ConeGeometry(0.035, 0.16, 4);
    const spots = [];
    const tr = rng(99);
    const slotTiles = new Set(ITEMS.map((i) => i.slot.join(',')));
    for (let z = 1; z < 16; z++) for (let x = 0; x < W; x++) {
      const t = tileAt(x, z);
      if ((t !== '.' && t !== 'H') || this.occupied.has(`${x},${z}`) || slotTiles.has(`${x},${z}`) || tr() > 0.35) continue;
      const cx = x + 0.2 + tr() * 0.6, cz = z + 0.2 + tr() * 0.6;
      for (let k = 0; k < 3; k++) spots.push([cx + (k - 1) * 0.05, tileH(x, z), cz + (tr() - 0.5) * 0.04, (k - 1) * 0.35]);
    }
    const tufts = new THREE.InstancedMesh(tuftGeo, M('#4f9e38'), spots.length);
    const o = new THREE.Object3D();
    spots.forEach(([x, y, z, rz], i) => { o.position.set(x, y + 0.07, z); o.rotation.set(0, 0, rz); o.updateMatrix(); tufts.setMatrixAt(i, o.matrix); });
    this.scene.add(tufts);
    this._place(rock(), 20, 18);
    this._place(rock(), 20, 3);
    this._districtDecor();
  }

  // ── Public API ───────────────────────────────────────────────────────
  setEnergy(e) {
    this.energy = e;
    if (e <= 0 && this.state === 'idle') this._goNap();
    if (e > 0 && this.state === 'nap') this._wake();
  }

  placeBuilt(id, animate = false, stage = 3) {
    const item = ITEM_BY_ID[id];
    if (!item || this.built.has(id) || !BUILDERS[id]) return;
    const obj = BUILDERS[id](stage);
    obj.userData.stage = stage;
    obj.userData.itemId = id;
    obj.traverse((o) => { o.userData.itemId = id; });
    const [x, z] = item.slot;
    this._place(obj, x, z);
    this.built.set(id, obj);
    if (animate) {
      obj.scale.setScalar(0.001);
      this._anim(0.7, (t) => {
        const s = t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.cos(t * 10);
        obj.scale.setScalar(Math.max(0.001, s));
      });
      this._puff(obj.position);
    }
  }

  // Regrow a signature item at a new stage (mastery went up).
  setStage(id, stage, animate = true) {
    const old = this.built.get(id);
    if (!old || old.userData.stage === stage) return;
    this.scene.remove(old);
    this.built.delete(id);
    const [x, z] = ITEM_BY_ID[id].slot;
    this.occupied.delete(`${x},${z}`);
    this.placeBuilt(id, animate, stage);
  }

  build(id, done, stage = 1) {
    const item = ITEM_BY_ID[id];
    if (!item) return;
    if (this.state === 'nap') this._wake();
    this.stick.set(0, 0);
    const [sx, sz] = item.slot;
    const site = new THREE.Vector3(sx + 0.5, tileH(sx, sz), sz + 0.5);
    const hammer = () => {
      this.state = 'build';
      this._faceToward(site);
      const { hammer: tool, arms } = this.creature.userData;
      tool.visible = true;
      let hits = 0;
      this._anim(1.8, (t) => {
        const swing = Math.sin(t * Math.PI * 8);
        tool.rotation.x = -1.2 + swing * 1.1;
        arms[1].position.y = 0.22 + swing * 0.04;
        const h = Math.floor(t * 4);
        if (h > hits) { hits = h; this._puff(site, 0.4); }
        if (t === 1) {
          tool.visible = false;
          this.placeBuilt(id, true, stage);
          this.state = 'idle';
          this.idleTimer = 4;
          this.hop();
          done && done();
        }
      });
    };
    const path = this._findPath(this._tileOf(this.pos), (x, z) => Math.abs(x - sx) + Math.abs(z - sz) === 1);
    if (path && path.length > 1) this._walk(path, hammer);
    else hammer();
  }

  hop() {
    const { body } = this.creature.userData;
    this._anim(0.5, (t) => { body.position.y = Math.sin(t * Math.PI) * 0.35; });
  }

  creatureScreenPos() {
    const v = this.creature.position.clone(); v.y += 1.45;
    v.project(this.camera);
    const r = this.canvas.getBoundingClientRect();
    return { x: (v.x * 0.5 + 0.5) * r.width + r.left, y: (-v.y * 0.5 + 0.5) * r.height + r.top };
  }

  // Small 3D picture of a buildable, for the workbench list.
  thumbnail(id, stage = 3) {
    this._thumbs = this._thumbs || new Map();
    const key = `${id}:${stage}`;
    if (this._thumbs.has(key)) return this._thumbs.get(key);
    if (!BUILDERS[id]) return '';
    if (!this._tr) {
      const c = document.createElement('canvas'); c.width = c.height = 160;
      this._tr = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true, preserveDrawingBuffer: true });
      this._tr.setSize(160, 160, false);
      this._ts = new THREE.Scene();
      this._ts.add(new THREE.HemisphereLight('#fff6e0', '#9aa07a', 2.2));
      const d = new THREE.DirectionalLight('#fff1d6', 2.2); d.position.set(-2, 4, 3); this._ts.add(d);
      this._tc = new THREE.PerspectiveCamera(28, 1, 0.05, 50);
    }
    const m = BUILDERS[id](stage);
    this._ts.add(m);
    const bb = new THREE.Box3().setFromObject(m);
    const size = bb.getSize(new THREE.Vector3()), center = bb.getCenter(new THREE.Vector3());
    const r = Math.max(size.x, size.y, size.z);
    const dist = r * 2.3 + 0.2;
    this._tc.position.set(center.x + dist * 0.35, center.y + dist * 0.5, center.z + dist * 0.8);
    this._tc.lookAt(center);
    this._tr.render(this._ts, this._tc);
    const url = this._tr.domElement.toDataURL();
    this._ts.remove(m);
    this._thumbs.set(key, url);
    return url;
  }

  // ── Keepers' little routines ───────────────────────────────────────
  _keeperTick(k, dt, time) {
    const u = k.userData, ai = u.ai;
    const { body, head, arms, hammer } = u;
    const blink = ((time + u.phase) % 4.5) < 0.12;
    u.eyes.forEach((e) => { e.scale.y = blink ? 0.2 : 1.15; });
    const turnTo = (x, z, rate = 6) => {
      const want = Math.atan2(x - k.position.x, z - k.position.z);
      const d = Math.atan2(Math.sin(want - k.rotation.y), Math.cos(want - k.rotation.y));
      k.rotation.y += d * Math.min(1, dt * rate);
    };
    const rest = () => {
      body.position.y = Math.sin(time * 2.2 + u.phase) * 0.015; body.rotation.z *= 0.85;
      head.rotation.x *= 0.85; head.rotation.y *= 0.85;
      arms[0].position.set(-0.17, 0.22, 0.02); arms[1].position.set(0.17, 0.22, 0.02);
      hammer.visible = false;
    };
    if (!ai) { rest(); return; }
    // Pip is close: stop, put things down, look at Pip
    const pipNear = Math.hypot(this.pos.x - k.position.x, this.pos.z - k.position.z) < 2.2 || time < (u.greetUntil || 0);
    if (pipNear) {
      ai.prop.visible = false; rest();
      turnTo(this.pos.x, this.pos.z);
      if (!ai.waved) { ai.waved = true; ai.waveEnd = time + 1.0; }
      if (time < ai.waveEnd) {
        const w = 1 - (ai.waveEnd - time);
        arms[1].position.y = 0.22 + Math.sin(w * Math.PI) * 0.22;
        arms[1].position.x = 0.17 + Math.sin(w * Math.PI * 6) * 0.03 * Math.sin(w * Math.PI);
      }
      return;
    }
    ai.waved = false;
    ai.timer -= dt;
    if (ai.mode === 'walk') {
      ai.prop.visible = ai.act === 'letters';
      const [tx, tz] = ai.target;
      const dx = tx - k.position.x, dz = tz - k.position.z, dist = Math.hypot(dx, dz);
      const step = 0.9 * dt;
      turnTo(tx, tz, 8);
      if (dist <= step) { k.position.x = tx; k.position.z = tz; ai.mode = 'act'; ai.timer = 3 + Math.random() * 4; }
      else { k.position.x += (dx / dist) * step; k.position.z += (dz / dist) * step; }
      k.position.y = tileH(Math.floor(k.position.x), Math.floor(k.position.z));
      body.rotation.z = Math.sin(time * 12) * 0.035;
      body.position.y = Math.abs(Math.sin(time * 12)) * 0.035;
      hammer.visible = false;
      return;
    }
    // doing their thing
    if (ai.timer <= 0) {
      const options = ai.points.map((p, i) => i).filter((i) => i !== ai.at);
      ai.at = options[Math.floor(Math.random() * options.length)];
      ai.target = ai.points[ai.at];
      ai.mode = 'walk';
      return;
    }
    rest();
    if (ai.face && ai.at === 0) turnTo(ai.face[0], ai.face[1]);
    else turnTo(this.camera.position.x, this.camera.position.z, 2);
    ai.prop.visible = true;
    const t = time + u.phase;
    switch (ai.act) {
      case 'read':
        head.rotation.x = 0.35;
        arms[0].position.set(-0.11, 0.3, 0.18); arms[1].position.set(0.11, 0.3, 0.18);
        if ((t % 3) < 0.3) ai.prop.rotation.z = Math.sin((t % 3) / 0.3 * Math.PI) * 0.2;
        break;
      case 'exercise': { // jumping jacks
        const j = Math.abs(Math.sin(t * 5));
        body.position.y = j * 0.12;
        arms[0].position.set(-0.17 - j * 0.06, 0.22 + j * 0.28, 0.02); arms[1].position.set(0.17 + j * 0.06, 0.22 + j * 0.28, 0.02);
        ai.prop.visible = false;
        break;
      }
      case 'hammer': {
        hammer.visible = true; ai.prop.visible = false;
        const sw = Math.sin(t * 7);
        hammer.rotation.x = -1.2 + sw * 1.0;
        arms[1].position.y = 0.22 + sw * 0.04;
        break;
      }
      case 'letters':
        if (ai.at === 0) { arms[1].position.set(0.15, 0.36 + Math.sin(t * 3) * 0.03, 0.12); ai.prop.position.set(0.15, 0.42, 0.16); }
        else { arms[1].position.set(0.2, 0.28, 0.1); ai.prop.position.set(0.2, 0.3, 0.12); }
        break;
      case 'stir':
        ai.prop.visible = ai.at === 0;
        if (ai.at === 0) {
          head.rotation.x = 0.3;
          const a = t * 3;
          ai.prop.userData.ladle.position.set(0.03 + Math.cos(a) * 0.04, 0.2, Math.sin(a) * 0.04);
          arms[1].position.set(0.08 + Math.cos(a) * 0.04, 0.3, 0.2 + Math.sin(a) * 0.04);
        } else { head.rotation.y = Math.sin(t * 0.8) * 0.4; }
        break;
      case 'stargaze':
        if ((t % 8) < 4) { head.rotation.x = -0.45; ai.prop.visible = false; }
        else { arms[1].position.set(0.14 + Math.sin(t * 6) * 0.04, 0.34 + Math.cos(t * 9) * 0.02, 0.14); ai.prop.position.copy(arms[1].position); }
        break;
    }
  }

  // ── Fishing ─────────────────────────────────────────────────────────
  fishStart() {
    this.state = 'fish';
    this.faceAngle = 0;
    const { body } = this.creature.userData;
    if (!this.rod) {
      this.rod = new THREE.Group();
      const pole = cyl(0.012, 0.02, 1.1, '#8a5a35', 0, 0.55, 0, this.rod, 6); void pole;
      this.rodTip = new THREE.Object3D(); this.rodTip.position.y = 1.1; this.rod.add(this.rodTip);
      this.rod.position.set(0.17, 0.2, 0.08); this.rod.rotation.x = 0.9;
      this.bobber = new THREE.Group();
      sph(0.06, '#e5483b', 0, 0.03, 0, this.bobber, 10);
      sph(0.045, '#ffffff', 0, 0.08, 0, this.bobber, 10);
      this.line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: '#ffffff' }));
      this.scene.add(this.bobber, this.line);
    }
    body.add(this.rod);
    this.rod.visible = this.bobber.visible = this.line.visible = true;
    const from = this.pos.clone().add(new THREE.Vector3(0.2, 1.4, 0.3));
    const to = new THREE.Vector3(this.pos.x + 0.1, -0.3, this.pos.z + 2.0);
    this.bobberRest = to.clone();
    this.biting = false;
    this.casting = true;
    this._anim(0.3, (t) => { this.rod.rotation.x = 0.9 - Math.sin(t * Math.PI) * 1.4; });
    this._anim(0.7, (t) => {
      this.bobber.position.lerpVectors(from, to, t);
      this.bobber.position.y = from.y + (to.y - from.y) * t + Math.sin(t * Math.PI) * 0.8;
      if (t === 1) { this.casting = false; this._marker(Math.floor(to.x), Math.floor(to.z), to); }
    });
  }
  fishBite(on = true) { this.biting = on; }
  fishEnd(color) {
    this.biting = false;
    if (this.rod) this.rod.visible = this.bobber.visible = this.line.visible = false;
    this.state = 'idle'; this.idleTimer = 5;
    if (!color) return;
    const f = fishMesh(color);
    this.scene.add(f);
    this.hop();
    this._anim(2.6, (t) => {
      f.position.set(this.pos.x, this.pos.y + 1.55 + Math.sin(t * Math.PI * 6) * 0.03, this.pos.z + 0.1);
      f.rotation.z = Math.sin(t * Math.PI * 10) * 0.25 * (1 - t);
      f.scale.setScalar(t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1);
      if (t === 1) this.scene.remove(f);
    });
  }

  // ── Movement ─────────────────────────────────────────────────────────
  _tileOf(p) { return [Math.floor(p.x), Math.floor(p.z)]; }
  _walkable(x, z) { return (tileAt(x, z) !== 'w' || DOCK.has(`${x},${z}`)) && !this.occupied.has(`${x},${z}`); }
  // Height of the ground under a point; stairs are a smooth ramp.
  _groundY(x, z) {
    const tx = Math.floor(x), tz = Math.floor(z);
    if (tileAt(tx, tz) === 'S') return 1 - (z - tz);
    return tileH(tx, tz);
  }
  // Can Pip stand at (x, z), coming from tile (fx, fz)? Checks a small radius.
  _canStand(x, z, fx, fz) {
    const R = 0.2;
    for (const [ox, oz] of [[0, 0], [R, R], [R, -R], [-R, R], [-R, -R]]) {
      const tx = Math.floor(x + ox), tz = Math.floor(z + oz);
      if (tx === fx && tz === fz) continue;
      if (!this._walkable(tx, tz)) return false;
      if (Math.abs(tileH(tx, tz) - tileH(fx, fz)) > 0.6) return false;
    }
    return true;
  }
  _findPath([sx, sz], isGoal) {
    const key = (x, z) => `${x},${z}`;
    const prev = new Map([[key(sx, sz), null]]);
    const q = [[sx, sz]];
    while (q.length) {
      const [x, z] = q.shift();
      if (isGoal(x, z) && this._walkable(x, z)) {
        const out = []; let k = key(x, z);
        while (k) { out.unshift(k.split(',').map(Number)); k = prev.get(k); }
        return out;
      }
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz, nk = key(nx, nz);
        if (prev.has(nk) || !this._walkable(nx, nz)) continue;
        if (Math.abs(tileH(nx, nz) - tileH(x, z)) > 0.6) continue;
        prev.set(nk, key(x, z));
        q.push([nx, nz]);
      }
    }
    return null;
  }
  _walk(path, onArrive) {
    this.state = 'walk';
    this.path = path.slice(1).map(([x, z]) => new THREE.Vector3(x + 0.5, 0, z + 0.5));
    this.onArrive = onArrive;
  }
  // Walk to a station, then announce arrival (the app opens its screen).
  visit(id) {
    const st = STATIONS[id];
    if (!st || this.state === 'build') return;
    if (this.state === 'nap') this._wake();
    this.stick.set(0, 0);
    const [ax, az] = st.approach;
    const arrive = () => {
      this.state = 'idle'; this.idleTimer = 6;
      const k = this.keepers.get(id);
      if (k) {
        this._faceToward(k.position);
        k.userData.greetUntil = this.clock.elapsedTime + 8;
      } else this.faceAngle = 0; // the dock: face the sea
      this.hop();
      this._emit('station', id);
    };
    const path = this._findPath(this._tileOf(this.pos), (x, z) => x === ax && z === az);
    if (path && path.length > 1) this._walk(path, arrive);
    else arrive();
  }
  // How far Pip is from a place (tiles), for proximity name tags.
  stationDistance(id) {
    const st = STATIONS[id];
    return Math.hypot(this.pos.x - (st.approach[0] + 0.5), this.pos.z - (st.approach[1] + 0.5));
  }
  keeperScreenPos(id, lift = 1.75) {
    const k = this.keepers.get(id);
    if (!k) return null;
    const v = k.position.clone(); v.y += lift;
    v.project(this.camera);
    const r = this.canvas.getBoundingClientRect();
    return { x: (v.x * 0.5 + 0.5) * r.width + r.left, y: (-v.y * 0.5 + 0.5) * r.height + r.top, visible: v.z < 1 && Math.abs(v.x) < 1 && Math.abs(v.y) < 1 };
  }
  stationScreenPos(id) {
    const st = STATIONS[id];
    const v = new THREE.Vector3(st.at[0], st.labelY, st.at[1]).project(this.camera);
    const r = this.canvas.getBoundingClientRect();
    return { x: (v.x * 0.5 + 0.5) * r.width + r.left, y: (-v.y * 0.5 + 0.5) * r.height + r.top, visible: v.z < 1 };
  }

  // Tap on the ground: walk to that tile (or the nearest reachable spot next to it).
  walkTo(x, z) {
    if (this.state === 'build') return;
    if (this.state === 'nap') this._wake();
    const exact = this._walkable(x, z);
    const path = this._findPath(this._tileOf(this.pos), exact
      ? (gx, gz) => gx === x && gz === z
      : (gx, gz) => Math.abs(gx - x) + Math.abs(gz - z) === 1);
    if (!path) return false;
    this._marker(x, z);
    if (path.length > 1) this._walk(path, () => { this.state = 'idle'; this.idleTimer = 4; });
    return true;
  }
  _faceToward(p) {
    const dx = p.x - this.pos.x, dz = p.z - this.pos.z;
    if (dx * dx + dz * dz > 1e-6) this.faceAngle = Math.atan2(dx, dz);
  }
  _stepAnim(time) {
    const { body } = this.creature.userData;
    body.rotation.z = Math.sin(time * 12) * 0.035;
    body.position.y = Math.abs(Math.sin(time * 12)) * 0.035;
  }
  _marker(x, z, at) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.3, 24), new THREE.MeshBasicMaterial({ color: '#fff8e4', transparent: true, opacity: 0.9 }));
    ring.rotation.x = -Math.PI / 2;
    if (at) ring.position.set(at.x, at.y + 0.04, at.z); else ring.position.set(x + 0.5, tileH(x, z) + 0.02, z + 0.5);
    this.scene.add(ring);
    this._anim(0.8, (t) => {
      ring.scale.setScalar(1 + t * 0.6);
      ring.material.opacity = 0.9 * (1 - t);
      if (t === 1) { this.scene.remove(ring); ring.geometry.dispose(); ring.material.dispose(); }
    });
  }

  // ── Moods ────────────────────────────────────────────────────────────
  _goNap() {
    this.state = 'nap';
    const { eyes, body } = this.creature.userData;
    eyes.forEach((e) => e.scale.set(1.1, 0.18, 0.6));
    body.rotation.x = 0.15;
    this.faceAngle = 0;
  }
  _wake() {
    this.state = 'idle';
    const { eyes, body } = this.creature.userData;
    eyes.forEach((e) => e.scale.set(0.85, 1.15, 0.6));
    body.rotation.x = 0;
    this.idleTimer = 0.5;
    this.hop();
  }
  _fidget() {
    // little in-place idle moments: look around, wave, or a happy hop
    const { head, arms } = this.creature.userData;
    const r = Math.random();
    if (r < 0.4) {
      const dir = Math.random() < 0.5 ? -1 : 1;
      this._anim(1.6, (t) => { head.rotation.y = Math.sin(t * Math.PI) * 0.6 * dir; });
    } else if (r < 0.75) {
      this._anim(1.2, (t) => {
        arms[0].position.y = 0.22 + Math.sin(t * Math.PI) * 0.22;
        arms[0].position.x = -0.17 - Math.sin(t * Math.PI) * 0.06 + Math.sin(t * Math.PI * 6) * 0.03 * Math.sin(t * Math.PI);
      });
    } else {
      this.hop();
    }
  }
  _blink() {
    const { eyes } = this.creature.userData;
    this._anim(0.18, (t) => { const k = t < 1 ? Math.max(0.15, Math.abs(1 - 2 * t)) : 1; eyes.forEach((e) => { e.scale.y = 1.15 * k; }); });
  }

  // ── Effects ──────────────────────────────────────────────────────────
  _anim(dur, fn) { this.anims.push({ t: 0, dur, fn }); }
  _puff(at, scale = 1) {
    for (let i = 0; i < 6; i++) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.1 * scale, 8, 6), new THREE.MeshLambertMaterial({ color: '#ffffff', transparent: true, opacity: 0.9 }));
      const a = (i / 6) * Math.PI * 2;
      p.position.set(at.x, (at.y || 0) + 0.15, at.z);
      this.scene.add(p);
      this._anim(0.6, (t) => {
        p.position.x = at.x + Math.cos(a) * t * 0.6;
        p.position.z = at.z + Math.sin(a) * t * 0.6;
        p.position.y = (at.y || 0) + 0.15 + t * 0.3;
        p.scale.setScalar(1 + t);
        p.material.opacity = 0.9 * (1 - t);
        if (t === 1) { this.scene.remove(p); p.geometry.dispose(); p.material.dispose(); }
      });
    }
  }

  // ── Camera & input ──────────────────────────────────────────────────
  resize() {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    const vis = w < h ? 9 : 14; // tiles visible across
    this.dist = Math.max(12, Math.min(40, vis / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.aspect)));
    this.camera.updateProjectionMatrix();
  }
  _input() {
    const el = this.canvas;
    const ray = new THREE.Raycaster();
    const ui = document.createElement('div');
    ui.className = 'stick';
    ui.innerHTML = '<i></i>';
    document.body.appendChild(ui);
    const knob = ui.firstChild;
    const RADIUS = 55;
    let down = null;
    el.addEventListener('pointerdown', (e) => {
      if (down) return;
      down = { id: e.pointerId, x: e.clientX, y: e.clientY, drag: false };
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e) => {
      if (!down || e.pointerId !== down.id) return;
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!down.drag && Math.hypot(dx, dy) > 14) {
        if (this.state === 'build') return;
        down.drag = true;
        if (this.state === 'nap') this._wake();
        this.path = []; this.onArrive = null;
        ui.style.left = `${down.x}px`; ui.style.top = `${down.y}px`;
        ui.classList.add('show');
      }
      if (!down.drag) return;
      const len = Math.hypot(dx, dy), k = Math.min(len, RADIUS) / (len || 1);
      knob.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
      this.stick.set(dx * k / RADIUS, dy * k / RADIUS);
    });
    const end = (e) => {
      if (!down || e.pointerId !== down.id) return;
      const wasDrag = down.drag;
      down = null;
      this.stick.set(0, 0);
      ui.classList.remove('show');
      knob.style.transform = '';
      if (wasDrag || e.type === 'pointercancel') return;
      const r = el.getBoundingClientRect();
      const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, this.camera);
      if (ray.intersectObject(this.creature, true).length) { this.hop(); this._emit('creatureTap'); return; }
      const st = ray.intersectObjects([...this.stations.values(), ...this.keepers.values()], true);
      if (st.length) { this.visit(st[0].object.userData.station); return; }
      const items = ray.intersectObjects([...this.built.values()], true);
      if (items.length) { this._emit('itemTap', items[0].object.userData.itemId); return; }
      const g = ray.intersectObjects(this.ground, false);
      if (g.length) {
        const p = g[0].point;
        // nudge into the tile whose top we hit (avoids landing on a cliff face)
        this.walkTo(Math.floor(p.x), Math.floor(p.z - 0.001));
      }
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  // ── Main loop ───────────────────────────────────────────────────────
  _tick() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const time = this.clock.elapsedTime;
    // animations
    for (const a of this.anims) { a.t = Math.min(1, a.t + dt / a.dur); a.fn(a.t); }
    this.anims = this.anims.filter((a) => a.t < 1);

    // creature brain
    const c = this.creature;
    const { body, head, arms } = c.userData;
    const steering = this.stick.lengthSq() > 0.02 && this.state !== 'build';
    if (steering) {
      // screen up = away from camera (-z); camera has no yaw, so this maps directly
      const speed = 2.8 * Math.min(1, this.stick.length());
      const dir = new THREE.Vector3(this.stick.x, 0, this.stick.y).normalize();
      const [fx, fz] = this._tileOf(this.pos);
      const nx = this.pos.x + dir.x * speed * dt, nz = this.pos.z + dir.z * speed * dt;
      if (this._canStand(nx, nz, fx, fz)) { this.pos.x = nx; this.pos.z = nz; }
      else if (this._canStand(nx, this.pos.z, fx, fz)) this.pos.x = nx;      // slide along walls
      else if (this._canStand(this.pos.x, nz, fx, fz)) this.pos.z = nz;
      this.faceAngle = Math.atan2(dir.x, dir.z);
      this.state = 'idle'; this.idleTimer = 4;
      this._stepAnim(time);
    } else if (this.state === 'walk') {
      const next = this.path[0];
      if (!next) { this.state = 'idle'; const cb = this.onArrive; this.onArrive = null; cb && cb(); }
      else {
        const d = next.clone().sub(this.pos); d.y = 0;
        const step = 2.4 * dt;
        this._faceToward(next);
        if (d.length() <= step) { this.pos.x = next.x; this.pos.z = next.z; this.path.shift(); }
        else { d.normalize().multiplyScalar(step); this.pos.add(d); }
        this._stepAnim(time);
      }
    } else if (this.state === 'idle') {
      body.rotation.z *= 0.9;
      body.position.y = Math.sin(time * 2.5) * 0.015;
      this.idleTimer -= dt;
      if (this.idleTimer <= 0) {
        if (this.energy <= 0) this._goNap();
        else { this._fidget(); this.idleTimer = 3 + Math.random() * 4; }
      }
      if (Math.random() < dt * 0.35) this._blink();
    } else if (this.state === 'fish') {
      body.rotation.z *= 0.9;
      body.position.y = Math.sin(time * 2) * 0.01;
    } else if (this.state === 'nap') {
      body.position.y = 0;
      head.position.y = 0.55 + Math.sin(time * 1.4) * 0.015;
      if (Math.floor(time * 0.8) !== this._lastZ) { this._lastZ = Math.floor(time * 0.8); this._zzz(); }
    }

    this.pos.y += (this._groundY(this.pos.x, this.pos.z) - this.pos.y) * Math.min(1, dt * 12);
    c.position.copy(this.pos);
    if (this.faceAngle !== undefined) {
      const diff = Math.atan2(Math.sin(this.faceAngle - c.rotation.y), Math.cos(this.faceAngle - c.rotation.y));
      c.rotation.y += diff * Math.min(1, dt * 10);
    }

    // keepers: gentle bob, blink, turn to face Pip when talking
    for (const k of this.keepers.values()) this._keeperTick(k, dt, time);

    if (this.rod && this.rod.visible) {
      if (this.bobberRest && !this.casting) {
        const dip = this.biting ? (Math.sin(time * 18) > 0.3 ? -0.12 : -0.02) : Math.sin(time * 2.5) * 0.015;
        this.bobber.position.set(this.bobberRest.x, this.bobberRest.y + dip, this.bobberRest.z);
      }
      const tip = this.rodTip.getWorldPosition(new THREE.Vector3());
      this.line.geometry.setFromPoints([tip, this.bobber.position.clone().add(new THREE.Vector3(0, 0.1, 0))]);
    }

    // fish swimming in the pond
    for (const f of this.pondFish || []) {
      const u = f.userData, a = time * u.speed * u.dir + u.phase;
      f.position.set(16.5 + Math.cos(a) * u.r * 1.4, -0.22, 16.0 + Math.sin(a) * u.r * 0.8);
      f.rotation.y = -a * 1 + (u.dir > 0 ? -Math.PI / 2 : Math.PI / 2);
    }

    // ambient life
    this.waterTex.offset.x = time * 0.01; this.waterTex.offset.y = Math.sin(time * 0.3) * 0.02;
    for (const t of this.sways) t.rotation.z = Math.sin(time * 0.8 + t.userData.sway) * 0.012;
    for (const [id, obj] of this.built) {
      const u = obj.userData;
      if (u.blink) u.blink.material.emissiveIntensity = (Math.sin(time * 4) > 0) ? 0.9 : 0.1;
      if (u.lanterns) u.lanterns.forEach((l) => { l.rotation.z = Math.sin(time * 1.3 + l.userData.phase) * 0.08; });
      if (u.jet) { u.jet.scale.set(1, 1 + Math.sin(time * 6) * 0.25, 1); }
      if (u.bead) { const p = (time * 0.6) % 1; u.bead.position.y = 1.1 - p * 0.85; u.bead.position.x = Math.sin(p * 30) * 0.03 * p; }
      if (u.sway !== undefined) obj.rotation.z = Math.sin(time * 0.8 + u.sway) * 0.012;
      if (u.spin) u.spin.rotation.y = time * 0.5;
      if (u.float) u.float.position.y = Math.sin(time * 0.9) * 0.08;
      if (u.nod) u.nod.rotation.z = Math.sin(time * 0.7) * 0.12;
      if (u.lidar) u.lidar.rotation.y = time * 4;
      if (u.drone) { u.drone.position.y = 1.0 + Math.sin(time * 2) * 0.08; u.drone.rotation.y = time; }
      if (u.glow) u.glow.material.emissiveIntensity = 0.6 + Math.sin(time * 5) * 0.25;
      if (u.arm) { u.arm.turn.rotation.y = Math.sin(time * 0.6) * 0.9; u.arm.shoulder.rotation.z = -0.5 + Math.sin(time * 0.9) * 0.25; u.arm.elbow.rotation.z = 1.4 + Math.sin(time * 1.1 + 1) * 0.3; }
      void id;
    }

    // camera — tilted top-down diorama
    const follow = new THREE.Vector3(
      Math.max(4.5, Math.min(W - 4.5, this.pos.x)), 0,
      Math.max(5, Math.min(D - 2.5, this.pos.z - 1)));
    this.target.lerp(follow, Math.min(1, dt * 3));
    const pitch = THREE.MathUtils.degToRad(42);
    this.camera.position.set(this.target.x, Math.sin(pitch) * this.dist, this.target.z + Math.cos(pitch) * this.dist);
    this.camera.lookAt(this.target.x, 0, this.target.z);
    this.sun.position.set(this.target.x - 6, 14, this.target.z + 8);
    this.sun.target.position.set(this.target.x, 0, this.target.z);

    this.renderer.render(this.scene, this.camera);
    if (this.onFrame) this.onFrame();
  }

  _zzz() {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    g.font = '800 44px "Baloo 2", sans-serif'; g.fillStyle = '#ffffff'; g.strokeStyle = '#4a3b33'; g.lineWidth = 6;
    g.strokeText('z', 16, 48); g.fillText('z', 16, 48);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
    s.scale.setScalar(0.3);
    const base = this.pos.clone().add(new THREE.Vector3(0.2, 0.95, 0));
    s.position.copy(base);
    this.scene.add(s);
    this._anim(2.2, (t) => {
      s.position.set(base.x + Math.sin(t * 6) * 0.1 + t * 0.2, base.y + t * 0.7, base.z);
      s.material.opacity = 1 - t;
      if (t === 1) { this.scene.remove(s); tex.dispose(); s.material.dispose(); }
    });
  }
}

export { ITEMS };
