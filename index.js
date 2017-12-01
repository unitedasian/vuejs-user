import * as components from './src/components'
import User from './src/user'
import userModule from './src/user-store-module'

// import axios from 'axios'
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

    options.redirectRoute = options.redirectRoute || '/login'

    let store = options.store

    Vue.axios = options.axios
    Vue.prototype.$axios = options.axios

    var axios = Vue.axios

    // register `user` module to store dynamically
    store.registerModule('user', userModule)

    let user = new User(store, options.userEndpoints)

    Vue.user = user
    Vue.prototype.$user = user

    // Register global components
    for (let component in components) {
      Vue.component(component, components[component])
    }

    options.router.beforeEach((to, from, next) => {
      if (to.matched.length) {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          // this route requires authenticated user, check if logged in
          // if not, redirect to login page.
          if (!Vue.user.isLoggedIn()) {
            next({
              path: options.redirectRoute,
              query: { redirect: to.fullPath }
            })
          } else {
            if (Vue.user.isTokenExpired()) { // check if access token expired on client side (offline auth)
              Vue.user.refreshToken()
                .then(() => {
                  next()
                })
                .catch(() => {
                  if (to.matched.some(record => record.meta.redirectOnExpire)) {
                  // at-least one of child routes or parent route record have meta field `redirectOnExpire` set to true
                    next({
                      path: options.redirectRoute,
                      query: { redirect: to.fullPath }
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

    let socialAuthAxiosInstance = axios.create({
    })

    Vue.use(VueAxios, socialAuthAxiosInstance)

    let axiosInterceptors = {
      bindRequestInterceptor: function () {
        socialAuthAxiosInstance.interceptors.request.use((config) => {
          store.dispatch('user/updateSocialAuthPending', true)
          return config
        }, (error) => {
          store.dispatch('user/updateSocialAuthPending', false)
          return Promise.reject(error)
        })
      },

      bindResponseInterceptor: function () {
        socialAuthAxiosInstance.interceptors.response.use((response) => {
          store.dispatch('user/updateSocialAuthPending', false)
          return response
        }, (error) => {
          store.dispatch('user/updateSocialAuthPending', false)
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
      store.dispatch('user/updateRequestPending', true)
      return config
    }, (error) => {
      store.dispatch('user/updateRequestPending', false)
      return Promise.reject(error)
    })

    // Axios response interceptor
    axios.interceptors.response.use((response) => {
      store.dispatch('user/updateRequestPending', false)
      return response
    }, (error) => {
      store.dispatch('user/updateRequestPending', false)
      return Promise.reject(error)
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin)
}

export default VuePlugin
