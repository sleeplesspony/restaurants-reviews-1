let staticCacheName = 'restaurants-static-v2';
/**
* Open cache
*/
self.addEventListener('install', function (event) {
	var urlsToCache = [
		'/',
		'index.html',
		'restaurant.html',
		'/css/styles.css',
		'/data/restaurants.json',
		'/js/dbhelper.js',
		'/js/main.js',
		'/js/restaurant_info.js',
		'/js/sw_reg.js',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
		'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',		
	];
	// add images to cache
	for (let i = 1; i <= 10; i++) {
		urlsToCache.push(`/img/${i}.jpg`);
	}
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(urlsToCache);
		}).catch(function(err) {
			console.log('failed: ', err);
		})
	);
});

/**
* Respond with an entry from the cache if there is one 
* or fetch from network
*/
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function (response){
			if (response) {
				console.log('from cache', response);
				return response;
			}
			console.log('fetch from network: ', event.request.url);
			return fetch(event.request);
		})
	);
});

/**
* Delete cache
*/
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('restaurants-') && cacheName != staticCacheName;
        }).map(function(cacheName){
          return cache.delete(cacheName)
        })
      );
    })   
  );
});