import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from 'vue-ls'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const UPDATE_SOCIAL_AUTH_PENDING = 'UPDATE_SOCIAL_AUTH_PENDING'
const UPDATE_REQUEST_PENDING = 'UPDATE_REQUEST_PENDING'

const transmissionLagDuration = 500 // in milliseconds

Vue.use(Vuex)

export default function (options) {
  const storageOptions = {
    namespace: options.localStorageNamespace
  }

  Vue.use(LocalStorage, storageOptions)

  let axios = options.axios
  let profileModel = options.profileModel
  let userModel = options.userModel

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')
  axios.defaults.withCredentials = true

  return {
    namespaced: true,
    state: {
      isLoggedIn: !!Vue.ls.get('access_token'),
      tokenExpiresAt: Vue.ls.get('access_token_expire'),
      isRefreshExpired: Vue.ls.get('is_refresh_expired'),
      user : Vue.ls.get('user'),
      pending: false,
      locale: 'en',
      isSocialAuthPending: false,
      isRequestPending: false
    },
    mutations: {
      [LOGIN] (state) {
        state.pending = true
      },
      [LOGIN_SUCCESS] (state) {
        state.tokenExpiresAt = Vue.ls.get('access_token_expire')
        state.isRefreshExpired = Vue.ls.get('is_refresh_expired')
        state.pending = false
        state.user = Vue.ls.get('user')
        state.isLoggedIn = true
      },
      [LOGOUT] (state) {
        state.tokenExpiresAt = null
        state.isRefreshExpired = Vue.ls.get('is_refresh_expired')
        state.user = null
        state.data = null
        state.isLoggedIn = false
      },
      [UPDATE_USER] (state, user) {
        state.user = Object.assign({}, state.user, user)
      },
      [UPDATE_PROFILE] (state, profile) {
        state.user.profile = profile
      },
      [UPDATE_SOCIAL_AUTH_PENDING] (state, payload) {
        state.isSocialAuthPending = payload.isSocialAuthPending
      },
      [UPDATE_REQUEST_PENDING] (state, payload) {
        state.isRequestPending = payload.isRequestPending
      }
    },
    actions: {
      login ({state, commit, rootState}, payload) {
        commit(LOGIN)

        return new Promise((resolve, reject) => {
          axios.post(payload.loginUrl, payload.credentials)
            .then((response) => {
              let expireUtcTime = new Date().getTime() + (response.data.expires_in * 1000) // in milliseconds

              Vue.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration)
              Vue.ls.set('access_token', response.data.access_token)
              Vue.ls.set('is_refresh_expired', false)

              axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')

              axios.all([
                axios.get(payload.currentUserUrl)
              ])
                .then(([
                         { data: userResponse }
                       ]) => {
                  Vue.ls.set('user', userResponse.user)

                  commit(LOGIN_SUCCESS)
                  resolve()
                })
            })
            .catch(function (error) {
              reject(error)
            })
        })
      },
      loginWithToken ({state, commit, rootState}, payload) {
        commit(LOGIN)

        return new Promise((resolve, reject) => {
          let expireUtcTime = new Date().getTime() + (payload.token.expires_in * 1000) // in milliseconds

          Vue.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration)
          Vue.ls.set('access_token', payload.token.access_token)
          Vue.ls.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')

          axios.get(payload.currentUserUrl)
            .then((response) => {
              Vue.ls.set('user', response.data.user)

              commit(LOGIN_SUCCESS)
              resolve()
            })
            .catch(function (error) {
              reject(error)
            })
        })
      },
      refreshToken ({commit}, payload) {
        commit(LOGIN)

        return new Promise((resolve, reject) => {
          axios.defaults.headers.common['Authorization'] = ''
          axios.post(payload.refreshUrl)
            .then((response) => {
              let expireUtcTime = new Date().getTime() + (response.data.expires_in * 1000) // in milliseconds

              Vue.ls.set('access_token_expire', expireUtcTime - transmissionLagDuration)
              Vue.ls.set('access_token', response.data.access_token)
              Vue.ls.set('is_refresh_expired', false)

              axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('access_token')
              commit(LOGIN_SUCCESS)
              resolve()
            }, (error) => {
              Vue.ls.clear()
              Vue.ls.set('is_refresh_expired', true)

              commit(LOGOUT)
              reject(error)
            })
        })
      },
      logout ({commit}, payload) {
        return new Promise(resolve => {
          axios.post(payload.logoutUrl)
            .then((response) => {
              Vue.ls.clear()

              delete axios.defaults.headers.common['Authorization']

              commit(LOGOUT)
              resolve()
            },(error) => {
              Vue.ls.clear()

              delete axios.defaults.headers.common['Authorization']

              commit(LOGOUT)
              reject(error)
            })
        })
      },
      updateUser ({commit}, user) {
        return new Promise(resolve => {
          if (!user.profile) {
            user.profile = Vue.ls.get('user').profile
          }

          Vue.ls.set('user', user)
          commit(UPDATE_USER, user)
          resolve()
        })
      },
      updateProfile ({commit}, profile) {
        return new Promise(resolve => {
          let user = Vue.ls.get('user')

          user.profile = profile

          Vue.ls.set('user', user)
          commit(UPDATE_PROFILE, profile)
          resolve()
        })
      },
      updateSocialAuthPending ({commit}, isSocialAuthPending) {
        return new Promise(resolve => {
          commit(UPDATE_SOCIAL_AUTH_PENDING, { isSocialAuthPending })
          resolve()
        })
      },
      updateRequestPending ({commit}, isRequestPending) {
        return new Promise(resolve => {
          commit(UPDATE_REQUEST_PENDING, { isRequestPending })
          resolve()
        })
      }
    },
    getters: {
      isLoggedIn: state => {
        return state.isLoggedIn
      },
      tokenExpiresAt: state => {
        return state.tokenExpiresAt
      },
      isRefreshExpired: state => {
        return state.isRefreshExpired
      },
      locale: state => {
        return state.locale
      },
      user: state => {
        userModel.init(state.user)

        return userModel
      },
      profile: state => {
        profileModel.init(state.user && state.user.profile)

        return profileModel
      },
      isSocialAuthPending: state => {
        return state.isSocialAuthPending
      },
      isRequestPending: state => {
        return state.isRequestPending
      }
    }
  }
}
