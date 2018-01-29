class Authenticator {
  constructor (store, userEndpoints, namespace) {
    this.store = store

    this.userEndpoints = {
      login: '/login',
      refresh: '/login/refresh',
      currentUser: '/user/me?includes[]=profile'
    }

    Object.assign(this.userEndpoints, userEndpoints)

    this.namespace = namespace ? namespace : 'user' // namespace of store module
  }

  get profile () {
    return this.store.getters[this.namespace + '/profile']
  }

  get user () {
    return this.store.getters[this.namespace + '/user']
  }

  getProfileFromStore () {
    return this.store.getters[this.namespace + '/profile']
  }

  getUserFromStore () {
    return this.store.getters[this.namespace + '/user']
  }

  isLoggedIn () {
    return this.store.getters[this.namespace + '/isLoggedIn']
  }

  isRefreshExpired () {
    return this.store.getters[this.namespace + '/isRefreshExpired']
  }

  isTokenExpired () {
    return (this.store.getters[this.namespace + '/tokenExpiresAt'] <= new Date().getTime())
  }

  login (credentials) {
    return this.store.dispatch(
      this.namespace + '/login',
      { credentials, loginUrl: this.userEndpoints.login, currentUserUrl: this.userEndpoints.currentUser }
    )
  }

  /**
   * @param {Object} token
   * @param {string} token.access_token
   * @param {number} token.expires_in The duration to expire in seconds
   */
  loginWithToken (token) {
    return this.store.dispatch(
      this.namespace + '/loginWithToken',
      { token, currentUserUrl: this.userEndpoints.currentUser }
    )
  }

  logout () {
    return this.store
      .dispatch(this.namespace + '/logout')
  }

  refreshToken () {
    return this.store.dispatch(
      this.namespace + '/refreshToken',
      { refreshUrl: this.userEndpoints.refresh }
    )
  }

  updateProfile (profile) {
    return this.store
      .dispatch(this.namespace + '/updateProfile', profile)
  }

  updateUser (user) {
    return this.store
      .dispatch(this.namespace + '/updateUser', user)
  }
}

export default Authenticator
