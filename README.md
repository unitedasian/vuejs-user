# Vuejs user

## Installation

### via npm

```
npm install --save-dev uam-vuejs-user
```

### via yarn

```
yarn add uam-vuejs-user
```

## Usage
Provided components are built on Bootstrap 4 so install bootstrap 4 as stated [here](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

```
# main.js

import User from 'uam-vuejs-user'

Vue.use(User, { store: store, router: router })
```

## Options

|Option | Description | Default |
|:------|:------------|:--------|
|store  | The Vuex store to use | none |
|router  | The registered router instance | none |
|loginUrl | The API login url. | '/login' |
