const CACHE_NAME = "date-time-pwa-cache-v1";
const urlsToCache = [
    "index.html",
    "manifest.json",
    "favicon.ico",
    "icon-192x192.png",
    "icon-512x512.png"
];

// Install Service Worker dan simpan cache
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch resources dari cache jika offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Perbarui cache jika ada perubahan
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
