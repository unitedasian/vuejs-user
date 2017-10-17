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

    <div v-if="facebook || github || google || linkedin" class="social-login">
      <p>Login with:</p>

      <a v-if="facebook" @click="authenticate('facebook')" class="fa fa-facebook"></a>
      <a v-if="google" @click="authenticate('google')" class="fa fa-google"></a>
      <a v-if="linkedin" @click="authenticate('linkedin')" class="fa fa-linkedin"></a>
      <a v-if="github" @click="authenticate('github')" class="fa fa-github"></a>
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
      },
      isLoading: false
    }
  },
  methods: {
    authenticate: function (provider) {
      let this_ = this
      this.$auth.authenticate(provider)
        .then((authResponse) => {
          this_.$user.loginWithToken(authResponse.data.access_token)
            .then(() => {
              this_.$router.push('/')
            })
            .catch((error) => {
              console.log(error)
            })
        }, (error) => {
          console.log('Cancelled.', error.message)
        })
    },
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

/* Set a specific color for each brand */
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
