import * as components from './components'
import User from './User'
import userModule from './user-store'

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

    // register `user` module to store dynamically
    options.store.registerModule('user', userModule)

    let user = new User(options.store)

    Vue.user = user
    Vue.prototype.$user = user

    // Register global components
    for (let component in components) {
      Vue.component(component, components[component])
    }

    options.router.addRoutes([
      {
        path: '/login',
        name: 'login',
        component: components['login'],
        props: (route) => ({ redirectTo: route.query.redirect })
      },
      {
        path: '/profile',
        name: 'profile',
        component: components['profile'],
        meta: { requiresAuth: true },
        props: {
          getUrl: '/user/me',
          updateUrl: '/users/'
        }
      }
    ])

    options.router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires authenticated user, check if logged in
        // if not, redirect to login page.
        if (!Vue.user.isLoggedIn()) {
          next({
            path: '/login',
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
