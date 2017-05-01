const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

module.exports = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://projects-ccd9c.firebaseio.com`,
}
