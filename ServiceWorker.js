const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/fb29ef148f29f6b5263af2c9684494e5.loader.js",
    "Build/62e0b3ce52e4d349e0178dca4067d183.framework.js",
    "Build/f3668fa5d91ebcc67019a22dd51f8c8a.data",
    "Build/ce55edc5f743fa5438929d5c20a3002a.wasm",
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
