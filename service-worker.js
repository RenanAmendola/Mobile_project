var cacheName = 'pwaTeste+-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',

        './assets/css/bootstrap.min.css',

        './assets/js/bootstrap.min.js',

        './assets/js/jquery.min.js',

        './assets/js/popper.min.js',

        './assets/img/loja_favicon.png',
        './assets/img/loja_icon.png',
        './assets/img/29.png',
        './assets/img/40.png',
        './assets/img/57.png',
        './assets/img/58.png',
        './assets/img/60.png',
        './assets/img/80.png',
        './assets/img/87.png',
        './assets/img/114.png',
        './assets/img/120.png',
        './assets/img/180.png',
        './assets/img/1024.png',
        './assets/img/appstore.png',
        './assets/img/ic_launcher.png',
        './assets/img/playstore.png',

      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});