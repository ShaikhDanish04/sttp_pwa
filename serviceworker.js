const cacheName = 'sttp-pwa-v1'
const staticAssets = [
    "/",
    "index.html"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(staticAssets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.responseWith(
        caches.match(fetchEvent.response).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})