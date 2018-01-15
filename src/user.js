class User {
  constructor (store, userEndpoints) {
    this.store = store

    this.userEndpoints = {
      login: '/login',
      refresh: '/login/refresh',
      currentUser: '/user/me?includes[]=profile'
    }

    Object.assign(this.userEndpoints, userEndpoints)
  }

  getCurrentUser () {
    return this.store.getters['user/user']
  }

  getProfile () {
    return this.store.getters['user/profile']
  }

  isLoggedIn () {
    return this.store.getters['user/isLoggedIn']
  }

  isTokenExpired () {
    return (this.store.getters['user/tokenExpireIn'] <= new Date().getTime())
  }

  isRefreshExpired () {
    return this.store.getters['user/isRefreshExpired']
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

  refreshToken (callback, args = []) {
    if (callback === undefined) {
      return this.store.dispatch(
        'user/refreshToken',
        { refreshUrl: this.userEndpoints.refresh }
      )
    } else {
      this.store.dispatch(
        'user/refreshToken',
        { refreshUrl: this.userEndpoints.refresh }
      ).then(() => {
          if (callback) {
            callback(...args)
          }
        }).catch((error) => {
          throw error
        })
    }
  }

  updateUser (user) {
    return this.store
      .dispatch('user/updateUser', user)
  }

  updateProfile (profile) {
    return this.store
      .dispatch('user/updateProfile', profile)
  }
}

export default User
