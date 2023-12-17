import {precacheAndRoute} from 'workbox-precaching';
import cacheHelper from './utils/cache-helper';

precacheAndRoute(self.__WB_MANIFEST);

const assetsToCache = [
  './',
  './images/icons/maskable_icon/icon-72x72.png',
  './images/icons/maskable_icon/icon-96x96.png',
  './images/icons/maskable_icon/icon-128x128.png',
  './images/icons/maskable_icon/icon-144x144.png',
  './images/icons/maskable_icon/icon-152x152.png',
  './images/icons/maskable_icon/icon-192x192.png',
  './images/icons/maskable_icon/icon-384x384.png',
  './images/icons/maskable_icon/icon-512x512.png',
  './images/partner-page-icon/Group 37010.png',
  './images/partner-page-icon/Group 37010.webp',
  './images/partner-page-icon/Rectangle 86.png',
  './images/partner-page-icon/Rectangle 86.webp',
  './images/partner-page-icon/Vector.png',
  './images/partner-page-icon/Vector.webp',
  './logo/car.png',
  './logo/car.webp',
  './logo/cards-container/price.png',
  './logo/cards-container/price.webp',
  './logo/cards-container/shield.png',
  './logo/cards-container/shield.webp',
  './logo/cards-container/high.png',
  './logo/cards-container/high.webp',
  './images/assets/partner-page/car.jpg',
  './images/assets/partner-page/car.webp',
  './images/assets/partner-page/car-large.jpg',
  './images/assets/partner-page/car-large.webp',
  './images/assets/partner-page/car-small.jpg',
  './images/assets/partner-page/car-small.webp',
  './images/assets/about-us/back-end/developer-1.jpg',
  './images/assets/about-us/back-end/developer-1.webp',
  './images/assets/about-us/back-end/developer-2.jpg',
  './images/assets/about-us/back-end/developer-2.webp',
  './images/assets/about-us/front-end/developer-1.jpg',
  './images/assets/about-us/front-end/developer-1.webp',
  './images/assets/about-us/front-end/developer-2.jpg',
  './images/assets/about-us/front-end/developer-2.webp',
  './images/assets/about-us/fullstack/developer-1.jpg',
  './images/assets/about-us/fullstack/developer-1.webp',
  './index.html',
  './favicon/favicon.ico',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
  './images/icons/userProfile-page/Rectangle 86.png',
  './images/icons/userProfile-page/Rectangle 86.webp',
  './images/icons/userProfile-page/Vector.png',
  './images/icons/userProfile-page/Vector.webp',
  './images/assets/icons/WhatsApp Button.png',
  './images/assets/icons/WhatsApp Button.webp',
  './scripts/script.js',
];

self.addEventListener('install', (event) => {
  console.log('Installing Service Worker ...');
  event.waitUntill(cacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  console.log('Activating Service Worker ...');
  event.waitUntill(cacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheHelper.revalidateCache(event.request));
});
