
/**
 * Schijndel Events | Hub
 * Firebase Cloud Messaging - Background Service Worker
 */

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: "AIzaSyCP9_UB0U-LNSxR8b_RtuVpdV9dUlVUE7k",
  authDomain: "schijndel-events-hub-6bc6a.firebaseapp.com",
  projectId: "schijndel-events-hub-6bc6a",
  storageBucket: "schijndel-events-hub-6bc6a.firebasestorage.app",
  messagingSenderId: "909465507127",
  appId: "1:909465507127:web:b01c1cf1040c63b7f136b2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Firebase toont notification-payloads zelf.
  // Voorkom dubbele meldingen.
  if (payload.notification) return;

  const data = payload.data || {};

  self.registration.showNotification(
    data.title || "Schijndel Events",
    {
      body: data.body || "Je hebt een nieuwe melding.",
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      tag: data.tag || "schijndel-events",
      data: {
        url: data.url || "./"
      }
    }
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const target = new URL(
    event.notification.data?.url || "./",
    self.registration.scope
  );

  if (target.origin !== self.location.origin) return;

  event.waitUntil(clients.openWindow(target.href));
});
