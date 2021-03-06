import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

export default (ctx, inject) => {
  const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
  } = ctx.env
  if (!firebase.apps.length) {
    const config = {
      apiKey: FIREBASE_API_KEY,
      authDomain: FIREBASE_AUTH_DOMAIN,
      databaseURL: FIREBASE_DATABASE_URL,
      projectId: FIREBASE_PROJECT_ID,
      storageBucket: FIREBASE_STORAGE_BUCKET,
      messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
      appId: FIREBASE_APP_ID,
      measurementId: FIREBASE_MEASUREMENT_ID
    }
    firebase.initializeApp(config)
  }

  if (process.client) {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        console.log('result', result)
        if (!result.user) return
        ctx.store.dispatch('auth/ME')
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

  inject('auth', firebase.auth)
  inject('db', firebase.firestore())
  inject('storage', firebase.storage)
}
