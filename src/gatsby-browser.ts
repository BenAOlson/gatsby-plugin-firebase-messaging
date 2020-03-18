import { Options } from './options'

export const onClientEntry = (__: any, options: Options) => {
  if (
    options.removeFirebaseServiceWorker ||
    (process.env.NODE_ENV === 'development' && options.disableDevelopment)
  ) {
    removeSw()
  }
}

const removeSw = async () => {
  const sws = await navigator.serviceWorker.getRegistrations()
  const firebaseSw =
    sws[
      sws.findIndex(sw =>
        sw.scope.includes('firebase-cloud-messaging-push-scope')
      )
    ]

  if (firebaseSw) {
    firebaseSw
      .unregister()
      .then(location.reload)
      .catch(err => console.warn(err))
  }
}
