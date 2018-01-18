import BaseUser from './models/User'

class User extends BaseUser {
  constructor (state, authenticator) {
    super(state)

    this.authenticator = authenticator ? authenticator : null
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
