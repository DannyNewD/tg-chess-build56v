const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/3052e0b4637b20d19f20b051d8e307ce.loader.js",
    "Build/70bc6026714c03fdd3c6ee207d63ae4a.framework.js",
    "Build/278a284c4db263d3df83b0b03962b069.data",
    "Build/422177d97eaab979a78bd47b6fe345e9.wasm",
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
