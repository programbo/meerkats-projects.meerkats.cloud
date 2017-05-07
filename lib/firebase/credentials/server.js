const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY

module.exports = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://projects-ccd9c.firebaseio.com`,
}
