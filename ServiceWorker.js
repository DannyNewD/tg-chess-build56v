const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/82f50690bdc7385c56b560b02320b05f.loader.js",
    "Build/abd1df11eb35c828b6fba66aa357faae.framework.js",
    "Build/d02aa5d726ff1e1e41b696c0351daacb.data",
    "Build/9bc0579959d3101ffb559d693b2f4090.wasm",
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
