export const requiredConfigCredentials = [
  'apiKey',
  'appId',
  'messagingSenderId',
  'projectId',
] as const

export type Options = Partial<{
  config: {
    //though the plugin requires these options, a user might omit them
    [T in typeof requiredConfigCredentials[number]]?: string
  } & {
    //In theory, the user can send anything through 'options'
    [key: string]: any
  }
  disableDevelopment: boolean
  removeFirebaseServiceWorker: boolean
  [key: string]: any
}> & {
  //I'm not sure what the 'plugins' array is, but gatsby always sends it
  plugins: any[]
}
