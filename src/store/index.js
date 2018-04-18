import Vue from 'vue'
import Storage from 'vue-ls'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default function (options) {
  const storageOptions = {
    namespace: options.localStorageNamespace,
    name: 'uamUserStorage'
  }

  Vue.use(Storage, storageOptions)

  let axios = options.axios
  let profileModel = options.profileModel
  let userModel = options.userModel

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.uamUserStorage.get('access_token')
  axios.defaults.withCredentials = true

  const state = {
    isLoggedIn: !!Vue.uamUserStorage.get('access_token'),
    isRefreshExpired: Vue.uamUserStorage.get('is_refresh_expired'),
    isRequestPending: false,
    isSocialAuthPending: false,
    locale: 'en',
    pending: false,
    tokenExpiresAt: Vue.uamUserStorage.get('access_token_expire'),
    user: Vue.uamUserStorage.get('user')
  }

  return {
    actions: actions(axios),
    getters: getters({ profileModel, userModel }),
    mutations,
    namespaced: true,
    state
  }
}
