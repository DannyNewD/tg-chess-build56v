const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/6498d4cdeca6890b0d7b281edd1f204d.loader.js",
    "Build/42c9f6d94ef499ee8643a8930e76bff7.framework.js",
    "Build/1ab4c8c64e5c322147b303e7df0f5b8a.data",
    "Build/005595ee3472a5f83583a541f0092c74.wasm",
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
