class User {
  constructor (store) {
    this.store = store
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
    return this.store
      .dispatch('user/login', credentials)
  }

  /**
   * @param {Object} token
   * @param {string} token.access_token
   * @param {number} token.expires_in The duration to expire in seconds
   */
  loginWithToken (token) {
    return this.store
      .dispatch('user/loginWithToken', token)
  }

  logout () {
    return this.store
      .dispatch('user/logout')
  }

  refreshToken () {
    return this.store
      .dispatch('user/refreshToken')
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
