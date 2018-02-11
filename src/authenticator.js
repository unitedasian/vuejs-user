class Authenticator {
  constructor (store, routes, apiRoutes, namespace) {
    this.store = store

    this.routes = routes

    this.apiRoutes = {
      login: '/login',
      logout: '/logout',
      refresh: '/login/refresh',
      currentUser: '/user/me?includes[]=profile'
    }

    Object.assign(this.apiRoutes, apiRoutes)

    this.namespace = namespace ? namespace : 'user' // namespace of store module
  }

  get user () {
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
      {
        credentials,
        loginUrl: this.apiRoutes.login,
        currentUserUrl: this.apiRoutes.currentUser
      }
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
      {
        token,
        currentUserUrl: this.apiRoutes.currentUser
      }
    )
  }

  logout () {
    return this.store.dispatch(
      this.namespace + '/logout',
      {
        logoutUrl: this.apiRoutes.logout
      }
    )
  }

  refreshToken () {
    return this.store.dispatch(
      this.namespace + '/refreshToken',
      {
        refreshUrl: this.apiRoutes.refresh
      }
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
