import { Reporter } from 'gatsby'
import fs from 'fs'

/**
 * Reads firebase version from either package-lock.json or yarn.lock
 * @param reporter Gatsby reporter
 */
export const getFirebaseVersion = (reporter: Reporter): string => {
  const yarnLock = 'yarn.lock'
  const packageLock = 'package-lock.json'
  const hasPackagelock = fs.existsSync(packageLock)
  const hasYarnLock = fs.existsSync(yarnLock)

  if (hasYarnLock) {
    if (hasPackagelock) {
      reporter.warn(`yarn.lock and package-lock.json have both been detected.
      gatsby-plugin-firebase-messaging will use yarn.lock to get your firebase version number`)
    }

    const yarnStr = fs.readFileSync('yarn.lock', 'utf8')

    const fullFbRe = /^firebase@.*\d+\.\d+\.\d+/m
    const fbNumRe = /\d+\.\d+\.\d+/m
    const match = yarnStr.match(fullFbRe)
    if (match?.length === 1) {
      const version = match[0].match(fbNumRe)?.[0]
      if (version) return version
      throw new Error(
        `${errStr}, but found this firebase entry in yarn.lock: ${match[0]}`
      )
    }
    throw new Error(errStr)
  }

  if (hasPackagelock) {
    const parsedJson = JSON.parse(fs.readFileSync(packageLock, 'utf8'))
    const version = parsedJson.dependencies.firebase.version
    if (version) return version
  }
  throw new Error(errStr)
}

const errStr = 'could not find a firebase version'
