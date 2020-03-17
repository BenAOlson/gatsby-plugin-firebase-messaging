//TODO: import into gatsby-broswer
//? How to make sure this gets called only after firebase is initialized in developer's app?
import firebase from 'firebase/app'

export const initMessaging = (
  publicVapidKey: string,
  serviceWorker?: ServiceWorkerRegistration
) => {
  try {
    const messaging = firebase.messaging()
    serviceWorker && messaging.useServiceWorker(serviceWorker)
    messaging.usePublicVapidKey(publicVapidKey)
  } catch (err) {
    console.error(err)
  }
}
