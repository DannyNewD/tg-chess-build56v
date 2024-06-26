const cacheName = "DefaultCompany121212-ChessTG1212-3";
const contentToCache = [
    "Build/7153e9d139a3d6099f27cfb1648068e0.loader.js",
    "Build/5117ca5f678558516bd7d7862c8b3ea3.framework.js",
    "Build/faed1dc6cf292129db9f5eedfa2bef16.data",
    "Build/cd861ebd20695bdb3b24d5ede31fac27.wasm",
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
