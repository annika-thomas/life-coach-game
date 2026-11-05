// The island: a tilted-camera 2.5D tile diorama rendered with three.js.
// All models are built from primitives + small canvas textures, so there are
// no external art assets to load.
import * as THREE from '../vendor/three.module.min.js';
import { ITEMS, ITEM_BY_ID } from './items.js';

// ── Map ────────────────────────────────────────────────────────────────
// H plateau (raised terrace)   . grass   # dirt path   S stairs
// s sand                        w water
const MAP = [
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHHHHH',
  'HHHHHHHHHHHHSHHH',
  '............#...',
  '............#...',
  '......#.....#...',
  '......#.....#...',
  '......#######...',
  '......#.........',
  '......#.........',
  '..#########.....',
  '..#.......#..ww.',
  '..#.......#..ww.',
  '..#.......#.....',
  '..........#.....',
  'ss........#..sss',
  'ssssssssssssssss',
  'wwwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
];
const W = MAP[0].length;
const D = MAP.length;
const tileAt = (x, z) => (x < 0 || z < 0 || x >= W || z >= D ? 'w' : MAP[z][x]);
const HEIGHT = { H: 1, '.': 0, '#': 0, S: 0.5, s: -0.2, w: -0.8 };
const tileH = (x, z) => HEIGHT[tileAt(x, z)];

