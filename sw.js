// Cache hors connexion de Mon Budget.
// Les données de l'app (localStorage) ne passent jamais par ce fichier : il ne met en cache que le code.
// Change VERSION à chaque mise à jour du code pour forcer le rafraîchissement.
const VERSION = 'v6';
const CACHE = 'mon-budget-' + VERSION;
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('mon-budget-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache d'abord (l'app marche sans réseau), mise à jour en arrière-plan quand le réseau répond.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => null);
      if (cached) { e.waitUntil(network); return cached; }
      const res = await network;
      return res || (req.mode === 'navigate' ? cache.match('./index.html') : Response.error());
    })
  );
});
