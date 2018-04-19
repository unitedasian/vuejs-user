import storage from './storage'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default function (options) {
  let axios = options.axios
  let profileModel = options.profileModel
  let userModel = options.userModel

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.get('access_token')
  axios.defaults.withCredentials = true

  const state = {
    isLoggedIn: !!storage.get('access_token'),
    isRefreshExpired: storage.get('is_refresh_expired'),
    isRequestPending: false,
    isSocialAuthPending: false,
    locale: 'en',
    pending: false,
    tokenExpiresAt: storage.get('access_token_expire'),
    user: storage.get('user')
  }

  return {
    actions: actions(axios),
    getters: getters({ profileModel, userModel }),
    mutations,
    namespaced: true,
    state
  }
}
