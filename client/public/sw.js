// Jobopedia Service Worker for Chrome & Mobile Push Notifications
// Works in the background even when Chrome or the website is closed!

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

// 1. Listen for background Push events sent by the server via FCM / WebPush
self.addEventListener('push', function(event) {
  let data = {
    title: '🇮🇳 Jobopedia: New Job Alert',
    body: 'A new job matching your qualification has just been posted!',
    icon: '/images/jobopedia-icon.png',
    badge: '/images/jobopedia-icon.png',
    url: '/'
  };

  if (event.data) {
    try {
      data = Object.assign({}, data, event.data.json());
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/images/jobopedia-icon.png',
    badge: data.badge || '/images/jobopedia-icon.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    },
    tag: 'jobopedia-alert-' + Date.now(),
    renotify: true,
    requireInteraction: false,
    actions: [
      { action: 'open_url', title: '👉 Open Vacancy' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 2. Handle user tapping the notification in Android status bar / Chrome
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
