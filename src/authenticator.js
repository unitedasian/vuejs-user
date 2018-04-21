class Authenticator {
  constructor (options = {}) {
    this.store = options.store

    this.router = options.router

    this.routes = options.routes

    this.apiRoutes = {
      login: '/login',
      logout: '/logout',
      profile: '/profile',
      refresh: '/login/refresh'
    }

    Object.assign(this.apiRoutes, options.apiRoutes)

    this.credentialsParamMapper = {
      username: 'username',
      password: 'password'
    }

    if (options.credentialsParamMapper) {
      Object.assign(this.credentialsParamMapper, options.credentialsParamMapper)
    }

    this.namespace = options.namespace || 'user' // namespace of store module

    this.redirectAfterLogout = options.redirectAfterLogout || 'home'
  }

  get user () {
    return this.store.getters[this.namespace + '/user']
  }

  convertCredentials (credentials) {
    return {
      [this.credentialsParamMapper.username]: credentials.username,
      [this.credentialsParamMapper.password]: credentials.password
    }
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
    let convertedCredentials = this.convertCredentials(credentials)

    return this.store.dispatch(
      this.namespace + '/login',
      {
        credentials: convertedCredentials,
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
    ).then(() => {
      this.router.push({ name: this.redirectAfterLogout })
    }).catch(() => {
      this.router.push({ name: this.redirectAfterLogout })
    })
  }

  refreshToken () {
    return this.store.dispatch(
      this.namespace + '/refreshToken',
      {
        refreshUrl: this.apiRoutes.refresh
      }
    )
  }

  updateProfile (profile, updateUrl) {
    return this.store
      .dispatch(this.namespace + '/updateProfile', { profile, updateUrl })
  }

  updateUser (user, updateUrl) {
    return this.store
      .dispatch(this.namespace + '/updateUser', { user, updateUrl })
  }
}

export default Authenticator
