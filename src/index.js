import * as components from './components'
import Authenticator from './authenticator'
import UAMProfile from './models/Profile'
import UAMUser from './models/User'
import userStoreModuleFunction from './store'

import VueAuthenticate from 'vue-authenticate'
import VueAxios from 'vue-axios'

const VuePlugin = {
  /**
   * Install user plugin
   *
   * @param {Vue} Vue
   * @param {Object} options
   */
  install: (Vue, options = {}) => {
    if (Vue._uam_user_vue_installed) {
      return
    }

    Vue._uam_user_vue_installed = true

    let loginRouteName = options.loginRouteName || 'login'

    let store = options.store

    let axios = options.axios

    let profileModel = options.profileModel || new UAMProfile()

    let userModel = options.userModel || new UAMUser()

    let userModule = userStoreModuleFunction({ axios, userModel, profileModel })

    // Registered store module is namespaced based on the path(module name) the module is registered at
    const moduleName = 'user'

    const moduleNamespace = moduleName

    // register `user` module to store dynamically
    store.registerModule(moduleName, userModule)

    let authenticator = new Authenticator(
      {
        apiRoutes: options.apiRoutes,
        credentialsParamMapper: options.credentialsParamMapper,
        namespace: moduleNamespace,
        router: options.router,
        redirectAfterLogout: options.redirectAfterLogout,
        store
      }
    )

    Vue.uamAuth = authenticator
    Vue.prototype.$uamAuth = authenticator

    // Register global components
    for (let component in components) {
      Vue.component(component, components[component])
    }

    options.router.beforeEach((to, from, next) => {
      if (to.matched.length) {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          // this route requires authenticated user, check if logged in
          // if not, redirect to login page.
          if (!Vue.uamAuth.isLoggedIn()) {
            next({
              name: loginRouteName,
              query: { redirect: to.name }
            })
          } else {
            if (Vue.uamAuth.isTokenExpired()) { // check if access token expired on client side (offline auth)
              Vue.uamAuth.refreshToken()
                .then(() => {
                  next()
                })
                .catch(() => {
                  if (to.matched.some(record => record.meta.redirectOnExpire)) {
                  // at-least one of child routes or parent route record have meta field `redirectOnExpire` set to true
                    next({
                      name: loginRouteName,
                      query: { redirect: to.name }
                    })
                  } else {
                    next()
                  }
                })
            } else {
              next()
            }
          }
        } else { // doesn't require any authentication such as home page, login page
          next()
        }
      } else { // when url path doesn't match with any registered route
        window.location = window.location.origin
      }
    })

    let socialAuthAxiosInstance = axios.create({})

    Vue.use(VueAxios, socialAuthAxiosInstance)

    let axiosInterceptors = {
      bindRequestInterceptor: function () {
        socialAuthAxiosInstance.interceptors.request.use((config) => {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', true)
          return config
        }, (error) => {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', false)
          return Promise.reject(error)
        })
      },

      bindResponseInterceptor: function () {
        socialAuthAxiosInstance.interceptors.response.use((response) => {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', false)
          return response
        }, (error) => {
          store.dispatch(moduleNamespace + '/updateSocialAuthPending', false)
          return Promise.reject(error)
        })
      }
    }

    for (let name in axiosInterceptors) {
      options.vueAuthenticateOptions[name] = axiosInterceptors[name]
    }

    Vue.use(VueAuthenticate, options.vueAuthenticateOptions)

    // Axios request interceptor
    axios.interceptors.request.use((config) => {
      store.dispatch(moduleNamespace + '/updateRequestPending', true)
      return config
    }, (error) => {
      store.dispatch(moduleNamespace + '/updateRequestPending', false)
      return Promise.reject(error)
    })

    let ongoingRefreshTokenPromise = null

    /**
     * This function makes a call to refresh access token(if ongoingRefreshTokenPromise is not set)
     * or else, it returns the same promise as an in-progress call that refresh access token
     */
    function getRefreshTokenPromise () {
      if (!ongoingRefreshTokenPromise) {
        ongoingRefreshTokenPromise = Vue.uamAuth.refreshToken()

        ongoingRefreshTokenPromise.then(resetOngoingRefreshTokenPromise, resetOngoingRefreshTokenPromise)
      }

      return ongoingRefreshTokenPromise
    }

    function resetOngoingRefreshTokenPromise () {
      ongoingRefreshTokenPromise = null
    }

    // Axios response interceptor
    axios.interceptors.response.use((response) => {
      store.dispatch(moduleNamespace + '/updateRequestPending', false)
      return response
    }, (error) => {
      if (
        error.response &&
          error.response.status === 401 &&
          !error.config.__isRetryRequest
      ) {
        return new Promise((resolve, reject) => {
          getRefreshTokenPromise()
            .then(() => {
              error.config.__isRetryRequest = true
              delete error.config.headers.Authorization

              store.dispatch(moduleNamespace + '/updateRequestPending', false)
              resolve(axios(error.config))
            })
            .catch((error) => {
              store.dispatch(moduleNamespace + '/updateRequestPending', false)
              reject(error)
            })
        })
      }

      store.dispatch(moduleNamespace + '/updateRequestPending', false)

      return Promise.reject(error)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin)
}

export default VuePlugin

export {
  UAMProfile,
  UAMUser
}
