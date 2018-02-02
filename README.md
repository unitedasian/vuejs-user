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

import Profile from './models/Profile'
import User from './models/User'

import userPlugin from 'uam-vuejs-user'

let userEndpoints = {
  login: '/login',
  logout: '/logout',
  refresh: '/login/refresh',
  currentUser: '/user/me?includes[]=profile'
}

let profileModel = new Profile()
let userModel = new User()

Vue.use(
  userPlugin,
  { store, router, redirectRoute: '/login', userEndpoints, vueAuthenticateOptions, axios, profileModel, userModel }
)
```

## Options

| Option                 | Description                                   | Type     | Default Value       |
|:-----------------------|:----------------------------------------------|:---------|:--------------------|
| axios                  | The instance of axios used by app             | Object   |                     |
| profileModel           | The stub instance of profile model            | Object   | `UAMProfile` object |
| redirectRoute          | Route name to redirect to, for authentication | String   | `'login'`           |
| router                 | The registered router instance                | Object   |                     |
| store                  | The Vuex store to use                         | Object   |                     |
| userEndpoints          | User auth related backend urls                | Object   |                     |
| userModel              | The stub instance of user model               | Object   | `UAMUser` object    |
| vueAuthenticateOptions | Social login provider options                 | Object   |                     |

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
<uam-login @login-success="hideLoginModal" no-redirect></uam-login>
```

## Component Reference

### `<uam-login>`

**Note:** App using `uam-login` component should have vue route named `home`. After successful login, page redirects to `home` route.

#### Properties

| Property    | Description                           | Type    | Default Value |
|:------------|:--------------------------------------|:--------|:--------------|
| redirect-to | vue route to redirect to, after login | String  |               |
| no-redirect | No redirect on login success          | Boolean | `false`       |
| facebook    | Facebook login button                 | Boolean | `false`       |
| github      | Github login button                   | Boolean | `false`       |
| google      | Google login button                   | Boolean | `false`       |
| linkedin    | Linkedin login button                 | Boolean | `false`       |

#### Events

| Event         | Description                   |
|:--------------|:------------------------------|
| login-success | emits after successful login  |

### `<uam-profile>`

**Note:** App using `uam-profile` component should have vue route named `login`. After successful logout, page redirects to `login` route.

#### Properties

| Property    | Description                    | Type    | Default Value |
|:------------|:-------------------------------|:--------|:--------------|
| update-url  | endpoint uri to update profile | String  |               |

#### Events

| Event              | Description                                            |
|:-------------------|:-------------------------------------------------------|
| unauthorized-error | emits if response status is 401 while refreshing token |

### `<uam-user-menu>`

#### Properties

| Property       | Description                    | Type    | Default Value |
|:---------------|:-------------------------------|:--------|:--------------|
| button-content | Content to show on menu button | String  |               |
| no-divider     | Do not show divider            | Boolean | `false`       |
| no-profile     | Do not show profile menu item  | Boolean | `false`       |
| profile-route  | Vue route name for profile     | String  | `'profile'`  |
| right          | Right align dowpdown menu      | Boolean | `false`       |
