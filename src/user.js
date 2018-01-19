import UserModel from './models/User'
import ProfileFromStore from './profileFromStore'

class User extends UserModel {
  constructor (authenticator) {
    super()

    this.authenticator = authenticator ? authenticator : null

    this.profileFromStore = new ProfileFromStore(this.authenticator)
  }

  get email () {
    return this.authenticator.getUserFromStore().email
  }

  get id () {
    return this.authenticator.getUserFromStore().id
  }

  get password () {
    return this.authenticator.getUserFromStore().password
  }

  get profile () {
    return this.profileFromStore
  }

  get username () {
    return this.authenticator.getUserFromStore().username
  }

  get state () {
    return this.authenticator.getUserFromStore()
  }

  isLoggedIn () {
    return this.authenticator.isLoggedIn()
  }

  isRefreshExpired () {
    return this.authenticator.isRefreshExpired()
  }

  isTokenExpired () {
    return this.authenticator.isTokenExpired()
  }

  login (credentials) {
    return this.authenticator.login(credentials)
  }

  /**
   * @param {Object} token
   * @param {string} token.access_token
   * @param {number} token.expires_in The duration to expire in seconds
   */
  loginWithToken (token) {
    return this.authenticator.loginWithToken(token)
  }

  logout () {
    return this.authenticator.logout()
  }

  refreshToken () {
    return this.authenticator.refreshToken()
  }

  updateProfile (profile) {
    return this.authenticator.updateProfile(profile)
  }

  updateUser (user) {
    return this.authenticator.updateUser(user)
  }
}

export default User
