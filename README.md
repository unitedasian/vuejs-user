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
|login_url | The API login url. | none|
