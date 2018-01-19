import ProfileModel from './models/Profile'

class ProfileFromStore extends ProfileModel{
  constructor (authenticator) {
    super()

    this.authenticator = authenticator ? authenticator : null
  }

  get gender () {
    return this.authenticator.getProfileFromStore().gender
  }

  get givenName () {
    return this.authenticator.getProfileFromStore().given_name
  }

  get surname () {
    return this.authenticator.getProfileFromStore().surname
  }

  get state () {
    return this.authenticator.getProfileFromStore()
  }
}

export default ProfileFromStore
