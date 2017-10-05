<template lang="html">
<b-container>
  <b-row>
    <b-col v-show="!isLoading">
      <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>

      <b-card no-body>
        <b-tabs ref="tabs" card>
          <b-tab title="Credentials" active>
            <b-form @submit.prevent="onSubmit('user')" data-vv-scope="user">
              <b-form-group id="username-input-group" :label="this.$i18n.t('username.label')" label-for="username">
                <b-form-input
                  id="username"
                  :state="errors.has('user.username') ? false : null"
                  type="text" v-model="user.username" required
                  :placeholder="this.$i18n.t('username.placeholder')"  name="username"
                  v-validate="'required|max:255'"
                ></b-form-input>

                <b-form-feedback id="username-feedback">
                  {{ errors.first('user.username') }}
                </b-form-feedback>
              </b-form-group>

              <b-form-group id="email-input-group" :label="this.$i18n.t('email.label')" label-for="email">
                <b-form-input
                  id="email"
                  :state="errors.has('user.email') ? false : null"
                  type="email" v-model="user.email" required
                  :placeholder="this.$i18n.t('email.placeholder')" name="email"
                  v-validate="'required|email'"
                ></b-form-input>

                <b-form-feedback id="email-feedback">
                  {{ errors.first('user.email') }}
                </b-form-feedback>
              </b-form-group>

              <b-form-group id="password-input-group" :label="this.$i18n.t('password.label')" label-for="password">
                <b-form-input
                  id="password"
                  :state="errors.has('user.password') ? false : null"
                  type="password" v-model="user.password"
                  :placeholder="this.$i18n.t('password.placeholder')"  name="password"
                  v-validate="'min:6|max:255'"
                ></b-form-input>

                <b-form-feedback id="password-feedback">
                  {{ errors.first('user.password') }}
                </b-form-feedback>
              </b-form-group>

              <b-form-group id="confirm-password-input-group" :label="this.$i18n.t('confirmPassword.label')" label-for="confirm-password">
                <b-form-input
                  id="confirm-password"
                  :state="errors.has('user.confirm_password') ? false : null"
                  type="password" v-model="confirmPassword"
                  :placeholder="this.$i18n.t('confirmPassword.placeholder')"  name="confirm_password"
                  v-validate="'confirmed:password'"
                ></b-form-input>

                <b-form-feedback id="confirm-password-feedback">
                  {{ errors.first('user.confirm_password') }}
                </b-form-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary">{{ $t('submit.label') }}</b-button>
             </b-form>
          </b-tab>

          <b-tab title="You">
            <b-form @submit.prevent="onProfileSubmit('profile')"  data-vv-scope="profile">
              <b-form-group id="gender-input-group" :label="this.$i18n.t('gender.label')" label-for="gender">
                <b-form-radio-group id="gender" v-model="profile.gender" :options="genderOptions" name="gender">
                </b-form-radio-group>
              </b-form-group>

              <b-form-group id="firstname-input-group" :label="this.$i18n.t('firstName.label')" label-for="firstname">
                <b-form-input
                  id="firstname"
                  :state="errors.has('profile.firstname') ? false : null"
                  type="text" v-model="profile.firstname" required
                  :placeholder="this.$i18n.t('firstName.placeholder')"  name="firstname"
                  v-validate="'required|max:255'"
                ></b-form-input>

                <b-form-feedback id="firstname-feedback">
                  {{ errors.first('profile.firstname') }}
                </b-form-feedback>
              </b-form-group>

              <b-form-group id="surname-input-group" :label="this.$i18n.t('surName.label')" label-for="surname">
                <b-form-input
                  id="surname"
                  :state="errors.has('profile.surname') ? false : null"
                  type="text" v-model="profile.surname" required
                  :placeholder="this.$i18n.t('surName.placeholder')"  name="surname"
                  v-validate="'required|max:255'"
                ></b-form-input>

                <b-form-feedback id="surname-feedback">
                  {{ errors.first('profile.surname') }}
                </b-form-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary">{{ $t('submit.label') }}</b-button>
            </b-form>
          </b-tab>
        </b-tabs>
      </b-card>

    </b-col>

    <i v-show="isLoading" class="fa fa-spinner fa-3x fa-spin loading" aria-hidden="true"></i>
  </b-row>
</b-container>
</template>

<script>
import axios from 'axios'
import mixinNotification from '../mixins/MixinNotification.vue'

export default {
  name: 'profile',
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
        { text: this.$i18n.t('gender.options.female'), value: '1' },
        { text: this.$i18n.t('gender.options.male'), value: '2' }
      ],
      profile: {
        gender: null,
        firstname: '',
        surname: ''
      },
      confirmPassword: '',
      userId: null,
      isLoading: false
    }
  },
  created () {
    const dict = {
      en: {
        custom: {
          confirm_password: {
            confirmed: 'The password confirmation does not match.'
          }
        }
      }
    }

    this.$validator.updateDictionary(dict)

    let currentUser = this.$user.getCurrentUser()
    let profile = this.$user.getProfile()

    this.user.username = currentUser.username
    this.user.email = currentUser.email
    this.userId = currentUser.id

    this.profile.gender = String(profile.gender)
    this.profile.firstname = profile.given_name
    this.profile.surname = profile.surname
  },
  methods: {
    onSubmit (scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.clearNotifications()
          this.isLoading = true

          axios.put(this.updateUrl + this.userId, { user: this.user })
            .then((response) => {
              this.$user.updateUser(response.data)
                .then(() => {
                  this.isLoading = false
                  this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                })
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                if (error.response.headers['www-authenticate'] === 'Bearer') {
                  this.$user.refreshToken()
                    .then(() => {
                      axios.put(this.updateUrl + this.userId, { user: this.user })
                        .then((response) => {
                          this.$user.updateUser(response.data)
                            .then(() => {
                              this.isLoading = false
                              this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                            })
                        })
                    })
                    .catch(() => {
                      this.isLoading = false
                      this.addNotification(this.$i18n.t('notifyLabel.cannotrefresh'))
                    })
                }
              } else {
                this.isLoading = false
                this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
              }
            })
        }
      })
    },
    onProfileSubmit (scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.clearNotifications()
          this.isLoading = true
          this.profile.given_name = this.profile.firstname

          axios.put(this.updateUrl + this.userId, { profile: this.profile })
            .then((response) => {
              this.$user.updateProfile(response.data.profile)
                .then(() => {
                  this.isLoading = false
                  this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                })
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                if (error.response.headers['www-authenticate'] === 'Bearer') {
                  this.$user.refreshToken()
                    .then(() => {
                      axios.put(this.updateUrl + this.userId, { profile: this.profile })
                        .then((response) => {
                          this.$user.updateProfile(response.data.profile)
                            .then(() => {
                              this.isLoading = false
                              this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                            })
                        })
                    })
                    .catch(() => {
                      this.isLoading = false
                      this.addNotification(this.$i18n.t('notifyLabel.cannotrefresh'))
                    })
                }
              } else {
                this.isLoading = false
                this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
              }
            })
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
