const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/13de8e7dc25ae1dea4b2de32828f1104.loader.js",
    "Build/62e0b3ce52e4d349e0178dca4067d183.framework.js",
    "Build/024641d5b8f729cf957273f0f01f99f5.data",
    "Build/e70e983897ee8faa2b640639b98a52f6.wasm",
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
