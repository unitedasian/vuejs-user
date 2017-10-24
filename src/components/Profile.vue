<template lang="html">
<div>
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog"
    aria-labelledby="loginModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title" id="loginModalLabel">Looks like you have been logged out. Please login again:</h6>
        </div>
        <div class="modal-body">
          <Login isInModal></Login>
        </div>
      </div>
    </div>
   </div>

  <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>

  <i v-if="isRequestPending" class="fa fa-spinner fa-3x fa-spin loading" aria-hidden="true"></i>

  <div class="card" v-else>
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active" id="credentials-tab" data-toggle="tab" href="#credentials" role="tab" aria-controls="credentials" aria-expanded="true">Credentials</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="you-tab" data-toggle="tab" href="#you" role="tab" aria-controls="you" aria-expanded="false">You</a>
        </li>
      </ul>
    </div>

    <div class="tab-content card-body">
      <div class="tab-pane fade show active" id="credentials" role="tabpanel" aria-labelledby="credentials-tab">
        <form @submit.prevent="onSubmit('user')" data-vv-scope="user">
          <div class="form-group">
            <label for="username">{{ $t('username.label') }}</label>
            <input type="text"  class="form-control" id="username" :placeholder="this.$i18n.t('username.placeholder')" v-model="user.username" name="username" v-validate="'required|min:2|max:255'" required/>

            <span v-show="errors.has('user.username')" class="invalid-feedback">{{ errors.first('user.username') }}</span>
          </div>

          <div class="form-group">
            <label for="email">{{ $t('email.label') }}</label>
            <input type="email"  class="form-control" id="email" :placeholder="this.$i18n.t('email.placeholder')" v-model="user.email" name="email" v-validate="'required|email'" required/>

            <span v-show="errors.has('user.email')" class="invalid-feedback">{{ errors.first('user.email') }}</span>
          </div>

          <div class="form-group">
            <label for="password">{{ $t('password.label') }}</label>
            <input type="password"  class="form-control" id="password" :placeholder="this.$i18n.t('password.placeholder')" v-model="user.password" name="password" v-validate="'min:6|max:255'" />

            <span v-show="errors.has('user.password')" class="invalid-feedback">{{ errors.first('user.password') }}</span>
          </div>

          <div class="form-group">
            <label for="confirm-password">{{ $t('confirmPassword.label') }}</label>
            <input type="password"  class="form-control" id="confirm-password" :placeholder="this.$i18n.t('confirmPassword.placeholder')" v-model="confirmPassword" name="confirm_password" v-validate="'confirmed:password'" />

            <span v-show="errors.has('user.confirm_password')" class="invalid-feedback">{{ errors.first('user.confirm_password') }}</span>
          </div>

          <button type="submit" class="btn btn-primary">{{ $t('submit.label') }}</button>
        </form>
      </div>

      <div class="tab-pane fade" id="you" role="tabpanel" aria-labelledby="you-tab">
        <form @submit.prevent="onSubmit('profile')" data-vv-scope="profile">
          <div class="form-group">
            <div><label>{{ $t('gender.label') }}</label></div>
            <label class="custom-control custom-radio" v-for="option in genderOptions" :key="option.value">
              <input name="gender" type="radio" class="custom-control-input" :value="option.value" v-model="profile.gender"  v-validate="'required|in:1,2'">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">{{ option.text }}</span>
            </label>

            <span v-show="errors.has('profile.gender')" class="invalid-feedback">{{ errors.first('profile.gender') }}</span>
          </div>

          <div class="form-group">
            <label for="firstname">{{ $t('firstName.label') }}</label>
            <input type="text"  class="form-control" id="firstname" :placeholder="this.$i18n.t('firstName.placeholder')" v-model="profile.firstname" name="firstname" v-validate="'required|min:2|max:255'" required/>

            <span v-show="errors.has('profile.firstname')" class="invalid-feedback">{{ errors.first('profile.firstname') }}</span>
          </div>

          <div class="form-group">
            <label for="surname">{{ $t('surName.label') }}</label>
            <input type="text"  class="form-control" id="surname" :placeholder="this.$i18n.t('surName.placeholder')" v-model="profile.surname" name="surname" v-validate="'required|min:2|max:255'" required/>

            <span v-show="errors.has('profile.surname')" class="invalid-feedback">{{ errors.first('profile.surname') }}</span>
          </div>

          <button type="submit" class="btn btn-primary">{{ $t('submit.label') }}</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import mixinNotification from '../mixins/MixinNotification.vue'
