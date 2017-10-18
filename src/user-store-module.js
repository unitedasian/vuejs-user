import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import LocalStorage from 'vue-ls'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const UPDATE_SOCIAL_AUTH_PENDING = 'UPDATE_SOCIAL_AUTH_PENDING'
const UPDATE_REQUEST_PENDING = 'UPDATE_REQUEST_PENDING'

const options = {
  namespace: '_user_'
}

Vue.use(LocalStorage, options)
Vue.use(Vuex)

axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('id_token')
axios.defaults.withCredentials = true

export default {
  namespaced: true,
  state: {
    isLoggedIn: !!Vue.ls.get('id_token'),
    user: Vue.ls.get('user'),
    profile: Vue.ls.get('profile'),
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
      state.isLoggedIn = true
      state.pending = false
      state.user = Vue.ls.get('user')
      state.profile = Vue.ls.get('profile')
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
      state.user = null
      state.profile = null
      state.data = null
    },
    [UPDATE_USER] (state, user) {
      state.user = user
    },
    [UPDATE_PROFILE] (state, profile) {
      state.profile = profile
    },
    [UPDATE_SOCIAL_AUTH_PENDING] (state, payload) {
      state.isSocialAuthPending = payload.isSocialAuthPending
    },
    [UPDATE_REQUEST_PENDING] (state, payload) {
      state.isRequestPending = payload.isRequestPending
    }
  },
  actions: {
    login ({state, commit, rootState}, credentials) {
      commit(LOGIN)

      return new Promise((resolve, reject) => {
        axios.post('/login', credentials)
          .then((response) => {
            Vue.ls.set('id_token', response.data.access_token)

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('id_token')

            axios.all([
              axios.get('/user/me?includes[]=profile')
            ])
              .then(([
                       { data: userResponse }
                     ]) => {
                Vue.ls.set('profile', userResponse.user.profile)
                delete userResponse.user.profile
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
    loginWithToken ({state, commit, rootState}, accessToken) {
      commit(LOGIN)

      return new Promise((resolve, reject) => {
        Vue.ls.set('id_token', accessToken)

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('id_token')

        axios.get('/user/me?includes[]=profile')
          .then((response) =>{
            Vue.ls.set('profile', response.data.user.profile)
            delete response.data.user.profile
            Vue.ls.set('user', response.data.user)

            commit(LOGIN_SUCCESS)
            resolve()
          })
          .catch(function (error) {
            reject(error)
          })
      })
    },
    refreshToken ({commit}) {
      commit(LOGIN)

      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = ''
        axios.post('/login/refresh')
          .then((response) => {
            Vue.ls.set('id_token', response.data.access_token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.ls.get('id_token')
            commit(LOGIN_SUCCESS)
            resolve()
          }, () => {
            Vue.ls.clear()
            commit(LOGOUT)
            reject()
          })
      })
    },
    logout ({commit}) {
      return new Promise(resolve => {
        Vue.ls.clear()
        commit(LOGOUT)
        resolve()
      })
    },
    updateUser ({commit}, user) {
      return new Promise(resolve => {
        Vue.ls.set('user', user)
        commit(UPDATE_USER, user)
        resolve()
      })
    },
    updateProfile ({commit}, profile) {
      return new Promise(resolve => {
        Vue.ls.set('profile', profile)
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
    locale: state => {
      return state.locale
    },
    user: state => {
      return state.user
    },
    profile: state => {
      return state.profile
    },
    isSocialAuthPending: state => {
      return state.isSocialAuthPending
    },
    isRequestPending: state => {
      return state.isRequestPending
    }
  }
}
