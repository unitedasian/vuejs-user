<template>
  <div class="login">
    <main>
      <h1>
        {{ title ? title : $t('user.login.title') }}
      </h1>

      <slot
        name="loading"
        v-if="isRequestPending || isSocialAuthPending">
        <Loading />
      </slot>

      <div v-else>
        <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>

        <form @submit.prevent="onSubmit" class="login-form">
          <div class="form-group">
            <label for="username">{{ $t('user.login.username.label') }}</label>
            <input
              :placeholder="this.$i18n.t('user.login.username.placeholder')"
              class="form-control"
              id="username"
              name="username"
              type="text"
              v-model="credentials.username"
              required />
          </div>
          <div class="form-group">
            <label for="password">{{ $t('user.login.password.label') }}</label>
            <input
              :placeholder="this.$i18n.t('user.login.password.placeholder')"
              class="form-control"
              id="password"
              name="password"
              type="password"
              v-model="credentials.password"
              required />
          </div>
          <button class="btn btn-primary" type="submit">
            {{ $t('user.login.submit') }}
          </button>
        </form>

        <div
          class="with"
          v-if="facebook || github || google || linkedin">

          <p>{{ $t('login.with') }}</p>

          <a
            @click="authenticate('facebook')"
            class="fa fa facebook"
            v-if="facebook" />
          <a
            @click="authenticate('google')"
            class="fa fa google"
            v-if="google" />
          <a
            @click="authenticate('linkedin')"
            class="fa fa linkedin"
            v-if="linkedin" />
          <a
            @click="authenticate('github')"
            class="fa fa github"
            v-if="github" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import mixinNotification from '../mixins/MixinNotification.vue'

export default {
  computed: {
    isSocialAuthPending () {
      return this.$store.getters['user/isSocialAuthPending']
    },

    isRequestPending () {
      return this.$store.getters['user/isRequestPending']
    }
  },

  components: {
    Loading
  },

  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    authenticate (provider) {
      this.clearNotifications()

      this.$auth.authenticate(provider)
        .then((authResponse) => {
          this.$uamAuth.loginWithToken(authResponse.data)
            .then(() => {
              this.$router.push({ name: 'home' })
            })
            .catch(() => {
              this.addNotification(this.$i18n.t('user.login.notifyLabel.unknownError'))
            })
        }, (error) => {
          if (error.message === 'Network Error') {
            this.addNotification(this.$i18n.t('user.login.notifyLabel.cannotconnect'))
          }
        })
    },

    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.clearNotifications()

          this.$uamAuth.login(this.credentials)
            .then(() => {
              this.$emit('login-success')

              if (!this.noRedirect) {
                if (this.redirectTo !== undefined) {
                  this.$router.push({ name: this.redirectTo })
                } else {
                  this.$router.push({ name: 'home' })
                }
              }
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                this.credentials.password = ''
                this.addNotification(this.$i18n.t('user.login.notifyLabel.unauthorized'))
              } else {
                this.addNotification(this.$i18n.t('user.login.notifyLabel.cannotconnect'))
              }
            })
        }
      })
    }
  },

  mixins: [mixinNotification],

  name: 'uam-user-login',

  props: {
    noRedirect: { // if enabled, no redirect after successful login
      type: Boolean,
      default: false
    },

    redirectTo: String,

    title: String,

    facebook: { // facebook login
      type: Boolean,
      default: false
    },

    github: { // github login
      type: Boolean,
      default: false
    },

    google: { // google login
      type: Boolean,
      default: false
    },

    linkedin: { // linkedin login
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .invalid-feedback {
    display: block;
  }
}
</style>
