// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDi24JB1bcS-HiZfH1nCWqSssME5N49un8",
  authDomain: "finanzaktion-dd819.firebaseapp.com",
  databaseURL: "https://finanzaktion-dd819.firebaseio.com",
  projectId: "finanzaktion-dd819",
  storageBucket: "finanzaktion-dd819.appspot.com",
  messagingSenderId: "828090653137",
  appId: "1:828090653137:web:8394efed76f9443c6ae8f0",
  measurementId: "G-79L0CGMXF0"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
