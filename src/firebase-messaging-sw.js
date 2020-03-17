// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.3/firebase-messaging.js')

//TODO: get these from gatsby-config
firebase.initializeApp({
  apiKey: 'API_KEY',
  projectId: 'PROJECT_ID',
  messagingSenderId: 'MESSAGING_ID',
  appId: 'APP_ID',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
