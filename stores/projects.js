import { observable, computed, toJS } from 'mobx'
import firebase, { auth } from '../lib/firebase'

class Projects {
  @observable projects = observable.map({});
  @observable editing = {};
  @observable showProjectDialog = false;

  constructor() {
    auth().onAuthStateChanged(authenticatedUser => {
      if (authenticatedUser) {
        firebase.projects.on('value', this.refresh)
      }
      else {
        firebase.projects.off('value', this.refresh)
      }
    })
  }

  @computed get json() {
    return toJS(this.projects)
  }

  @computed get values() {
    const data = this.json
    const keys = Object.keys(data)
    return keys.map(uid => data[uid])
  }

  refresh = projects => {
    this.projects = projects.val()
  };

  add = project => {
    const uid = firebase.projects.push().key
    this.update(uid, { ...project, uid })
  };

  set = (id, project) => {
    firebase.projects.update({ [id]: project })
  };

  update = (id, changes) => {
    firebase.projects.child(id).update(changes)
  };

  remove = id => {
    firebase.projects.child(id).remove()
  };
}

export default new Projects()
