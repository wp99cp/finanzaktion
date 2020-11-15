// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

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
