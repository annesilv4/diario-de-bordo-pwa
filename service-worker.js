const CACHE_NAME = "meu-diario-cache-v1";
const URLS_CACHE = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/manifest.json",
    "/icons/icon-app.png",
    "/icons/icon-app-512.png",
]

self.addEventListener("install", (event) => {
    console.log("Service Worker instalado");
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(URLS_CACHE)
        )
    )
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker ativado");

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((k) => k !== CACHE_NAME)
                    .map((k) => caches.delete(k))
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    )
});