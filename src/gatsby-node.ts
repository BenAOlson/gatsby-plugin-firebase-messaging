import fs from 'fs'
import path from 'path'
import { Options } from './options'
import { requiredConfigCredentials } from './options'

//not exhaustive at all...
type Reporter = {
  panic: (msg: string) => void
}

export const onPreInit = (
  { reporter }: { reporter: Reporter },
  options: Options
) => {
  checkConfig(reporter, options)

  if (
    ((process.env.NODE_ENV === 'development' && !options.disableDevelopment) ||
      process.env.NODE_ENV === 'production') &&
    !options.removeFirebaseServiceWorker
  ) {
    const firebaseSwText = replaceFirebasePlaceholders(options)

    if (!fs.existsSync('public')) {
        fs.mkdirSync('public')
    }
	 
    fs.writeFile('public/firebase-messaging-sw.js', firebaseSwText, (err) => {
      err && console.log(err)
    })
  } else {
    deleteFirebaseSwFile()
  }
}

const replaceFirebasePlaceholders = (options: Options) => {
  const placeholderStringArray = requiredConfigCredentials.map(
    (credential) => `%${credential}%`
  )
  const re = new RegExp(placeholderStringArray.join('|'), 'g')

  //load text from sw file, replace placeholders with config values
  const firebaseSwText = fs
    .readFileSync(path.join(__dirname, 'firebase-messaging-sw.js'))
    .toString()
    .replace(re, (matched) => options.config?.[matched.replace(/%/g, '')])
    .replace('"use strict";', '')
  return firebaseSwText
}

const deleteFirebaseSwFile = () => {
  if (fs.existsSync('public/firebase-messaging-sw.js')) {
    fs.unlink('public/firebase-messaging-sw.js', (err) => {
      err && console.log(err)
    })
  }
}

const checkConfig = (reporter: Reporter, options: Options) => {
  if (!options.removeFirebaseServiceWorker) {
    if (!options.config) {
      reporter.panic(
        `no 'config' option passed to gatsby-plugin-firebase-messaging`
      )
    }

    const missingCredentials: string[] = []
    requiredConfigCredentials.forEach((credential) => {
      if (!Object.keys(options.config!).includes(credential)) {
        missingCredentials.push(credential)
      }
    })

    if (missingCredentials.length > 0) {
      reporter.panic(
        `gatsby-plugin-firebase-messaging was missing the following required values:

${missingCredentials.join('\n')}`
      )
    }
  }
}
