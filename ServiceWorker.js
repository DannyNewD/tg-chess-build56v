const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/c598b1bb4ff0cabbff7b366ffc67a239.loader.js",
    "Build/460315dbb1e582a708722d8cdd619e98.framework.js",
    "Build/698f2b42afb444a5f2c84c7aa452bf74.data",
    "Build/940dd6b99547ba8e786455b7265151ba.wasm",
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
