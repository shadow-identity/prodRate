const build = [
  "/prodRate/_app/immutable/start-5b80c306.js",
  "/prodRate/_app/immutable/layout.svelte-fefadf43.js",
  "/prodRate/_app/immutable/error.svelte-9d2ef103.js",
  "/prodRate/_app/immutable/pages/about.svelte-f3cbf374.js",
  "/prodRate/_app/immutable/pages/index.svelte-3ef28ce8.js",
  "/prodRate/_app/immutable/assets/pages/index.svelte-18b78bed.css",
  "/prodRate/_app/immutable/chunks/index-7e0ae005.js",
  "/prodRate/_app/immutable/chunks/index-1f10bfe4.js",
  "/prodRate/_app/immutable/chunks/singletons-d1fb5791.js",
  "/prodRate/_app/immutable/chunks/navigation-b1dd50a3.js"
];
const version = "1672445991749";
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
