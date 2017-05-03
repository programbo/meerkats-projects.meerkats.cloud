import { observable, computed, toJS } from 'mobx'
import firebase, { auth } from '~/lib/firebase'
import app from '~/stores/app'

class Users {
  @observable users = observable.map({});

  constructor() {
    auth().onAuthStateChanged(async authenticatedUser => {
      if (authenticatedUser) {
        firebase.users.on('value', this.refresh)
        // const usersSnapshot = await firebase.users
        //   .child(authenticatedUser.uid)
        //   .once('value')
        // const notLoggedIn = !app.user
        // app.user = usersSnapshot.val()
        // if (notLoggedIn) {
        //   app.unblock()
        // }
      }
      else {
        firebase.users.off('value', this.refresh)
      }
    })
  }

  @computed get json() {
    return toJS(this.users)
  }

  @computed get values() {
    const data = this.json
    const keys = Object.keys(data)
    return keys.map(id => ({ id, ...data[id] }))
  }

  refresh = users => {
    this.users = users.val()
  };

  add = async user => {
    firebase.users.child(user.uid).update(user)
  };

  update = (id, user) => {
    firebase.users.update({ [id]: user })
  };

  set = (id, path, data) => {
    firebase.users.child(`${id}/${path}`).set(data)
  };

  remove = id => {
    firebase.users.child(id).remove()
  };

  // Populating data
  getUser = async id => {
    const user = await firebase.users.child(`${id}`).once('value')
    return user
  };
}

export default new Users()
