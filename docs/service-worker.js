const build = [
  "/prodRate/_app/immutable/start-590d48c6.js",
  "/prodRate/_app/immutable/layout.svelte-fb23f22f.js",
  "/prodRate/_app/immutable/error.svelte-a3e22161.js",
  "/prodRate/_app/immutable/pages/index.svelte-2bce082b.js",
  "/prodRate/_app/immutable/assets/pages/index.svelte-18b78bed.css",
  "/prodRate/_app/immutable/chunks/index-c5d1a191.js",
  "/prodRate/_app/immutable/chunks/index-c87f32d5.js"
];
const version = "1658879051967";
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
