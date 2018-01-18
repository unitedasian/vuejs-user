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
      .then(
        () => {
          this.state = this.authenticator.getUserFromStore()
        },
        (error) => {
          throw error
        }
      )
  }

  /**
   * @param {Object} token
   * @param {string} token.access_token
   * @param {number} token.expires_in The duration to expire in seconds
   */
  loginWithToken (token) {
    return this.authenticator.loginWithToken(token)
      .then(
        () => {
          this.state = this.authenticator.getUserFromStore()
        },
        (error) => {
          throw error
        }
      )
  }

  logout () {
    return this.authenticator.logout()
      .then(
        () => {
          this.state = null
        },
        (error) => {
          throw error
        }
      )
  }

  refreshToken () {
    return this.authenticator.refreshToken()
      .then(
        () => {
          this.state = this.authenticator.getUserFromStore()
        },
        (error) => {
          this.state = null

          throw error
        }
      )
  }

  updateProfile (profile) {
    return this.authenticator.updateProfile(profile)
      .then(
        () => {
          this.state.profile = this.authenticator.getProfileFromStore()
        },
        (error) => {
          throw error
        }
      )
  }

  updateUser (user) {
    return this.authenticator.updateUser(user)
      .then(
        () => {
          this.state = this.authenticator.getUserFromStore()
        },
        (error) => {
          throw error
        }
      )
  }
}

export default User
