const build = [
  "/prodRate/_app/immutable/start-61004b8f.js",
  "/prodRate/_app/immutable/layout.svelte-6bb86db1.js",
  "/prodRate/_app/immutable/error.svelte-9fa76fba.js",
  "/prodRate/_app/immutable/pages/index.svelte-5242f5e4.js",
  "/prodRate/_app/immutable/assets/pages/index.svelte-5f510dff.css",
  "/prodRate/_app/immutable/chunks/index-1cae598c.js",
  "/prodRate/_app/immutable/chunks/index-c24b0d3e.js"
];
const version = "1657756139316";
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
