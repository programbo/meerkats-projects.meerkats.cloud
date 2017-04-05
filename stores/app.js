import { observable, computed, toJS } from 'mobx';

class App {
  @observable showSettings = false;
}

export default new App();
