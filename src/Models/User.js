import Profile from 'Profile'

class User {
  constructor (state) {
    this.init(state)
  }

  init (state) {
    this.state = Object.assign(
      {
        email: null,
        id: null,
        password: null,
        username: null
      },
      state
    )

    this.profile = state.profile ? new Profile(state.profile) : new Profile()
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

  get username () {
    return this.state.username
  }

  set username (username) {
    this.state.username = username
  }
}

export default User
