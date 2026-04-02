// Service Worker - Farmácia Indiana Calendário
// Incrementar CACHE_NAME a cada nova versão do HTML
const CACHE_NAME = 'calendario-v20260402-4';

// Instala e ativa imediatamente
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Toda requisição vai SEMPRE direto para o servidor (network-first)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request, { cache: 'no-store' })
            .catch(() => caches.match(event.request))
    );
});
