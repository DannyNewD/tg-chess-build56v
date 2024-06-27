const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/d76f1eb1fdba7281374a4359515d3999.loader.js",
    "Build/62e0b3ce52e4d349e0178dca4067d183.framework.js",
    "Build/63ba12c1a4e331894290dce891a4985d.data",
    "Build/40b7f4ba4520a86679deb2829d2eee21.wasm",
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
