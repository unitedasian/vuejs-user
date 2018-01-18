class Authenticator {
  constructor (store, userEndpoints) {
    this.store = store

    this.userEndpoints = {
      login: '/login',
      refresh: '/login/refresh',
      currentUser: '/user/me?includes[]=profile'
    }

    Object.assign(this.userEndpoints, userEndpoints)
  }

  getProfileFromStore () {
    return this.store.getters['user/profile']
  }

  getUserFromStore () {
    return this.store.getters['user/user']
  }

  isLoggedIn () {
    return this.store.getters['user/isLoggedIn']
  }

  isRefreshExpired () {
    return this.store.getters['user/isRefreshExpired']
  }

  isTokenExpired () {
    return (this.store.getters['user/tokenExpiresAt'] <= new Date().getTime())
  }

  login (credentials) {
    return this.store.dispatch(
      'user/login',
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
      'user/loginWithToken',
      { token, currentUserUrl: this.userEndpoints.currentUser }
    )
  }

  logout () {
    return this.store
      .dispatch('user/logout')
  }

  refreshToken () {
    return this.store.dispatch(
      'user/refreshToken',
      { refreshUrl: this.userEndpoints.refresh }
    )
  }

  updateProfile (profile) {
    return this.store
      .dispatch('user/updateProfile', profile)
  }

  updateUser (user) {
    return this.store
      .dispatch('user/updateUser', user)
  }
}

export default Authenticator
