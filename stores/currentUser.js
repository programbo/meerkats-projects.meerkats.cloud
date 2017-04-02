import { observable, computed, toJS } from 'mobx';
import { auth } from '~/lib/firebase';
import { users } from '~/stores';

class CurrentUser {
  @observable user = null;

  constructor() {
    auth().onAuthStateChanged(currentUser => {
      this.user = currentUser;
    });
  }

  @computed get profile() {
    if (!this.user) {
      return null;
    } else {
      return users.values.find(({ email }) => email === this.user.email);
    }
  }

  @computed get loggedIn() {
    return !!this.user;
  }
}

export default new CurrentUser();
