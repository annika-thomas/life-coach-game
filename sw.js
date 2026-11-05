// Offline cache for the app shell. Bump VERSION when files change.
const VERSION = 'island-v19';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/style.css',
  'js/app.js', 'js/world.js', 'js/items.js', 'js/lessons.js', 'js/state.js', 'js/icons.js', 'js/quiz.js', 'js/wine-maps.js', 'js/wine-games.js', 'js/cards/index.js', 'js/cards/news.js', 'js/cards/robotics.js', 'js/cards/fashion.js', 'js/cards/wine.js', 'js/cards/cheese.js', 'js/cards/film.js', 'js/cards/food.js', 'js/cards/travel.js', 'js/cards/art.js', 'js/cards/culture.js', 'js/cards/philosophy.js', 'js/cards/stats.js', 'js/cards/science.js', 'js/cards/history.js',
  'vendor/three.module.min.js',
  'fonts/baloo-2-latin-700-normal.woff2', 'fonts/baloo-2-latin-800-normal.woff2',
  'fonts/nunito-latin-600-normal.woff2', 'fonts/nunito-latin-800-normal.woff2',
  'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png',
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first, always revalidating with the server (no stale HTTP cache),
// so every file comes from the same deploy. Cache is the offline fallback.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then((r) => {
      const copy = r.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
