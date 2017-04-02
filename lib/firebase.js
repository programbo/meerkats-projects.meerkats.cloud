// import firebase from 'firebase';
const firebase = require('firebase');

try {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'projects-ccd9c.firebaseapp.com',
    databaseURL: 'https://projects-ccd9c.firebaseio.com',
    projectId: 'projects-ccd9c',
    storageBucket: 'projects-ccd9c.appspot.com',
    messagingSenderId: '532951511431'
  });
} catch (err) {
  // taken from https://github.com/now-examples/next-news/blob/master/lib/db.js
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export const auth = firebase.auth;
export const db = firebase.database();
export const root = firebase.database().ref();
export const users = firebase.database().ref('users');
export const projects = firebase.database().ref('projects');

export default { auth, db, root, users, projects };
