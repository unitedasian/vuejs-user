import * as components from './src/components'
import User from './src/user'
import userModule from './src/user-store-module'

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

    options.loginUrl = options.loginUrl || '/login'

    // register `user` module to store dynamically
    options.store.registerModule('user', userModule)

    let user = new User(options.store)

    Vue.user = user
    Vue.prototype.$user = user

    // Register global components
    for (let component in components) {
      Vue.component(component, components[component])
    }

    options.router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires authenticated user, check if logged in
        // if not, redirect to login page.
        if (!Vue.user.isLoggedIn()) {
          next({
            path: options.loginUrl,
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next()
      }
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlugin)
}

export default VuePlugin
