import { observable, computed, action, toJS, when } from 'mobx';
import firebase, { auth, root } from '~/lib/firebase';

class Users {
  @observable users = observable.map({});

  constructor() {
    auth().onAuthStateChanged(authenticatedUser => {
      if (authenticatedUser) {
        firebase.users.on('value', this.refresh);
      } else {
        firebase.users.off('value', this.refresh);
      }
    });
  }

  @computed get json() {
    return toJS(this.users);
  }

  @computed get values() {
    const data = this.json;
    const keys = Object.keys(data);
    return keys.map(id => ({ id, ...data[id] }));
  }

  refresh = users => this.users = users.val();

  findUser = ({ email }) =>
    root.child('/users').orderByChild('email').equalTo(email).once('value');

  add = async user => {
    // const match = await this.findUser(user);
    // const id = match.val()
    //   ? Object.keys(match.val())[0]
    //   : firebase.users.push().key;
    firebase.users.child(user.uid).update(user)
    // console.log('user', user); // eslint-disable-line no-console
    // this.update(id, user);
  };

  update = (id, user) => {
    firebase.users.update({ [id]: user });
  };

  remove = id => {
    firebase.users.child(id).remove();
  };
}

export default new Users();
