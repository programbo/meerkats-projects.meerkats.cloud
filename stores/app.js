import { action, computed, observable } from 'mobx'

import { auth, users } from '~/lib/firebase'

class App {
  @observable user = null;
  @observable showSettings = false;
  @observable blockingCount = 0;

  constructor() {
    auth().onAuthStateChanged(async user => {
      if (user) {
        const profile = await users.child(user.uid).once('value')
        this.user = profile.val()
      }
      else {
        this.user = null
      }
      if (!this.ready) {
        this.unblock()
      }
    })
  }

  @computed get ready() {
    return this.blockingCount === 0
  }

  @action block() {
    this.blockingCount++
    console.log('block', this.blockingCount) // eslint-disable-line no-console
  }
  @action unblock() {
    this.blockingCount = Math.max(this.blockingCount - 1, 0)
    console.log('unblock', this.blockingCount) // eslint-disable-line no-console
  }
}

export default new App()
