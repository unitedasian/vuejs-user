import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.LOGIN] (state) {
    state.pending = true
  },

  [types.LOGIN_SUCCESS] (state) {
    state.tokenExpiresAt = vue.uamuUserLs.get('access_token_expire')
    state.isRefreshExpired = vue.uamuUserLs.get('is_refresh_expired')
    state.user = vue.uamuUserLs.get('user')
    state.isLoggedIn = true
    state.pending = false
  },

  [types.LOGOUT] (state) {
    state.tokenExpiresAt = null
    state.isRefreshExpired = vue.uamuUserLs.get('is_refresh_expired')
    state.user = null
    state.isLoggedIn = false
  },

  [types.UPDATE_PROFILE] (state, profile) {
    state.user.profile = profile
  },

  [types.UPDATE_REQUEST_PENDING] (state, payload) {
    state.isRequestPending = payload.isRequestPending
  },

  [types.UPDATE_SOCIAL_AUTH_PENDING] (state, payload) {
    state.isSocialAuthPending = payload.isSocialAuthPending
  },

  [types.UPDATE_USER] (state, user) {
    state.user = Object.assign({}, state.user, user)
  }
}
