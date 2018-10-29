
const cacheName = 'v1.0';
const cacheOfFiles = [
  '/',
  '/css/styles.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html'
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cacheOfFiles);
    })
  );
});

 self.addEventListener('fetch', function(e) {
   e.respondWith(
     caches.match(e.request).then(function(response) {

       if (response) {
         return response;
       }

       else {
         return fetch(e.request).then(function(response) {
           const cloneRsp = response.clone();
           caches.open(cacheName).then(function(cache) {
             cach.put(e.request, cloneRsp);
           })
           return response;
         })
         .catch(function(error) {
           console.error(error);
         });
       }
     })
   );
 });
