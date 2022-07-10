const build = [
  "/prodRate/_app/immutable/start-3c42815e.js",
  "/prodRate/_app/immutable/layout.svelte-102f0e3a.js",
  "/prodRate/_app/immutable/error.svelte-0959e24c.js",
  "/prodRate/_app/immutable/pages/index.svelte-0bcdf53a.js",
  "/prodRate/_app/immutable/assets/pages/index.svelte-07bff64d.css",
  "/prodRate/_app/immutable/chunks/index-42b81ed8.js",
  "/prodRate/_app/immutable/chunks/index-83b2db56.js"
];
const version = "1657490325059";
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
