import { action, computed, observable } from 'mobx'

class App {
  @observable showSettings = false;
  @observable blockingCount = 0;

  @computed get ready() {
    return this.blockingCount === 0
  }

  @action block() {
    this.blockingCount++
    console.log('block', this.blockingCount) // eslint-disable-line no-console
  }
  @action unblock() {
    this.blockingCount--
    console.log('unblock', this.blockingCount) // eslint-disable-line no-console
  }
}

export default new App()
