import firebase from 'firebase'
import 'isomorphic-fetch'

import credentials from './credentials/client'

try {
  firebase.initializeApp(credentials)

  firebase.auth().onAuthStateChanged(async user => {
    let response
    if (user) {
      const token = await user.getToken()
      response = await fetch('/api/login', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ token }),
      })
    }
    else {
      response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
      })
    }
    return response
  })
}
catch (err) {
  // taken from https://github.com/now-examples/next-news/blob/master/lib/db.js
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export const auth = firebase.auth
export const db = firebase.database()
export const storage = firebase.storage ? firebase.storage().ref() : {}
export const root = firebase.database().ref()
export const users = firebase.database().ref('users')
export const projects = firebase.database().ref('projects')
export const clients = firebase.database().ref('clients')
export const todos = firebase.database().ref('todos')
export const blogs = firebase.database().ref('blogs')

export default {
  auth,
  storage,
  db,
  root,
  users,
  clients,
  projects,
  todos,
  blogs,
}
