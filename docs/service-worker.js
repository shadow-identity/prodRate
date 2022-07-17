const build = [
  "/prodRate/_app/immutable/start-33448699.js",
  "/prodRate/_app/immutable/layout.svelte-13770077.js",
  "/prodRate/_app/immutable/error.svelte-feeb60cc.js",
  "/prodRate/_app/immutable/pages/index.svelte-782eb159.js",
  "/prodRate/_app/immutable/assets/pages/index.svelte-9d028066.css",
  "/prodRate/_app/immutable/chunks/index-d7b40609.js",
  "/prodRate/_app/immutable/chunks/index-1656b84f.js"
];
const version = "1658098755936";
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
  await Promise.all(cachesToDelete.map(deleteCache));
};
self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});
