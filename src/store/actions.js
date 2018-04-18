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

          Vue.uamUserStorage.set('access_token_expire', expireUtcTime - transmissionLagDuration)
          Vue.uamUserStorage.set('access_token', response.data.access_token)
          Vue.uamUserStorage.set('refresh_token', response.data.refresh_token)
          Vue.uamUserStorage.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.uamUserStorage.get('access_token')

          axios.all([axios.get(payload.currentUserUrl)])
            .then(([{ data: userResponse }]) => {
              Vue.uamUserStorage.set('user', userResponse.user)

              commit(types.LOGIN_SUCCESS)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const loginWithToken = ({ commit }, payload) => {
    commit(types.LOGIN)

    return new Promise((resolve, reject) => {
      let expireUtcTime = new Date().getTime() + (payload.token.expires_in * 1000) // in milliseconds

      Vue.uamUserStorage.set('access_token_expire', expireUtcTime - transmissionLagDuration)
      Vue.uamUserStorage.set('access_token', payload.token.access_token)
      Vue.uamUserStorage.set('refresh_token', payload.token.refresh_token)
      Vue.uamUserStorage.set('is_refresh_expired', false)

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.uamUserStorage.get('access_token')

      axios.get(payload.currentUserUrl)
        .then((response) => {
          Vue.uamUserStorage.set('user', response.data.user)

          commit(types.LOGIN_SUCCESS)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const logout = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(payload.logoutUrl)
        .then((response) => {
          Vue.uamUserStorage.clear()

          delete axios.defaults.headers.common['Authorization']

          commit(types.LOGOUT)
          resolve()
        })
        .catch((error) => {
          Vue.uamUserStorage.clear()

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

      let refreshAxiosInstance = axios.create({
      })

      let refreshPayload = null

      if (Vue.uamUserStorage.get('refresh_token')) {
        refreshPayload = { refresh_token: Vue.uamUserStorage.get('refresh_token') }
      }

      refreshAxiosInstance.post(payload.refreshUrl, refreshPayload)
        .then((response) => {
          let expireUtcTime = new Date().getTime() + (response.data.expires_in * 1000) // in milliseconds

          Vue.uamUserStorage.set('access_token_expire', expireUtcTime - transmissionLagDuration)
          Vue.uamUserStorage.set('access_token', response.data.access_token)
          Vue.uamUserStorage.set('refresh_token', response.data.refresh_token)
          Vue.uamUserStorage.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.uamUserStorage.get('access_token')
          commit(types.LOGIN_SUCCESS)
          resolve()
        }, (error) => {
          Vue.uamUserStorage.clear()
          Vue.uamUserStorage.set('is_refresh_expired', true)

          commit(types.LOGOUT)
          reject(error)
        })
    })
  }

  const updateProfile = ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      axios.put(payload.updateUrl, payload.profile)
        .then((response) => {
          let user = Vue.uamUserStorage.get('user')

          user.profile = response.data.profile

          Vue.uamUserStorage.set('user', user)
          commit(types.UPDATE_PROFILE, response.data.profile)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
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

  const updateUser = ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      axios.put(payload.updateUrl, payload.user)
        .then((response) => {
          let updatedUser = response.data

          if (!updatedUser.profile) {
            updatedUser.profile = Vue.uamUserStorage.get('user').profile
          }

          Vue.uamUserStorage.set('user', updatedUser)
          commit(types.UPDATE_USER, updatedUser)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
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
