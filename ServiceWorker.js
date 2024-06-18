const cacheName = "DefaultCompany-ChessTG-1.0";
const contentToCache = [
    "Build/f94a7e99076c7064fc74633335a41417.loader.js",
    "Build/70bc6026714c03fdd3c6ee207d63ae4a.framework.js",
    "Build/ea744d7f13ca5f2cd37cd7a6dd067328.data",
    "Build/5022579172dffe8085e86f1614b87aee.wasm",
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
