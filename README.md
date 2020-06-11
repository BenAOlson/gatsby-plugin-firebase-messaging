# gatsby-plugin-firebase-messaging

This plugin handles the setup, configuration, and, if needed, removal of service workers required by Firebase cloud messaging. The rest of the usage of Firebase messaging will follow your particular project's needs, and can be done as outlined in Firebase's documentation.

## Install

`npm i gatsby-plugin-firebase-messaging`

## How to use

#### General Setup

```javascript
// Include in gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-firebase-messaging`,
    options: {
      //required unless removeFirebaseServiceWorker == true
      config: { 
        apiKey: 'YOUR_FIREBASE_API_KEY',
        appId: 'YOUR_FIREBASE_APP_ID',
        messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
        projectId: 'YOUR_FIREBASE_PROJECT_ID',
      },
      //both of these are optional
      disableDevelopment: true, //disables development service worker
      removeFirebaseServiceWorker: true, //tells plugin to help unregistering/removing
    },
  },
]
```

#### Options:
##### `disableDevelopment`:
Use this option to tell `gatsby-plugin-firebase-messaging` not to create a service worker file for development builds. Additionally, setting this option to `true` will unregister currently registered Firebase service workers in development environments.

##### `removeFirebaseServiceWorker`:
Should you decide you no longer want to use Firebase messaging in your app, and you don't want to leave a "stale" service worker registered for whatever reason, leave the plugin installed and set the `removeFirebaseServiceWorker` option to `true`. This will allow `gatsby-plugin-firebase-messaging` to unregister your users from the firebase  messaging service worker. 

When using this option, you can remove `config` from the plugin options if you wish.

## Using with `gatsby-plugin-offline` or other service workers

Just use it. Everything works. No additional configuration needed on either end.
