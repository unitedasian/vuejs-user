# Vuejs user

## Installation

### via npm

```bash
npm install uam-vuejs-user
```

### via yarn

```bash
yarn add uam-vuejs-user
```

## Usage

Provided components are built on Bootstrap 4 so install bootstrap 4 as stated [here](https://getbootstrap.com/docs/4.0/getting-started/introduction/).

For Font Awesome icons, add following to `<head>` :

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```

Install Vuejs user module as follows:

```js
# main.js

import userPlugin from 'uam-vuejs-user'

import Profile from './models/Profile'
import User from './models/User'

let apiRoutes = {
  currentUser: '/user/me?includes[]=profile',
  login: '/login',
  logout: '/logout',
  refresh: '/login/refresh'
}

let routes = {
  login: 'login',
  logout: 'login', // route to go after logout
  profile: 'profile'
}

// key is credential param used by user plugin, value is param needed by backend
let credentialsParamMapper = {
  username: 'email'
}

let profileModel = new Profile()
let userModel = new User()

Vue.use(
  userPlugin,
  {
    apiRoutes,
    axios,
    credentialsParamMapper,
    localStorageNamespace: '_app_name_',
    profileModel,
    redirectRoute: 'login',
    router,
    routes,
    store,
    userModel,
    vueAuthenticateOptions,
  }
)
```

## Options

| Option                 | Description                                   | Type     | Default Value       |
|:-----------------------|:----------------------------------------------|:---------|:--------------------|
| apiRoutes              | API endpoints related to user authentication  | Object   |                     |
| axios                  | The instance of axios used by app             | Object   |                     |
| credentialsParamMapper | Overridden credential keys to API keys mapper | Object   |                     |
| localStorageNamespace  | Namespace(prefix) for local storage keys      | String   | `'_user_'`          |
| profileModel           | The stub instance of profile model            | Object   | `UAMProfile` object |
| redirectRoute          | Route name to redirect to, for authentication | String   | `'login'`           |
| router                 | The registered router instance                | Object   |                     |
| routes                 | Routes defined on app that are usd by plugin  | Object   |                     |
| store                  | The Vuex store to use                         | Object   |                     |
| userModel              | The stub instance of user model               | Object   | `UAMUser` object    |
| vueAuthenticateOptions | Social login provider options                 | Object   |                     |

**Note:** `routes` option can have `logout` key whose value does not refer route of logout. It refers the route to go after logout.

## Route meta fields

This plugin uses following meta fields in `beforeEach` guard of router instance.
These can be specified when defining a route in the app


| Meta field key   | Description                                                                       | Type    | Value  |
|:-----------------|:----------------------------------------------------------------------------------|:--------|:-------|
| redirectOnExpire | Redirect to `redirectRoute` when both access token and refresh token gets expired | Boolean | `true` |
| requiresAuth     | Make route accessible to only authenticated user. Redirects to `redirectRoute` when user is not logged in. | Boolean | `true` |

## Social login

For social login, install and setup [vue-authenticate](https://github.com/dgrubelic/vue-authenticate#installation) in your app as follows:

```js
# main.js

let vueAuthenticateOptions = {
  baseUrl: process.env.API_BASE_URL, // API domain

  providers: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      redirectUri: window.location.origin + '/'
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      redirectUri: window.location.origin
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUri: window.location.origin
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      redirectUri: window.location.origin
    }
  }
}

Vue.use(User, { store, router, redirectRoute: 'login', userEndpoints, vueAuthenticateOptions, axios })

```

Configure client ID of each platform that you want to enable on `config/{environment}.env.js` of your app.

Then you can render login component with various social login links by passing respective prop as follows:

```vue
<uam-login facebook github google linkedin></uam-login>
```

## For login form on modal dialog

When refreshing token, if error occurs with 401 Unauthorized status, you can use `uam-login` component as modal body inside your modal.

You can set `no-redirect` prop to remain on current page after logging through modal dialog.
You can listen to `login-success` event and handle closing modal dialog, re-requesting endpoint etc. on your event handler.

```html
<uam-login @login-success="hideLoginModal"></uam-login>
```

## Component Reference

### `<uam-login>`

#### Properties

| Property    | Description                           | Type    | Default Value                     |
|:------------|:--------------------------------------|:--------|:----------------------------------|
| facebook    | Facebook login button                 | Boolean | `false`                           |
| github      | Github login button                   | Boolean | `false`                           |
| google      | Google login button                   | Boolean | `false`                           |
| linkedin    | Linkedin login button                 | Boolean | `false`                           |
| title       | Title to show as heading              | String  | translated `user.login.title` key |

#### Events

| Event         | Description                        |
|:--------------|:-----------------------------------|
| before-login  | emits before invoking login        |
| login-error   | emits after error while logging in |
| login-success | emits after successful login       |

### `<uam-profile>`

#### Properties

| Property    | Description                              | Type    | Default Value |
|:------------|:-----------------------------------------|:--------|:--------------|
| update-url  | API route to update current user profile | String  |               |

#### Events

| Event              | Description                                            |
|:-------------------|:-------------------------------------------------------|
| before-update      | emits before invoking update                           |
| unauthorized-error | emits if response status is 401 while refreshing token |
| update-error       | emits after error while updating profile               |
| update-success     | emits after successful profile update                  |

### `<uam-user-menu>`

#### Properties

| Property       | Description                    | Type    | Default Value                      |
|:---------------|:-------------------------------|:--------|:-----------------------------------|
| divider        | Show dropdown divider          | Boolean | `true`                             |
| right          | Right align dowpdown menu      | Boolean | `false`                            |
| welcome        | Content to show on menu button | String  | translated `user.menu.welcome` key |
