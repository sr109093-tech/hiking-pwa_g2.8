// sw.js - K-Path v2.40
const CACHE_NAME = 'kpath-v2.40';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Pretendard:wght@600;800&family=Black+Han+Sans&display=swap'
];

// 설치 단계: 새로운 캐시 저장
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // 즉시 활성화
});

// 활성화 단계: 오래된 캐시(트레킹 v1 등) 삭제
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});