import Profile from './Profile'

class User {
  constructor (state) {
    this.init(state)
  }

  init (state) {
    let defaultState = {
      email: null,
      id: null,
      password: null,
      username: null
    }

    this.state = Object.assign(
      defaultState,
      state
    )

    this.profile = state && state.profile ? new Profile(state.profile) : new Profile()
  }

  get email () {
    return this.state.email
  }

  set email (email) {
    this.state.email = email
  }

  get id () {
    return this.state.id
  }

  set id (id) {
    this.state.id = id
  }

  get password () {
    return this.state.password
  }

  set password (password) {
    this.state.password = password
  }

  get profile () {
    return this.state.profile
  }

  set profile (profile) {
    this.state.profile = profile
  }

  get username () {
    return this.state.username
  }

  set username (username) {
    this.state.username = username
  }
}

export default User
