# Vuejs user

## Installation

### via npm

```bash
npm install --save-dev uam-vuejs-user
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

import User from 'uam-vuejs-user'

Vue.use(User, { store: store, router: router, loginUrl: '/login' })
```

## Options

| Option                 | Description                    | Type      | Default Value |
|:-----------------------|:-------------------------------|:----------|:--------------|
| store                  | The Vuex store to use          | Object    |               |
| router                 | The registered router instance | Object    |               |
| loginUrl               | The API login url              | String    | `'/login'`    |
| vueAuthenticateOptions | Social login provider options  | Object    |               |

## Social login

For social login, install and setup [vue-authenticate](https://github.com/dgrubelic/vue-authenticate#installation) in your app as follows:

```js
# main.js

let vueAuthOptions = {
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

Vue.use(User, { store: store, router: router, loginUrl: '/login', vueAuthenticateOptions: vueAuthOptions })

```

Configure client ID of each platform that you want to enable on `config/{environment}.env.js` of your app.

Then you can render login component with various social login links by passing respective prop as follows:

```vue
<uam-login facebook github google linkedin></uam-login>
```

## For login form on modal dialog

When refreshing token, if error occurs with 401 Unauthorized status, you can use `uam-login` component to login again.

Make sure your modal element(such as `<div class="modal">`) has `id` attribute set to `loginModal`.
Inside modal body, use `uam-login` with prop `isInModal` set.

```html
<uam-login is-in-modal></uam-login>
```

## Component Reference

### `<uam-login>`

#### Properties

| Property    | Description                 | Type    | Default Value |
|:------------|:----------------------------|:--------|:--------------|
| redirect-to | URL to redirect after login | String  |               |
| is-in-modal | When used in modal body     | Boolean | `false`       |
| facebook    | Facebook login button       | Boolean | `false`       |
| github      | Github login button         | Boolean | `false`       |
| google      | Google login button         | Boolean | `false`       |
| linkedin    | Linkedin login button       | Boolean | `false`       |
