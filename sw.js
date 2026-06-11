// ЗМІНЮЙ ЦЮ ЦИФРУ КОЖНОГО РАЗУ, КОЛИ РОБИШ ЗМІНИ В INDEX.HTML (v4, v5, v6...)
const CACHE_NAME = 'boraregar-cache-v3.3'; 

const urlsToCache = [
  '/BoraRegar/',
  '/BoraRegar/index.html',
  '/BoraRegar/manifest.json'
];

// Коли встановлюється нова версія
self.addEventListener('install', event => {
  self.skipWaiting(); // ПРИМУС: змушуємо нову версію активуватися негайно!
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Коли нова версія активується, видаляємо все старе сміття
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Видаляємо старий кеш:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // ПРИМУС: беремо контроль над усіма відкритими сторінками
  );
});

// Робота без інтернету
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
