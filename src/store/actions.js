import Vue from 'vue'
import * as types from './mutation-types'

const transmissionLagDuration = 500 // in milliseconds

export default function (axios) {
  const login = ({commit}, payload) => {
    commit(types.LOGIN)

    return new Promise((resolve, reject) => {
      axios.post(payload.loginUrl, payload.credentials)
        .then((response) => {
          let expireUtcTime = new Date().getTime() + (response.data.expires_in * 1000) // in milliseconds

          Vue.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration)
          Vue.ls.set('access_token', response.data.access_token)
          Vue.ls.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')

          axios.all([axios.get(payload.currentUserUrl)])
            .then(([{ data: userResponse }]) => {
              Vue.ls.set('user', userResponse.user)

              commit(types.LOGIN_SUCCESS)
              resolve()
            })
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  const loginWithToken = ({commit}, payload) => {
    commit(types.LOGIN)

    return new Promise((resolve, reject) => {
      let expireUtcTime = new Date().getTime() + (payload.token.expires_in * 1000) // in milliseconds

      Vue.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration)
      Vue.ls.set('access_token', payload.token.access_token)
      Vue.ls.set('is_refresh_expired', false)

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')

      axios.get(payload.currentUserUrl)
        .then((response) => {
          Vue.ls.set('user', response.data.user)

          commit(types.LOGIN_SUCCESS)
          resolve()
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

  const logout = ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(payload.logoutUrl)
        .then((response) => {
          Vue.ls.clear()

          delete axios.defaults.headers.common['Authorization']

          commit(types.LOGOUT)
          resolve()
        }, (error) => {
          Vue.ls.clear()

          delete axios.defaults.headers.common['Authorization']

          commit(types.LOGOUT)
          reject(error)
        })
    })
  }

  const refreshToken = ({commit}, payload) => {
    commit(types.LOGIN)

    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = ''
      axios.post(payload.refreshUrl)
        .then((response) => {
          let expireUtcTime = new Date().getTime() + (response.data.expires_in * 1000) // in milliseconds

          Vue.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration)
          Vue.ls.set('access_token', response.data.access_token)
          Vue.ls.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')
          commit(types.LOGIN_SUCCESS)
          resolve()
        }, (error) => {
          Vue.ls.clear()
          Vue.ls.set('is_refresh_expired', true)

          commit(types.LOGOUT)
          reject(error)
        })
    })
  }

  const updateProfile = ({commit}, profile) => {
    return new Promise(resolve => {
      let user = Vue.ls.get('user')

      user.profile = profile

      Vue.ls.set('user', user)
      commit(types.UPDATE_PROFILE, profile)
      resolve()
    })
  }

  const updateRequestPending = ({commit}, isRequestPending) => {
    return new Promise(resolve => {
      commit(types.UPDATE_REQUEST_PENDING, { isRequestPending })
      resolve()
    })
  }

  const updateSocialAuthPending = ({commit}, isSocialAuthPending) => {
    return new Promise(resolve => {
      commit(types.UPDATE_SOCIAL_AUTH_PENDING, { isSocialAuthPending })
      resolve()
    })
  }

  const updateUser = ({commit}, user) => {
    return new Promise(resolve => {
      if (!user.profile) {
        user.profile = Vue.ls.get('user').profile
      }

      Vue.ls.set('user', user)
      commit(types.UPDATE_USER, user)
      resolve()
    })
  }

  return {
    login,
    loginWithToken,
    logout,
    refreshToken,
    updateProfile,
    updateRequestPending,
    updateSocialAuthPending,
    updateUser
  }
}
