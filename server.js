const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const next = require('next')
const admin = require('firebase-admin')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mobxReact = require('mobx-react')
mobxReact.useStaticRendering(true)

const credentials = require('./lib/firebase/credentials/server')
const firebase = admin.initializeApp(credentials, 'server')

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(
    session({
      secret: 'geheimnis',
      saveUninitialized: true,
      store: new FileStore({ path: '/tmp/sessions', secret: 'geheimnis' }),
      resave: false,
      rolling: true,
      httpOnly: true,
      cookie: { maxAge: 604800000 }, // week
    })
  )

  server.use((req, res, next) => {
    req.firebase = firebase
    next()
  })

  server.post('/api/login', (req, res) => {
    if (!req.body) return res.sendStatus(400)

    firebase
      .auth()
      .verifyIdToken(req.body.token)
      .then(user => {
        req.session.user = user
        return user
      })
      .then(user => res.json({ status: true, user }))
      .catch(error => res.json({ error }))
  })

  server.post('/api/logout', (req, res) => {
    req.session.user = null
    res.json({ status: true })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
