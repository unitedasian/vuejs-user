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
          Vue.ls.set('refresh_token', response.data.refresh_token)
          Vue.ls.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')

          axios.all([axios.get(payload.currentUserUrl)])
            .then(([{ data: userResponse }]) => {
              Vue.ls.set('user', userResponse.user)

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
        .catch((error) => {
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
        })
        .catch((error) => {
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

      let refreshAxiosInstance = axios.create({
      })

      let refreshPayload = null

      if (Vue.ls.get('refresh_token')) {
        refreshPayload = { refresh_token: Vue.ls.get('refresh_token') }
      }

      refreshAxiosInstance.post(payload.refreshUrl, refreshPayload)
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

  const updateProfile = ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      axios.put(payload.updateUrl, payload.profile)
        .then((response) => {
          let user = Vue.ls.get('user')

          user.profile = response.data.profile

          Vue.ls.set('user', user)
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
            updatedUser.profile = Vue.ls.get('user').profile
          }

          Vue.ls.set('user', updatedUser)
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
