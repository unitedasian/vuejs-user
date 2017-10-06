<template lang="html">
<b-container>
  <b-row class="justify-content-center">
    <i v-show="isLoading" class="fa fa-spinner fa-3x fa-spin loading" aria-hidden="true"></i>

    <b-col cols="10" sm="10" md="8" lg="6" xl="4" class="login" v-show="!isLoading">
      <div class="card">
        <div class="card-header">
          <h1 class="text-center">{{ $t('title') }}</h1>
        </div>
        <div class="card-block login-body">
          <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>
          <b-form @submit.prevent="onSubmit" class="login-form">
            <b-form-group :label="this.$i18n.t('username.label')" label-for="username">
              <b-form-input v-model="credentials.email" type="email" required :placeholder="this.$i18n.t('username.label')" id="username"></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('password.label')" label-for="password">
              <b-form-input v-model="credentials.password" type="password" required :placeholder="this.$i18n.t('password.label')" id="password"></b-form-input>
            </b-form-group>
              <b-button type="submit" variant="primary">{{ $t('submit.label') }}</b-button>
          </b-form>
        </div>
      </div>
    </b-col>
  </b-row>
</b-container>
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
  },
  i18n: {
    messages: {
      'en': require('../translations/login.en.json')
    }
  }
}
</script>

<style scoped>
  .login {
    padding-top: 5em;
  }

  .login-body {
    padding: 1em;
  }
  .loading {
    margin-top: 3em;
  }
</style>
