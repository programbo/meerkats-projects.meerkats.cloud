import { observable, computed, toJS } from 'mobx';
import { auth } from '~/lib/firebase';
import { users } from '~/stores';

class CurrentUser {
  @observable user = null;
  @observable pending = true;

  constructor() {
    auth().onAuthStateChanged(currentUser => {
      this.user = currentUser;
      this.pending = false;
    });
  }

  @computed get profile() {
    if (!this.user) {
      return null;
    }
    return users.values.find(({ email }) => email === this.user.email);
  }

  @computed get loggedIn() {
    return !!this.user;
  }
}

export default new CurrentUser();
