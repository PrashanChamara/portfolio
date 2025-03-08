const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  'index.html',
  'projects.html',
  'blog.html',
  'posts/post1.html',
  'assets/css/style.css',
  'assets/js/main.js',
  'assets/images/dummy.png',
  'assets/images/dc-facility.png',
  'assets/images/hr-app.png',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
