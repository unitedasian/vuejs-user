class Profile {
  constructor (state) {
    this.init(state)
  }

  init (state) {
    let defaultState = {
      gender: null,
      given_name: null,
      surname: null
    }

    this.state = Object.assign(
      defaultState,
      state
    )
  }

  get gender () {
    return this.state.gender
  }

  set gender (gender) {
    this.state.gender = gender
  }

  get givenName () {
    return this.state.given_name
  }

  set givenName (givenName) {
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
