import Login from '../modules/login/Index'

const addRoutes = (router, meta) => {
  router.addRoutes([
    {
      component: Login,
      name: 'login',
      path: '/login',
      props: (route) => ({ redirectTo: route.query.redirect })
    }
  ])
}

export default {
  addRoutes
}
