# Upgrade notes:

## 0.3.1 to 0.4.0  

- With `0.4.0` version, `token` property is registered with Vue instance instead of `user` with same method signatures as previous version except for `getCurrentUser()`.
  
  Instead of `getCurrentUser()` you can directly use getter method such as `Vue.token.user` or `this.$token.user`   Replace `Vue.user` with `Vue.token` and `$user` with `$token`.

- `User` and `Profile` models comes with plugin. Models can be imported as follows:

  ```javascript

  import {Profile, User} from 'uam-vuejs-user'

  let user = new User(this.$token.user.state)

  ```
