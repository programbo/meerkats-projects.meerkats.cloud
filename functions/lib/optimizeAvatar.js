'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const mkdirp = require('mkdirp-promise')
const gcs = require('@google-cloud/storage')()
const spawn = require('child-process-promise').spawn

const LOCAL_TMP_FOLDER = '/tmp/'
const THUMB_MAX_SIZE = 400
const THUMB_PREFIX = 'thumb_'

let db

// Return a reference to the project database
const database = projectId => {
  if (!db) {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: `https://${projectId}.firebaseio.com`,
      })
    }
    catch (error) {}
    db = admin.database()
  }
  return db
}

const getUID = fileName => {
  const matches = fileName.match(/thumb_([a-z0-9]+)/i)
  if (matches && matches.length > 1) {
    return matches[1]
  }
}

const download = (bucket, filePath, destination) => () =>
  bucket.file(filePath).download({ destination })

const createThumbnail = (original, thumbnail, size) => () =>
  spawn('convert', [
    original,
    '-resize',
    `${size}x${size}^`,
    '-gravity',
    'center',
    '-crop',
    `${size}x${size}+0+0`,
    '+repage',
    '-strip',
    '-quality',
    '50',
    thumbnail,
  ])

const upload = (bucket, origin, destination) => () =>
  bucket.upload(origin, {
    destination,
    public: true,
  })

const updateUser = file => {
  const [{ name, metadata: { mediaLink }, storage: { projectId } }] = file
  const uid = getUID(name)
  if (uid) {
    database(projectId).ref(`/users/${uid}`).update({ avatar: mediaLink })
    // Allow for three seconds to download the optimized thumbnail
    setTimeout(() => {
      database(projectId).ref(`/users/${uid}`).update({ newAvatar: null })
    }, 3000)
  }
}

const handleError = label => error => {
  console.error(`Error [${label}]:`, error)
}

/**
 * When a new Avatar image is uploaded, create a thumbnail and update the user data
 */
module.exports = functions.storage.object().onChange(({
  data: { name: filePath, contentType, resourceState, bucket },
}) => {
  const filePathSplit = filePath.split('/')
  const fileName = filePathSplit.pop()

  // Only act on objects in the /avatars path
  if (!filePath.startsWith('avatars/')) return

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) return

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) return

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') return

  const fileDir = `${filePathSplit.join('/')}${filePathSplit.length > 0 ? '/' : ''}`
  const thumbFilePath = `${fileDir}${THUMB_PREFIX}${fileName}`
  const tempLocalDir = `${LOCAL_TMP_FOLDER}${fileDir}`
  const tempLocalFile = `${tempLocalDir}${fileName}`
  const tempLocalThumbFile = `${LOCAL_TMP_FOLDER}${thumbFilePath}`

  // Create a reference to the storage bucket
  const bucketRef = gcs.bucket(bucket)

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir)
    .then(download(bucketRef, filePath, tempLocalFile), handleError('download'))
    .then(
      createThumbnail(tempLocalFile, tempLocalThumbFile, THUMB_MAX_SIZE),
      handleError('createThumbnail')
    )
    .then(
      upload(bucketRef, tempLocalThumbFile, thumbFilePath),
      handleError('upload')
    )
    .then(updateUser, handleError('updateUser'))
    .catch(error => {
      console.error('Error creating thumbnail:', error)
    })
})
