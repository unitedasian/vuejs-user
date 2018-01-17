<template lang="html">
<div>
  <i v-if="isRequestPending || isSocialAuthPending" class="fa fa-spinner fa-3x fa-spin loading" aria-hidden="true"></i>

  <div v-else>
    <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>

    <form @submit.prevent="onSubmit" class="login-form">
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

    <div v-if="facebook || github || google || linkedin" class="social-login">
      <p>{{ $t('loginWith') }}</p>

      <a v-if="facebook" @click="authenticate('facebook')" class="fa fa-facebook"></a>
      <a v-if="google" @click="authenticate('google')" class="fa fa-google"></a>
      <a v-if="linkedin" @click="authenticate('linkedin')" class="fa fa-linkedin"></a>
      <a v-if="github" @click="authenticate('github')" class="fa fa-github"></a>
    </div>
  </div>
</div>
</template>

<script>
import mixinNotification from '../mixins/MixinNotification.vue'

export default {
  name: 'uam_login',
  mixins: [mixinNotification],
  props: {
    redirectTo: String,
    noRedirect: { // if enabled, no redirect after successful login
      type: Boolean,
      default: false
    },
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
    },
  },

  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isSocialAuthPending () {
      return this.$store.getters['user/isSocialAuthPending']
    },
    isRequestPending () {
      return this.$store.getters['user/isRequestPending']
    }
  },
  methods: {
    authenticate (provider) {
      this.clearNotifications()

      this.$auth.authenticate(provider)
        .then((authResponse) => {
          this.$token.loginWithToken(authResponse.data)
            .then(() => {
              this.$router.push({ name: 'home_page' })
            })
            .catch(() => {
              this.addNotification(this.$i18n.t('notifyLabel.unknownError'))
            })
        }, (error) => {
          if (error.message === 'Network Error') {
            this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
          }
        })
    },
    onSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.clearNotifications()

          this.$token.login(this.credentials)
            .then(() => {
              this.$emit('login-success')

              if (!this.noRedirect) {
                if (this.redirectTo !== undefined) {
                  this.$router.push(this.redirectTo)
                } else {
                  this.$router.push({ name: 'home_page' })
                }
              }
            })
            .catch((error) => {
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

.social-login {
    margin-top: 30px;
}

/* Style all font awesome icons */
a.fa {
    cursor: pointer;
    padding: 10px;
    font-size: 30px;
    width: 50px;
    text-align: center;
    text-decoration: none;
    margin: 5px;
}

a.fa:hover {
    opacity: 0.8;
    color: white;
}

/* Set a specific color for each social platform */
a.fa-facebook {
    background: #3B5998;
    color: white;
}

a.fa-google {
    background: #dd4b39;
    color: white;
}

a.fa-linkedin {
    background: #007bb5;
    color: white;
}

a.fa-github {
    background: #222;
    color: white;
}
</style>
