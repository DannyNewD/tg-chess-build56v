const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/8d29fbd3ce8e2bacd0b9a73c1ab389a6.loader.js",
    "Build/4f6e9972efca9ee9a325b6ae366c1377.framework.js",
    "Build/5af8a8841b63c3b9f7d77163436e19a2.data",
    "Build/a72fecaed1ed0de663c0b1050582d577.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    //e.waitUntil((async function () {
      //const cache = await caches.open(cacheName);
      //console.log('[Service Worker] Caching all: app shell and content');
      //await cache.addAll(contentToCache);
    //})());
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
