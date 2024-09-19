const CACHE_NAME = 'your-app-cache-v1';
const urlsToCache = [
	'/',
	'/index.html',
	'/time-to-egate-app/assets/icons/icon-192x192.png',
	'/time-to-egate-app/assets/icons/icon-512x512.png',
	'/time-to-egate-app/assets/index-DN6AwBez.js',
	'/time-to-egate-app/assets/clock-yoda.json',
	'/time-to-egate-app/icon.svg',
	'/time-to-egate-app/assets/thinking-yoda.json',
	'/time-to-egate-app/assets/thinking-utya.json',
	'/time-to-egate-app/assets/loading-bg.svg',
	'/time-to-egate-app/assets/here-you-go.webp',
	'/time-to-egate-app/assets/schedule.csv',
	'/time-to-egate-app/assets/pleepind-utya.json',
	'/time-to-egate-app/assets/pleepind-yoda.json',
	'/time-to-egate-app/assets/nahaind-utya.json',
	'/time-to-egate-app/assets/flying-utya.json',
	'/time-to-egate-app/assets/wide-minna-of-doom.png',
	'/time-to-egate-app/assets/oh-my-god-bruh-oh-hell-nah.mp3',
	// Add other assets you want to cache
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		}),
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		}),
	);
});

self.addEventListener('activate', (event) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});
