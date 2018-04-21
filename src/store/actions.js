import * as types from './mutation-types'
import storage from './storage'

const transmissionLagDuration = 500 // in milliseconds

export default function (axios) {
  const login = ({ commit }, payload) => {
    commit(types.LOGIN)

    return new Promise((resolve, reject) => {
      axios.post(payload.loginUrl, payload.credentials)
        .then(response => {
          let expireUtcTime = new Date().getTime() + (response.data.expires_in * 1000) // in milliseconds

          storage.set('access_token_expire', expireUtcTime - transmissionLagDuration)
          storage.set('access_token', response.data.access_token)
          storage.set('refresh_token', response.data.refresh_token)
          storage.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.get('access_token')

          axios.get(payload.profileUrl)
            .then(profileResponse => {
              storage.set('user', profileResponse.data.user)

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

      storage.set('access_token_expire', expireUtcTime - transmissionLagDuration)
      storage.set('access_token', payload.token.access_token)
      storage.set('refresh_token', payload.token.refresh_token)
      storage.set('is_refresh_expired', false)

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.get('access_token')

      axios.get(payload.currentUserUrl)
        .then((response) => {
          storage.set('user', response.data.user)

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
          storage.clear()

          delete axios.defaults.headers.common['Authorization']

          commit(types.LOGOUT)
          resolve()
        })
        .catch((error) => {
          storage.clear()

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

      if (storage.get('refresh_token')) {
        refreshPayload = { refresh_token: storage.get('refresh_token') }
      }

      refreshAxiosInstance.post(payload.refreshUrl, refreshPayload)
        .then((response) => {
          let expireUtcTime = new Date().getTime() + (response.data.expires_in * 1000) // in milliseconds

          storage.set('access_token_expire', expireUtcTime - transmissionLagDuration)
          storage.set('access_token', response.data.access_token)
          storage.set('refresh_token', response.data.refresh_token)
          storage.set('is_refresh_expired', false)

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + storage.get('access_token')
          commit(types.LOGIN_SUCCESS)
          resolve()
        }, (error) => {
          storage.clear()
          storage.set('is_refresh_expired', true)

          commit(types.LOGOUT)
          reject(error)
        })
    })
  }

  const updateProfile = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios.put(payload.updateUrl, payload.profile)
        .then((response) => {
          let user = storage.get('user')

          user.profile = response.data.profile

          storage.set('user', user)
          commit(types.UPDATE_PROFILE, response.data.profile)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const updateRequestPending = ({ commit }, isRequestPending) => {
    return new Promise(resolve => {
      commit(types.UPDATE_REQUEST_PENDING, { isRequestPending })
      resolve()
    })
  }

  const updateSocialAuthPending = ({ commit }, isSocialAuthPending) => {
    return new Promise(resolve => {
      commit(types.UPDATE_SOCIAL_AUTH_PENDING, { isSocialAuthPending })
      resolve()
    })
  }

  const updateUser = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      axios.put(payload.updateUrl, payload.user)
        .then((response) => {
          let updatedUser = response.data

          if (!updatedUser.profile) {
            updatedUser.profile = storage.get('user').profile
          }

          storage.set('user', updatedUser)
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
