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
        <div class="alert alert-danger" v-if="error">
          {{ this.$i18n.t('user.login.error.' + this.error) }}
        </div>

        <form @submit.prevent="onSubmit" class="login-form">
          <div class="form-group">
            <label for="username">{{ $t('user.login.username.label') }}</label>
            <input
              :placeholder="this.$i18n.t('user.login.username.placeholder')"
              class="form-control"
              id="username"
              name="username"
              required
              type="text"
              v-model="credentials.username"
            />
          </div>
          <div class="form-group">
            <label for="password">{{ $t('user.login.password.label') }}</label>
            <input
              :placeholder="this.$i18n.t('user.login.password.placeholder')"
              class="form-control"
              id="password"
              name="password"
              required
              type="password"
              v-model="credentials.password"
            />
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
import route from '../mixins/route'

export default {
  components: {
    Loading
  },

  computed: {
    isRequestPending () {
      return this.$store.getters['user/isRequestPending']
    },

    isSocialAuthPending () {
      return this.$store.getters['user/isSocialAuthPending']
    }
  },

  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },

      error: false
    }
  },

  methods: {
    authenticate (provider) {
      this.$emit('login:start')

      this.$auth.authenticate(provider)
        .then(
          authResponse => {
            this.$uamAuth.loginWithToken(authResponse.data)
              .then(() => {
                this.$emit('login:success', { social: true })
              })
              .catch(error => {
                this.$emit('login:error', { error: error })

                this.error = 'other'
              })
          },
          error => {
            if (error.message === 'Network Error') {
              this.$emit('login:error', { error: error })

              this.error = 'connection'
            }
          }
        )
    },

    onSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = false

          this.$emit('login:start')

          this.$uamAuth.login(this.credentials)
            .then(() => {
              this.$emit('login:success', { social: false })

              if (this.redirect) {
                this.$router.push(this.getRoute(
                  this.$route.query.redirect ||
                  this.redirect
                ))
              }
            })
            .catch(error => {
              console.log(error.response)

              this.credentials.password = ''

              if (error.response &&
                (error.response.status === 401 ||
                  error.response.status === 403)) {
                this.$emit('login:error', { error: error })

                this.error = 'authentication'
              } else {
                this.$emit('login:error', { error: error })

                this.error = 'connection'
              }
            })
        }
      })
    }
  },

  mixins: [ route ],

  mounted () {
    if (this.$uamAuth.isLoggedIn() && this.redirect) {
      this.$router.push(this.redirect)
    }
  },

  name: 'UAMUserLogin',

  props: {
    redirect: {
      type: [Object, String],
      default: 'home'
    },

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
