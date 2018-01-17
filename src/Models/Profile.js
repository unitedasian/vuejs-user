class Profile {
  constructor (state) {
    this.init(state)
  }

  init (state) {
    this.state = Object.assign(
      {
        gender: null,
        given_name: null,
        surname: null
      },
      state
    )
  }

  get gender () {
    return this.state.gender
  }

  set gender (gender) {
    this.state.gender = gender
  }

  get given_name () {
    return this.state.given_name
  }

  set given_name (givenName) {
    this.state.given_name = givenName
  }

  get surname () {
    return this.state.surname
  }

  set surname (surname) {
    this.state.surname = surname
  }
}

export default Profile