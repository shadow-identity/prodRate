const l = [
  "/_app/immutable/assets/_page-da9325ab.css",
  "/_app/immutable/chunks/0-f8044c3f.js",
  "/_app/immutable/chunks/2-60bd799e.js",
  "/_app/immutable/modules/pages/_layout.ts-9cbb603b.js",
  "/_app/immutable/chunks/1-de47473f.js",
  "/_app/immutable/chunks/preload-helper-41c905a7.js",
  "/_app/immutable/chunks/_layout-da46b06b.js",
  "/_app/immutable/components/error.svelte-a800d23b.js",
  "/_app/immutable/components/layout.svelte-c1025cb7.js",
  "/_app/immutable/chunks/3-7dfb0a04.js",
  "/_app/immutable/chunks/singletons-ff76c2a6.js",
  "/_app/immutable/components/pages/about/_page.svelte-43994bab.js",
  "/_app/immutable/chunks/main-5c33b459.js",
  "/_app/immutable/chunks/index-5c856e6a.js",
  "/_app/immutable/start-642006c9.js",
  "/_app/immutable/chunks/index-26e91fd6.js",
  "/_app/immutable/components/pages/_page.svelte-b9073ea1.js"
], o = "1673488848852", c = `appCache-${o}`;
console.log("Service worker file loaded");
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install"), e.waitUntil((async () => {
    const a = await caches.open(c);
    console.log("[Service Worker] Caching all: app shell and content"), await a.addAll(l);
  })());
});
self.addEventListener("fetch", (e) => {
  e.respondWith((async () => {
    const a = await caches.match(e.request);
    if (console.log(`[Service Worker] Fetching resource: ${e.request.url}`), a)
      return a;
    const s = await fetch(e.request), t = await caches.open(c);
    return console.log(`[Service Worker] Caching new resource: ${e.request.url}`), t.put(e.request, s.clone()), s;
  })());
});
const n = async (e) => {
  await caches.delete(e);
}, i = async () => {
  const a = (await caches.keys()).filter((s) => s !== c);
  console.log("[Service Worker] Deleting old caches:", a), await Promise.all(a.map(n));
};
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate"), e.waitUntil(i()), console.log("[Service Worker] Activate finished.");
});
