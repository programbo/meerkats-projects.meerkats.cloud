import { observable, computed, map, toJS } from 'mobx';
import firebase, { auth } from '../lib/firebase';

class Projects {
  @observable projects = observable.map({});

  constructor() {
    auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        firebase.projects.on('value', this.refresh);
      } else {
        firebase.projects.off('value', this.refresh);
      }
    });
  }

  @computed get json() {
    return toJS(this.projects);
  }

  @computed get values() {
    const data = this.json;
    const keys = Object.keys(data);
    return keys.map(id => ({ id, ...data[id] }));
  }

  refresh = users => this.users = users.val();

  add = project => {
    const id = firebase.projects.push().key;
    this.update(id, project);
  };

  update = (id, project) => {
    firebase.projects.update({ [id]: project });
  };

  remove = id => {
    firebase.projects.child(id).remove();
  };
}

export default new Projects();
