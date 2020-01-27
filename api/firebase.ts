import firebase from 'firebase/app'
import 'firebase/database'

if (firebase.apps.length === 0)
  firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })

const db = firebase.database()

export default db
