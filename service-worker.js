const CACHE_NAME = 'optimized-cache-v1';
const urlsToCache = [
  '/styles.css',
  '/worker-init.js',
  '/form-handler.js',
  'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .catch((error) => {
            console.error(error)
          });
      })
  );
});