import { observable, computed, toJS } from 'mobx'
import firebase, { auth } from '~/lib/firebase'

class Todos {
  @observable items = observable.map({});

  constructor() {
    auth().onAuthStateChanged(authenticatedUser => {
      if (authenticatedUser) {
        firebase.todos.on('value', this.populate)
      }
      else {
        firebase.todos.off('value', this.populate)
      }
    })
  }

  @computed get json() {
    return toJS(this.items)
  }

  @computed get values() {
    const data = this.json
    const keys = Object.keys(data)
    return keys.map(id => ({ id, ...data[id] }))
  }

  @computed get sortedValues() {
    return this.values.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed > b.completed ? 1 : -1
      }
      return a.id < b.id ? 1 : -1
    })
  }

  populate = todos => {
    this.items = todos.val()
  };

  add = async (task, completed = false) => {
    const id = firebase.todos.push().key
    this.update(id, { task, completed })
  };

  update = (id, item) => {
    firebase.todos.update({ [id]: item })
  };

  set = (id, completed) => {
    firebase.todos.child(`${id}/completed`).set(completed)
  };

  edit = (id, task) => {
    firebase.todos.child(`${id}/task`).set(task)
  };

  remove = id => {
    firebase.todos.child(id).remove()
  };
}

export default new Todos()
