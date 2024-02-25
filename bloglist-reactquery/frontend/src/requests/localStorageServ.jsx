const set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const get = (key) => JSON.parse(window.localStorage.getItem(key))


export default {set, get}