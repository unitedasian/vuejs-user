import Vue from 'vue'
import LocalStorage from 'vue-ls'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default function (options) {
  const storageOptions = {
    namespace: options.localStorageNamespace,
    name: 'uamUserLs'
  }

  Vue.use(LocalStorage, storageOptions)

  let axios = options.axios
  let profileModel = options.profileModel
  let userModel = options.userModel

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + vue.uamuUserLs.get('access_token')
  axios.defaults.withCredentials = true

  const state = {
    isLoggedIn: !!vue.uamuUserLs.get('access_token'),
    isRefreshExpired: vue.uamuUserLs.get('is_refresh_expired'),
    isRequestPending: false,
    isSocialAuthPending: false,
    locale: 'en',
    pending: false,
    tokenExpiresAt: Vue.uamUserLs.get('access_token_expire'),
    user: vue.uamuUserLs.get('user')
  }

  return {
    actions: actions(axios),
    getters: getters({profileModel, userModel}),
    mutations,
    namespaced: true,
    state
  }
}
