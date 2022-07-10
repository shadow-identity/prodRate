const build = [
  "/prodRate/_app/immutable/start-517896f3.js",
  "/prodRate/_app/immutable/layout.svelte-f815be52.js",
  "/prodRate/_app/immutable/error.svelte-9433587f.js",
  "/prodRate/_app/immutable/pages/index.svelte-6237c3c7.js",
  "/prodRate/_app/immutable/assets/pages/index.svelte-07bff64d.css",
  "/prodRate/_app/immutable/chunks/index-66a614ae.js",
  "/prodRate/_app/immutable/chunks/index-0d3d1221.js"
];
const version = "1657474317805";
const cacheName = `appCache-${version}`;
console.log("Service worker file loaded");
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log("[Service Worker] Caching all: app shell and content");
    await cache.addAll(build);
  })());
});
self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    const resources = await caches.match(event.request);
    console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
    if (resources)
      return resources;
    const response = await fetch(event.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
    cache.put(event.request, response.clone());
    return response;
  })());
});
