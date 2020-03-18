/*
  ! Taken directly from firebase docs:
  ! https://firebase.google.com/docs/cloud-messaging/js/receive
*/

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js')

firebase.initializeApp({
  apiKey: '%apiKey%',
  appId: '%appId%',
  messagingSenderId: '%messagingSenderId%',
  projectId: '%projectId%',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
