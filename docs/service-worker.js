const build = [
  "/prodRate/_app/immutable/start-530522f7.js",
  "/prodRate/_app/immutable/layout.svelte-4904d21a.js",
  "/prodRate/_app/immutable/error.svelte-6e11c84c.js",
  "/prodRate/_app/immutable/pages/index.svelte-efc03e06.js",
  "/prodRate/_app/immutable/assets/pages/index.svelte-4d66e9db.css",
  "/prodRate/_app/immutable/chunks/index-3b6c342b.js",
  "/prodRate/_app/immutable/chunks/index-b0107bd2.js"
];
const version = "1658100479181";
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
const deleteCache = async (key) => {
  await caches.delete(key);
};
const deleteOldCaches = async () => {
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => key !== cacheName);
  console.log("[Service Worker] Deleting old caches:", cachesToDelete);
  await Promise.all(cachesToDelete.map(deleteCache));
};
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate");
  event.waitUntil(deleteOldCaches());
  console.log("[Service Worker] Activate finished.");
});
