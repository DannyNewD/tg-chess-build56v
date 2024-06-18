const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/8c21094cbe0fe6fed82be08ce4685215.loader.js",
    "Build/bb0dd0ea5205dcf0daef862736ba4d5f.framework.js",
    "Build/c34a8d23f5b8f00da0e5844414ddd085.data",
    "Build/70488c0ae8441c321b53cab408b9a2e1.wasm",
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
