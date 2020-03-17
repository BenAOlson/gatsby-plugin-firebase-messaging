import fs from 'fs'

//TODO: delete when stuff seems like it's for sure working
export const onPreInit = () => {
  console.log('firebase plugin preinit')
}

export const onPostBootstrap = () => {
  //TODO: add config option to enable/disable this behavior
  //Creates a firebase service worker for development envionments.
  //With a proudction build, the service worker is added to Gatsby's
  //service worker (in onPostBuild)
  if (process.env.NODE_ENV === 'development') {
    //TODO: replace firebase config entires in file with gatsby config values
    const firebaseSwText = fs
      .readFileSync('./firebase-messaging-sw.js')
      .toString()

    fs.writeFile('public/firebase-messaging-sw.js', firebaseSwText, err => {
      err && console.log(err)
    })
  }
}

export const onPostBuild = () => {
  //TODO: check if there is a gatsby service worker and only delete if there is one to append to
  //delete the dev messaging service worker when building
  if (process.env.NODE_ENV === 'production') {
    fs.unlink('public/firebase-messaging-sw.js', err => {
      err ? console.log(err) : console.log('success deleting')
    })
  }
}
