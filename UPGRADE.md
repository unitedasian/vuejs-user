# Upgrade notes:

## 0.3.1 to 0.4.0

- With `0.4.0` version, `uamAuth` property is registered with Vue instance instead of `user` with same method signatures as previous version except for `getCurrentUser()`.

  Instead of `getCurrentUser()` you can directly use getter method such as `Vue.uamAuth.user` or `this.$uamAuth.user`. Therefore, replace `Vue.user` with `Vue.uamAuth` and `$user` with `$uamAuth`.

- `UAMUser` and `UAMProfile` models comes with plugin. Models can be imported as follows:

  ```javascript
  // In profile form
  import {UAMProfile, UAMUser} from 'uam-vuejs-user'

  let user = new UAMUser(this.$uamAuth.user.state)
  ```

- You can extend both `UAMUser` and `UAMProfile` model in your app, then pass model instance to user plugin as shown [here](https://gitlab.united-asian.com/vuejs/user/blob/develop/README.md#usage).

  ```javascript
  # ./models/User.js

  import {UAMUser} from 'uam-vuejs-user'
  import Profile from './Profile'

  class User extends UAMUser {
  }
  ```

- Redirect route option when using plugin takes name of the route instead of path.

  ```javascript
  Vue.use(User, { store, router, redirectRoute: 'login' })
  ```
