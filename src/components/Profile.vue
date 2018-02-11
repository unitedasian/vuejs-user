<template lang="html">
<div>
  <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>

  <i v-if="isRequestPending" class="fa fa-spinner fa-3x fa-spin loading" aria-hidden="true"></i>

  <b-card no-body v-else>
    <b-tabs ref="tabs" card>
      <b-tab :title="this.$i18n.t('tabLabel.credentials')" active>
        <form @submit.prevent="onSubmit('user')" :data-vv-scope="scope.credentials">
          <div class="form-group">
            <label for="uam_username">{{ $t('username.label') }}</label>
            <input
              :placeholder="this.$i18n.t('username.placeholder')"
              v-model="user.username" v-validate="'required|min:2|max:255'" required
              type="text"  class="form-control" id="uam_username" name="username"
            />

            <span v-show="errors.has('user.username')" class="invalid-feedback">{{ errors.first('user.username') }}</span>
          </div>

          <div class="form-group">
            <label for="email">{{ $t('email.label') }}</label>
            <input
              :placeholder="this.$i18n.t('email.placeholder')" name="email"
              v-model="user.email" v-validate="'required|email'" required
              type="email"  class="form-control" id="email"
            />

            <span v-show="errors.has('user.email')" class="invalid-feedback">{{ errors.first('user.email') }}</span>
          </div>

          <div class="form-group">
            <label for="uam_password">{{ $t('password.label') }}</label>
            <input
              :placeholder="this.$i18n.t('password.placeholder')"
              v-model="user.password" v-validate="'min:6|max:255|confirmed:confirm_password'"
              type="password"  class="form-control" id="uam_password" name="password"
            />

            <span v-show="errors.has('user.password')" class="invalid-feedback">{{ errors.first('user.password') }}</span>
          </div>

          <div class="form-group">
            <label for="confirm-password">{{ $t('confirmPassword.label') }}</label>
            <input
              :placeholder="this.$i18n.t('confirmPassword.placeholder')" v-model="confirmPassword"
              type="password"  class="form-control" id="confirm-password" name="confirm_password"
            />

            <span v-show="errors.has('user.confirm_password')" class="invalid-feedback">
              {{ errors.first('user.confirm_password') }}
            </span>
          </div>

          <button type="submit" class="btn btn-primary">{{ $t('submit.label') }}</button>
        </form>
      </b-tab>
      <b-tab :title="this.$i18n.t('tabLabel.you')">
        <form @submit.prevent="onSubmit('profile')" :data-vv-scope="scope.profile">
          <div class="form-group">
            <div class="form-check form-check-inline" v-for="option in genderOptions" :key="option.value">
              <input
                :id="'gender_' + option.value" :value="option.value"
                v-model="profile.gender" v-validate="'required|in:1,2'"
                class="form-check-input" type="radio" name="gender"
              />
              <label class="form-check-label" :for="'gender_' + option.value">{{ option.text }}</label>
            </div>

            <span v-show="errors.has('profile.gender')" class="invalid-feedback">
              {{ errors.first('profile.gender') }}
            </span>
          </div>

          <div class="form-group">
            <label for="given_name">{{ $t('givenName.label') }}</label>
            <input
              v-model="profile.givenName" name="given_name" v-validate="'required|min:2|max:255'"
              :placeholder="this.$i18n.t('givenName.placeholder')"
              type="text"  class="form-control" id="given_name" required
            />

            <span v-show="errors.has('profile.given_name')" class="invalid-feedback">
              {{ errors.first('profile.given_name') }}
            </span>
          </div>

          <div class="form-group">
            <label for="surname">{{ $t('surname.label') }}</label>
            <input
              v-model="profile.surname" name="surname" v-validate="'required|min:2|max:255'" required
              type="text"  class="form-control" id="surname" :placeholder="this.$i18n.t('surname.placeholder')"
            />

            <span v-show="errors.has('profile.surname')" class="invalid-feedback">
              {{ errors.first('profile.surname') }}
            </span>
          </div>

          <button type="submit" class="btn btn-primary">{{ $t('submit.label') }}</button>
        </form>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import mixinNotification from '../mixins/MixinNotification.vue'
import Profile from '../models/Profile'
import User from '../models/User'

export default {
  computed: {
    isRequestPending () {
      return this.$store.getters['user/isRequestPending']
    }
  },

  created () {
    const dictionary = {
      custom: {
        gender: {
          required: () => 'Select gender.'
        }
      }
    }

    this.$validator.localize('en', dictionary)
  },

  data () {
    return {
      confirmPassword: '',
      genderOptions: [
        { text: this.$i18n.t('gender.options.female'), value: 1 },
        { text: this.$i18n.t('gender.options.male'), value: 2 }
      ],
      profile: new Profile(this.$uamAuth.user.profile.state),
      scope: {
        credentials: 'user',
        profile: 'profile'
      },
      user: new User(this.$uamAuth.user.state)
    }
  },

  i18n: {
    messages: {
      'en': require('../i18n/profile.en.json')
    }
  },

  methods: {
    onSubmit (scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          if (scope === this.scope.credentials) {
            this.updateUser()
          }

          if (scope === this.scope.profile) {
            this.updateProfile()
          }
        }
      })
    },

    updateProfile () {
      this.clearNotifications()

      this.$axios.put(this.updateUrl + this.$uamAuth.user.id, { profile: this.profile.state })
        .then((response) => {
          this.$uamAuth.updateProfile(response.data.profile)
            .then(() => {
              this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
            })
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$uamAuth.refreshToken()
              .then(() => {
                this.$axios.put(this.updateUrl + this.$uamAuth.user.id, { profile: this.profile.state })
                  .then((response) => {
                    this.$uamAuth.updateProfile(response.data.profile)
                      .then(() => {
                        this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                      })
                  })
              })
              .catch((error) => {
                if (error.response.status === 401) {
                  this.$emit('unauthorized-error')
                } else {
                  this.addNotification(this.$i18n.t('notifyLabel.cannotrefresh'))
                }
              })
          } else if (error.response && error.response.status === 422) {
            this.addNotification(this.$i18n.t('notifyLabel.validationError'))
          } else {
            this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
          }
        })
    },

    updateUser () {
      this.clearNotifications()

      this.$axios.put(this.updateUrl + this.$uamAuth.user.id, { user: this.user.state })
        .then((response) => {
          this.$uamAuth.updateUser(response.data)
            .then(() => {
              this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
            })
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$uamAuth.refreshToken()
              .then(() => {
                this.$axios.put(this.updateUrl + this.$uamAuth.user.id, { user: this.user.state })
                  .then((response) => {
                    this.$uamAuth.updateUser(response.data)
                      .then(() => {
                        this.addNotification(this.$i18n.t('notifyLabel.updated'), 'success')
                      })
                  })
              })
              .catch((error) => {
                if (error.response.status === 401) {
                  this.$emit('unauthorized-error')
                } else {
                  this.addNotification(this.$i18n.t('notifyLabel.cannotrefresh'))
                }
              })
          } else if (error.response && error.response.status === 422) {
            this.addNotification(this.$i18n.t('notifyLabel.uniqueEmail'))
          } else {
            this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
          }
        })
    }
  },

  mixins: [mixinNotification],

  name: 'uam_profile',

  props: ['update-url']
}
</script>

<style scoped>
    .invalid-feedback {
        display: block;
    }
</style>
