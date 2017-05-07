import { observable, computed, toJS } from 'mobx'
import firebase, { auth } from '~/lib/firebase'
import app from '~/stores/app'

class Users {
  @observable users = observable.map({});

  constructor() {
    auth().onAuthStateChanged(async authenticatedUser => {
      if (authenticatedUser) {
        firebase.users.on('value', this.refresh)
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

  @computed get groups() {
    const data = this.json
    const keys = Object.keys(data)
    const groups = keys.reduce((allGroups, key) => {
      const userGroups = data[key].groups || []
      userGroups.forEach(group => {
        allGroups[group] = 0
      })
      return allGroups
    }, {})
    return Object.keys(groups).sort()
  }

  refresh = users => {
    this.users = users.val()
    if (app.user) {
      app.user = this.users[app.user.uid]
    }
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