const HOME = [8, 10];    // where Pip stands

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
  easel: () => {
    const g = new THREE.Group();
    const wood = M('#b07a45');
    const l1 = box(0.05, 1.2, 0.05, wood, -0.2, 0.58, 0, g); l1.rotation.z = -0.12;
    const l2 = box(0.05, 1.2, 0.05, wood, 0.2, 0.58, 0, g); l2.rotation.z = 0.12;
    const l3 = box(0.05, 1.1, 0.05, wood, 0, 0.52, -0.22, g); l3.rotation.x = 0.35;
    box(0.55, 0.04, 0.1, wood, 0, 0.42, 0.04, g);
    box(0.5, 0.62, 0.04, '#f4ead2', 0, 0.76, 0.05, g);
    const canvas = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.58), new THREE.MeshLambertMaterial({ map: colourFieldTex() }));
    canvas.position.set(0, 0.76, 0.075); g.add(canvas);
    return g;
  },
  trellis: () => {
    const g = new THREE.Group();
    for (const x of [-0.4, 0.4]) box(0.07, 1.0, 0.07, '#8a5a35', x, 0.5, 0, g);
    for (const y of [0.45, 0.7, 0.95]) box(0.9, 0.03, 0.03, '#8a5a35', 0, y, 0, g);
    const r = rng(4);
    for (let i = 0; i < 12; i++) sph(0.09 + r() * 0.05, LEAF_MAT, (r() - 0.5) * 0.8, 0.45 + r() * 0.55, 0.04, g, 8);
    for (let i = 0; i < 4; i++) {
      const cx = -0.3 + i * 0.2, cy = 0.5 + r() * 0.3;
      for (let k = 0; k < 5; k++) sph(0.035, '#6a2c74', cx + (k % 2) * 0.04 - 0.02, cy - Math.floor(k / 2) * 0.05, 0.1, g, 6);
    }
    return g;
  },
  cheesecart: () => {
    const g = new THREE.Group();
    box(0.8, 0.35, 0.5, '#c98f55', 0, 0.42, 0, g);
    for (const x of [-0.3, 0.3]) { const w = cyl(0.17, 0.17, 0.05, '#7a4e2c', x, 0.17, 0.27, g, 14); w.rotation.x = Math.PI / 2; }
    for (const x of [-0.36, 0.36]) box(0.04, 0.6, 0.04, '#8a5a35', x, 0.9, -0.2, g);
    const aw = box(0.9, 0.04, 0.5, new THREE.MeshLambertMaterial({ map: stripeTex('#ffffff', '#f2c94c', 8) }), 0, 1.2, 0, g); aw.rotation.x = 0.25;
    for (const [x, h] of [[-0.2, 0.12], [0.12, 0.1], [0.26, 0.08]]) {
      cyl(0.13, 0.13, h, '#f6c445', x, 0.6 + h / 2, 0, g, 16);
    }
    cyl(0.09, 0.09, 0.08, '#f2a33a', -0.2, 0.76, 0, g, 16);
    return g;
  },
  galton: () => {
    const g = new THREE.Group();
    box(0.8, 1.2, 0.08, '#c98f55', 0, 0.6, 0, g);
    box(0.7, 1.05, 0.02, '#fdf6e6', 0, 0.65, 0.05, g);
    for (let row = 0; row < 6; row++) for (let k = 0; k <= row; k++) {
      sph(0.018, '#7a4e2c', (k - row / 2) * 0.09, 1.0 - row * 0.07, 0.07, g, 6);
    }
    const heights = [1, 2, 4, 6, 4, 2, 1];
    heights.forEach((h, i) => {
      for (let k = 0; k < h; k++) sph(0.03, '#e5483b', (i - 3) * 0.08, 0.18 + k * 0.055, 0.08, g, 6);
    });
    for (let i = 0; i <= 7; i++) box(0.01, 0.4, 0.03, '#7a4e2c', (i - 3.5) * 0.08, 0.32, 0.07, g);
    const bead = sph(0.03, '#e5483b', 0, 1.1, 0.08, g, 6);
    g.userData.bead = bead;
    return g;
  },
  robot: () => {
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
    return g;
  },
  cinema: () => {
    const g = new THREE.Group();
    for (const x of [-0.75, 0.75]) box(0.08, 1.4, 0.08, '#7a4e2c', x, 0.7, -0.2, g);
    box(1.6, 0.9, 0.06, '#3a3a44', 0, 1.0, -0.2, g);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 0.78), new THREE.MeshLambertMaterial({
      map: canvasTex(128, (c, s) => { const gr = c.createLinearGradient(0, 0, 0, s); gr.addColorStop(0, '#ffcf8a'); gr.addColorStop(1, '#ff7aa2'); c.fillStyle = gr; c.fillRect(0, 0, s, s); c.fillStyle = '#ffe9b8'; c.beginPath(); c.arc(s / 2, s * 0.62, 18, 0, Math.PI * 2); c.fill(); c.fillStyle = '#5a5f8f'; c.fillRect(0, s * 0.72, s, s); }),
      emissive: '#222222',
    }));
    scr.position.set(0, 1.0, -0.165); g.add(scr);
    for (const x of [-0.35, 0.35]) { cyl(0.13, 0.13, 0.25, '#e5483b', x, 0.13, 0.45, g, 12); }
    return g;
  },
  dressform: () => {
    const g = new THREE.Group();
    cyl(0.14, 0.18, 0.05, '#7a4e2c', 0, 0.03, 0, g, 12);
    cyl(0.02, 0.02, 0.5, '#7a4e2c', 0, 0.3, 0, g, 6);
    const torso = sph(0.17, '#f6d2c4', 0, 0.75, 0, g, 14); torso.scale.set(1, 1.2, 0.75);
    mesh(new THREE.ConeGeometry(0.28, 0.45, 16, 1, true), M('#e27fb0', { side: THREE.DoubleSide }), 0, 0.5, 0, g);
    cyl(0.04, 0.05, 0.08, '#f6d2c4', 0, 0.98, 0, g, 8);
    sph(0.04, '#7a4e2c', 0, 1.05, 0, g, 8);
    return g;
  },
  grill: () => {
    const g = new THREE.Group();
    box(0.7, 0.45, 0.45, '#c46a4a', 0, 0.23, 0, g);
    box(0.72, 0.05, 0.47, '#9e978b', 0, 0.47, 0, g);
    box(0.4, 0.04, 0.3, '#33363d', -0.1, 0.51, 0, g);
    cyl(0.1, 0.09, 0.12, '#4a4f5a', 0.2, 0.56, 0, g, 12);
    for (const [x, z] of [[-0.18, -0.06], [-0.05, 0.05]]) sph(0.05, '#e5483b', x, 0.55, z, g, 8);
    for (const x of [-0.25, 0.25]) { box(0.2, 0.14, 0.18, '#8a5a35', x, 0.07, 0.38, g); sph(0.1, LEAF_MAT, x, 0.2, 0.38, g, 8); }
    return g;
  },
  signpost: () => {
    const g = new THREE.Group();
    box(0.08, 1.1, 0.08, '#7a4e2c', 0, 0.55, 0, g);
    [['#3fa7b8', 0.95, 0.4], ['#f2c94c', 0.75, -0.6], ['#e5483b', 0.55, 1.6]].forEach(([c, y, rot]) => {
      const arm = new THREE.Group(); arm.position.y = y; arm.rotation.y = rot; g.add(arm);
      box(0.5, 0.13, 0.04, c, 0.25, 0, 0, arm);
      const tip = mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.04, 3), M(c), 0.52, 0, 0, arm); tip.rotation.x = Math.PI / 2; tip.rotation.y = Math.PI / 2;
    });
    return g;
  },
  kiosk: () => {
    const g = new THREE.Group();
    box(0.8, 0.5, 0.45, '#5aa0c8', 0, 0.25, 0, g);
    box(0.84, 0.05, 0.5, '#f4ead2', 0, 0.52, 0, g);
    for (const x of [-0.38, 0.38]) box(0.05, 0.6, 0.05, '#f4ead2', x, 0.85, -0.18, g);
    const aw = box(0.95, 0.05, 0.6, new THREE.MeshLambertMaterial({ map: stripeTex('#ffffff', '#e86a5c', 8) }), 0, 1.15, 0, g); aw.rotation.x = 0.3;
    for (let i = 0; i < 3; i++) box(0.18, 0.04 + i * 0.03, 0.24, '#fdfdfd', -0.25 + i * 0.25, 0.57 + i * 0.015, 0.05, g);
    return g;
  },
  column: () => {
    const g = new THREE.Group();
    box(0.5, 0.12, 0.5, '#e9e3d6', 0, 0.06, 0, g);
    cyl(0.17, 0.19, 1.0, M('#f4efe4', { flatShading: true }), 0, 0.62, 0, g, 12);
    box(0.46, 0.1, 0.46, '#e9e3d6', 0, 1.17, 0, g);
    box(0.36, 0.06, 0.36, '#e9e3d6', 0, 1.1, 0, g);
    cyl(0.16, 0.16, 0.28, '#e9e3d6', 0.45, 0.14, 0.25, g, 12);
    return g;
  },
  lanterns: () => {
    const g = new THREE.Group();
    box(0.07, 1.25, 0.07, '#7a4e2c', 0, 0.62, 0, g);
    box(0.9, 0.05, 0.05, '#7a4e2c', 0, 1.2, 0, g);
    const glow = (c) => new THREE.MeshLambertMaterial({ color: c, emissive: c, emissiveIntensity: 0.35 });
    g.userData.lanterns = [];
    [[-0.32, '#e5483b'], [0.32, '#ef8a3c'], [0, '#f2c94c']].forEach(([x, c], i) => {
      const hang = new THREE.Group(); hang.position.set(x, 1.18, 0.0); g.add(hang);
      cyl(0.005, 0.005, 0.15, '#333', 0, -0.07, 0, hang, 4);
      const l = sph(0.12, glow(c), 0, -0.25, 0, hang, 14); l.scale.y = 1.15;
      cyl(0.06, 0.06, 0.03, '#33363d', 0, -0.12, 0, hang, 10);
      hang.userData.phase = i * 1.7;
      g.userData.lanterns.push(hang);
    });
    return g;
  },
  telescope: () => {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const leg = box(0.04, 0.7, 0.04, '#7a4e2c', Math.sin(a) * 0.15, 0.33, Math.cos(a) * 0.15, g);
      leg.rotation.set(Math.cos(a) * 0.35, 0, -Math.sin(a) * 0.35);
    }
    const tube = cyl(0.07, 0.1, 0.8, '#3f7fc4', 0, 0.78, 0, g, 14); tube.rotation.x = -0.9;
    cyl(0.11, 0.11, 0.06, '#f2c94c', 0, 0.78 + Math.cos(0.9) * 0.4, Math.sin(-0.9) * -0.4, g, 14).rotation.x = -0.9;
    return g;
  },
  library: () => {
    const g = new THREE.Group();
    box(0.08, 0.6, 0.08, '#7a4e2c', 0, 0.3, 0, g);
    box(0.55, 0.5, 0.4, '#a5794a', 0, 0.85, 0, g);
    const roof = mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.5, 3), M('#e5483b'), 0, 1.18, 0, g); roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 2; roof.scale.set(0.55, 1, 0.45);
    box(0.45, 0.38, 0.02, '#3a3020', 0, 0.85, 0.2, g);
    const cols = ['#e5483b', '#3f7fc4', '#f2c94c', '#4a9b6e', '#8a72b8'];
    for (let i = 0; i < 5; i++) box(0.06, 0.16 + (i % 2) * 0.03, 0.02, cols[i], -0.15 + i * 0.075, 0.76, 0.21, g);
    for (let i = 0; i < 4; i++) box(0.06, 0.14, 0.02, cols[(i + 2) % 5], -0.12 + i * 0.08, 0.95, 0.21, g);
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
};

