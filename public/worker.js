var CACHE_NAME = 'pwa-mw-manager';
var urlsToCache = [
  '/',
  '/compare',
  '/map'
];

// Install a serviceWorker
self.addEventListener('install', event => {
  // Perform install apps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened Cache');
        return cache.addAll(urlsToCache);
      }).catch(function(err) {
        console.log('Error in Opening Cache');
        console.log(err);
        return err;
      })
  );
});

// Cache and Return Requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if(response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Update a serviceWorker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-mw-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});