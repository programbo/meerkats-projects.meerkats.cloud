import { observable, computed, action, toJS, when } from 'mobx';
import firebase, { auth, root } from '~/lib/firebase';

class Todos {
  @observable todos = observable.map({});

  constructor() {
    auth().onAuthStateChanged(authenticatedUser => {
      if (authenticatedUser) {
        firebase.todos.on('value', this.refresh);
      } else {
        firebase.todos.off('value', this.refresh);
      }
    });
  }

  @computed get json() {
    return toJS(this.todos);
  }

  @computed get values() {
    const data = this.json;
    const keys = Object.keys(data);
    return keys.map(id => ({ id, ...data[id] }));
  }

  refresh = todos => this.todos = todos.val();

  add = async item => {
    const id = firebase.todos.push().key;
    this.update(id, item);
  };

  update = (id, item) => {
    firebase.todos.update({ [id]: item });
  };

  remove = id => {
    firebase.todos.child(id).remove();
  };
}

export default new Todos();
