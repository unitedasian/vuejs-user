# Vuejs user

## Installation

### via npm.js

```
npm install --save-dev uam-vuejs-user
```

```
yarn add uam-vuejs-user
```

## Usage

```
# main.js

...
import User from 'uam-vuejs-user'

...

Vue.use(User, { store: store, router: router })
```

## Options

|Option | Description | Default |
|:------|:------------|:--------|
|store  | The Vuex store to use | `store` |
|router  | the router to use | `router` |
|api_base_url | The base url of the auth api. Should not include a final /. | none|
|login_route | The route for the API login endpoint | `/login` |
