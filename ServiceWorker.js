const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/7679108126be6c5d37598164ef017dc4.loader.js",
    "Build/bb0dd0ea5205dcf0daef862736ba4d5f.framework.js",
    "Build/a3b00bf5456a5576ea9f9615812aaf7a.data",
    "Build/4f6b0e1c0903a4da32a86ae855486a5b.wasm",
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
