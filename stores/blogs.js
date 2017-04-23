import { observable, computed, toJS } from 'mobx'
import firebase from '~/lib/firebase'

class blogs {
  @observable blogs = observable.map({});

  constructor() {
    firebase.blogs.on('value', this.refresh)
  }

  @computed get json() {
    return toJS(this.blogs)
  }

  @computed get articles() {
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

  refresh = blogs => {
    this.blogs = blogs.val()
  };

  add = async (task, completed = false) => {
    const id = firebase.blogs.push().key
    this.update(id, { task, completed })
  };

  update = (id, item) => {
    firebase.blogs.update({ [id]: item })
  };

  set = (id, completed) => {
    firebase.blogs.child(`${id}/completed`).set(completed)
  };

  edit = (id, task) => {
    firebase.blogs.child(`${id}/task`).set(task)
  };

  remove = id => {
    firebase.blogs.child(id).remove()
  };
}

export default new blogs()
