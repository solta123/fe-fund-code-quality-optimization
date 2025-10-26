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
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        if (
          event.request.url.startsWith('https://fonts.googleapis.com/') ||
          event.request.url.startsWith('https://fonts.gstatic.com/')
        ) {
          return fetch(event.request).then(networkResponse => {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
            return networkResponse;
          });
        }
        return fetch(event.request)
          .catch(() => {
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});