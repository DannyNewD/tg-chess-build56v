const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/75f34821b05b1602fcd5f629ea2a60c4.loader.js",
    "Build/62e0b3ce52e4d349e0178dca4067d183.framework.js",
    "Build/6ec88070196bb6dfc57ec7e0904a1c0b.data",
    "Build/6019b636989c7438de74dc1c911189c2.wasm",
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
