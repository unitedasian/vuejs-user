import Vue from 'vue'
import Vuex from 'vuex'
import LocalStorage from 'vue-ls'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

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

  const state = {
    isLoggedIn: !!Vue.ls.get('access_token'),
    tokenExpiresAt: Vue.ls.get('access_token_expire'),
    isRefreshExpired: Vue.ls.get('is_refresh_expired'),
    user : Vue.ls.get('user'),
    pending: false,
    locale: 'en',
    isSocialAuthPending: false,
    isRequestPending: false
  }

  return {
    actions: actions(axios),
    getters: getters({profileModel, userModel}),
    mutations,
    namespaced: true,
    state
  }
}
