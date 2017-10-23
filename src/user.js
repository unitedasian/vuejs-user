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

  login (credentials) {
    return this.store
      .dispatch('user/login', credentials)
  }

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
