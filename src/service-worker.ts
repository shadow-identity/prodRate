import { build, files, prerendered, version } from '$service-worker'

declare const self: ServiceWorkerGlobalScope

const cacheName = `appCache-${version}`

console.log('Service worker file loaded')

// Installing Service Worker
self.addEventListener('install', (event) => {
	console.log('[Service Worker] Install')
	event.waitUntil((async () => {
		const cache = await caches.open(cacheName)
		console.log('[Service Worker] Caching all: app shell and content')
		await cache.addAll(build)
	})())
})

// Fetching content using Service Worker
self.addEventListener('fetch', (event) => {
	event.respondWith((async () => {
		const resources = await caches.match(event.request)
		console.log(`[Service Worker] Fetching resource: ${event.request.url}`)
		if (resources) return resources
		const response = await fetch(event.request)
		const cache = await caches.open(cacheName)
		console.log(`[Service Worker] Caching new resource: ${event.request.url}`)
		cache.put(event.request, response.clone())
		return response
	})())
})

const deleteCache = async (key: string) => {
	await caches.delete(key)
}

const deleteOldCaches = async () => {
	const keyList = await caches.keys()
	const cachesToDelete = keyList.filter(key => key !== cacheName)
	console.log('[Service Worker] Deleting old caches:', cachesToDelete)
	await Promise.all(cachesToDelete.map(deleteCache))
}

self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate')
	event.waitUntil(deleteOldCaches())
	console.log('[Service Worker] Activate finished.')
})