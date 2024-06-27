const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/3f411cd13e05915f83bb55410a4d33d0.loader.js",
    "Build/81ff667be71f16bcd3177c835232564e.framework.js",
    "Build/07863ffdcec2dacb072dde0032e5e421.data",
    "Build/0c7850992bef5dd1a96d99e8f3979327.wasm",
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
