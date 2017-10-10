<template lang="html">
  <div>
    <i v-show="isLoading" class="fa fa-spinner fa-3x fa-spin loading" aria-hidden="true"></i>

    <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>

    <form @submit.prevent="onSubmit" class="login-form" v-show="!isLoading">
      <div class="form-group">
        <label for="username">{{ $t('username.label') }}</label>
        <input type="email"  class="form-control" id="username" :placeholder="this.$i18n.t('username.label')" v-model="credentials.email" name="email" v-validate="'required|email'" required/>

        <span v-show="errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</span>
      </div>

      <div class="form-group">
        <label for="password">{{ $t('password.label') }}</label>
        <input type="password"  class="form-control" id="password" :placeholder="this.$i18n.t('password.label')" v-model="credentials.password" name="password" v-validate="'required|min:6|max:255'" required/>

        <span v-show="errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</span>
      </div>
      <button type="submit" class="btn btn-primary">{{ $t('submit.label') }}</button>
    </form>
  </div>
</template>

<script>
import mixinNotification from '../mixins/MixinNotification.vue'

export default {
  name: 'login',
  mixins: [mixinNotification],
  props: ['redirectTo'],
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.clearNotifications()
          this.isLoading = true

          this.$user.login(this.credentials)
            .then(() => {
              if (this.redirectTo !== undefined) {
                this.$router.push(this.redirectTo)
              } else {
                this.$router.push('/')
              }

              this.isLoading = false
            })
            .catch((error) => {
              this.isLoading = false
              if (error.response && error.response.status === 401) {
                this.credentials.password = ''
                this.addNotification(this.$i18n.t('notifyLabel.unauthorized'))
              } else {
                this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
              }
            })
        }
      })
    }
  },
  i18n: {
    messages: {
      'en': require('../translations/login.en.json')
    }
  }
}
</script>

<style scoped>
.invalid-feedback {
    display: block;
}
</style>