// ── The creature ───────────────────────────────────────────────────────
// Pip: an original round sprout-creature in a striped knit sweater.
function makeCreature() {
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const fur = M('#f7dcae');
  const sweater = new THREE.MeshLambertMaterial({ map: stripeTex('#3fb3a5', '#f6ecd6', 6) });
  const torso = sph(0.17, sweater, 0, 0.2, 0, body, 16); torso.scale.set(1, 1.05, 0.9);
  for (const x of [-0.09, 0.09]) { const f = sph(0.06, '#8a5a35', x, 0.04, 0.03, body, 10); f.scale.set(1, 0.6, 1.3); }
  const arms = [];
  for (const x of [-0.17, 0.17]) { const a = sph(0.055, fur, x, 0.22, 0.02, body, 10); arms.push(a); }
  const head = new THREE.Group(); head.position.y = 0.55; body.add(head);
  const skull = sph(0.3, fur, 0, 0, 0, head, 22); skull.scale.set(1.05, 0.95, 0.95);
  // little round ears
  for (const x of [-0.2, 0.2]) { const e = sph(0.08, fur, x, 0.22, -0.03, head, 10); e.scale.set(1, 1, 0.6); sph(0.045, '#f3a9a0', x, 0.22, 0.01, head, 8).scale.set(1, 1, 0.3); }
  // sprout
  cyl(0.012, 0.012, 0.12, '#4fa53a', 0, 0.33, 0, head, 5);
  for (const s of [-1, 1]) { const l = sph(0.07, '#6cc04a', s * 0.06, 0.4, 0, head, 10); l.scale.set(1.2, 0.45, 0.7); l.rotation.z = s * 0.5; }
  // face
  const eyes = [];
  for (const x of [-0.1, 0.1]) {
    const e = sph(0.046, '#2a2320', x, 0.02, 0.27, head, 10); e.scale.set(0.85, 1.15, 0.6); eyes.push(e);
    sph(0.012, '#ffffff', x + 0.012, 0.045, 0.3, head, 6);
  }
  const blushMat = new THREE.MeshBasicMaterial({ color: '#ff9a9a', transparent: true, opacity: 0.7 });
  for (const x of [-0.17, 0.17]) { const b = new THREE.Mesh(new THREE.CircleGeometry(0.045, 14), blushMat); b.position.set(x, -0.06, 0.255); b.rotation.y = x * 1.6; head.add(b); }
  const mouth = mesh(new THREE.TorusGeometry(0.025, 0.008, 6, 10, Math.PI), M('#5a3a2a'), 0, -0.05, 0.285, head); mouth.rotation.z = Math.PI;
  // hammer (only while building)
  const hammer = new THREE.Group();
  box(0.025, 0.22, 0.025, '#8a5a35', 0, 0.11, 0, hammer);
  box(0.1, 0.06, 0.06, '#7a7f8a', 0, 0.22, 0, hammer);
  hammer.position.set(0.17, 0.22, 0.05); hammer.visible = false; body.add(hammer);
  root.userData = { body, head, eyes, arms, hammer };
  root.scale.setScalar(1.35);
  return root;
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
    this.listeners = { creatureTap: [], itemTap: [] };

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

  _place(obj, x, z, block = true) {
    obj.position.set(x + 0.5, tileH(x, z), z + 0.5);
    this.scene.add(obj);
    if (block) this.occupied.add(`${x},${z}`);
    return obj;
  }

  _decor() {
    this.sways = [];
    const c = cottage();
    c.position.set(6.5, 0, 5.0); this.scene.add(c);
    for (const x of [5, 6, 7]) for (const z of [4, 5]) this.occupied.add(`${x},${z}`);
    this._place(mailbox(), 7, 6);
    const trees = [[1, 4, '#e8312f'], [14, 6, '#ff9f1c'], [0, 9, '#e8312f'], [15, 12, '#ff9f1c'], [5, 15, '#e8312f'], [3, 5, null], [10, 5, '#e8312f']];
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
    [[4, 5, 1], [4, 8, 2], [8, 7, 3], [1, 7, 4], [14, 8, 5], [0, 13, 6], [12, 10, 7]].forEach(([x, z, s]) => {
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
    this._place(rock(), 15, 15);
    this._place(rock(), 3, 3);
  }

  // ── Public API ───────────────────────────────────────────────────────
  setEnergy(e) {
    this.energy = e;
    if (e <= 0 && this.state === 'idle') this._goNap();
    if (e > 0 && this.state === 'nap') this._wake();
  }

  placeBuilt(id, animate = false) {
    const item = ITEM_BY_ID[id];
    if (!item || this.built.has(id) || !BUILDERS[id]) return;
    const obj = BUILDERS[id]();
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

  build(id, done) {
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
          this.placeBuilt(id, true);
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

  // ── Movement ─────────────────────────────────────────────────────────
  _tileOf(p) { return [Math.floor(p.x), Math.floor(p.z)]; }
  _walkable(x, z) { return tileAt(x, z) !== 'w' && !this.occupied.has(`${x},${z}`); }
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
    body.rotation.z = Math.sin(time * 14) * 0.12;
    body.position.y = Math.abs(Math.sin(time * 14)) * 0.05;
  }
  _marker(x, z) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.3, 24), new THREE.MeshBasicMaterial({ color: '#fff8e4', transparent: true, opacity: 0.9 }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x + 0.5, tileH(x, z) + 0.02, z + 0.5);
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
      void id;
    }

    // camera — tilted top-down diorama
    const follow = new THREE.Vector3(
      Math.max(4.5, Math.min(W - 4.5, this.pos.x)), 0,
      Math.max(5, Math.min(D - 4.5, this.pos.z - 1)));
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