import Login from './Login.vue'

export default {
  name: 'uam_profile',
  components: {
    Login
  },
  mixins: [mixinNotification],
  props: ['get-url', 'update-url'],
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      genderOptions: [
        { text: this.$i18n.t('gender.options.female'), value: 1 },
        { text: this.$i18n.t('gender.options.male'), value: 2 }
      ],
      profile: {
        gender: null,
        firstname: '',
        surname: ''
      },
      confirmPassword: ''
    }
  },
  computed: {
    isRequestPending () {
      return this.$store.getters['user/isRequestPending']
    }
  },
  created () {
    const dict = {
      en: {
        custom: {
          confirm_password: {
            confirmed: 'The password confirmation does not match.'
          },
          gender: {
            in: 'Select gender.'
          }
        }
      }
    }

    this.$validator.updateDictionary(dict)

    let currentUser = this.$user.getCurrentUser()
    let profile = this.$user.getProfile()

    this.user.username = currentUser.username
    this.user.email = currentUser.email

    this.profile.gender = String(profile.gender)
    this.profile.firstname = profile.given_name
    this.profile.surname = profile.surname
  },
  methods: {
    updateUser () {
      this.clearNotifications()

      axios.put(this.updateUrl + this.$user.getCurrentUser().id, { user: this.user })
        .then((response) => {
          this.$user.updateUser(response.data)
            .then(() => {
              this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
            })
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            if (error.response.headers['www-authenticate'] === 'Bearer') {
              this.$user.refreshToken()
                .then(() => {
                  axios.put(this.updateUrl + this.$user.getCurrentUser().id, { user: this.user })
                    .then((response) => {
                      this.$user.updateUser(response.data)
                        .then(() => {
                          this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                        })
                    })
                })
                .catch((error) => {
                  if (error.response.status === 401) {
                    window.$('#loginModal').modal('show')

                    let this_ = this

                    window.$('#loginModal').off().on('hidden.bs.modal', function (e) {
                      this_.updateUser()
                    })
                  } else {
                    this.addNotification(this.$i18n.t('notifyLabel.cannotrefresh'))
                  }
                })
            }
          } else {
            this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
          }
        })
    },
    updateProfile () {
      this.clearNotifications()

      this.profile.given_name = this.profile.firstname

      axios.put(this.updateUrl + this.$user.getCurrentUser().id, { profile: this.profile })
        .then((response) => {
          this.$user.updateProfile(response.data.profile)
            .then(() => {
              this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
            })
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            if (error.response.headers['www-authenticate'] === 'Bearer') {
              this.$user.refreshToken()
                .then(() => {
                  axios.put(this.updateUrl + this.$user.getCurrentUser().id, { profile: this.profile })
                    .then((response) => {
                      this.$user.updateProfile(response.data.profile)
                        .then(() => {
                          this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                        })
                    })
                })
                .catch((error) => {
                  if (error.response.status === 401) {
                    window.$('#loginModal').modal('show')

                    let this_ = this

                    window.$('#loginModal').off().on('hidden.bs.modal', function (e) {
                      this_.updateProfile()
                    })
                  } else {
                    this.addNotification(this.$i18n.t('notifyLabel.cannotrefresh'))
                  }
                })
            }
          } else {
            this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
          }
        })
    },
    onSubmit (scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          if (scope === 'user') {
            this.updateUser()
          }

          if (scope === 'profile') {
            this.updateProfile()
          }
        }
      })
    }
  },
  i18n: {
    messages: {
      'en': require('../translations/profile.en.json')
    }
  }
}
</script>

<style scoped>
    .invalid-feedback {
        display: block;
    }
</style>
