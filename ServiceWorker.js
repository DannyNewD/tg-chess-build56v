const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/57bcba456c9b41e7ea577cec8d51f1c3.loader.js",
    "Build/cbe2c149fc9f3529c35f53d136c586c8.framework.js",
    "Build/2bc239129912f4bb82265230f1b024b9.data",
    "Build/349fb839e52663cc73beff0e7577c4e1.wasm",
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
