const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/c44cd587c28c2e426f5e1cfe6d0f204a.loader.js",
    "Build/4d36429f1a5b801492f6dca0f2b3d842.framework.js",
    "Build/468731832a1be024f7e13dafadf2f535.data",
    "Build/facbf4d032b6970d2c4a313c5065ecc5.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
