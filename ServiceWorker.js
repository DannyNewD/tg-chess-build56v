const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/7a7b4851ba17a6e8c6b4aadcc961521d.loader.js",
    "Build/dd5038f8271a0043547361ebfddba3ca.framework.js",
    "Build/154bbf06e7e1cd214c744d99e5fe9e37.data",
    "Build/651bf419a456b53b437dd7e86ba0b6b6.wasm",
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
