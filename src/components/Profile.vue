<template lang="html">
<div>
  <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>

  <i v-if="isRequestPending" class="fa fa-spinner fa-3x fa-spin loading" aria-hidden="true"></i>

  <b-card no-body v-else>
    <b-tabs ref="tabs" card>
      <b-tab :title="this.$i18n.t('tabLabel.credentials')" active>
        <form @submit.prevent="onSubmit('user')" :data-vv-scope="scope.credentials">
          <div class="form-group">
            <label for="username">{{ $t('username.label') }}</label>
            <input type="text"  class="form-control" id="username" name="username"
                   :placeholder="this.$i18n.t('username.placeholder')"
                   v-model="user.username" v-validate="'required|min:2|max:255'" required
            />

            <span v-show="errors.has('user.username')" class="invalid-feedback">{{ errors.first('user.username') }}</span>
          </div>

          <div class="form-group">
            <label for="email">{{ $t('email.label') }}</label>
            <input type="email"  class="form-control" id="email"
                   :placeholder="this.$i18n.t('email.placeholder')" name="email"
                   v-model="user.email" v-validate="'required|email'" required
            />

            <span v-show="errors.has('user.email')" class="invalid-feedback">{{ errors.first('user.email') }}</span>
          </div>

          <div class="form-group">
            <label for="password">{{ $t('password.label') }}</label>
            <input type="password"  class="form-control" id="password" name="password"
                   :placeholder="this.$i18n.t('password.placeholder')"
                   v-model="user.password" v-validate="'min:6|max:255|confirmed:confirm_password'"
            />

            <span v-show="errors.has('user.password')" class="invalid-feedback">{{ errors.first('user.password') }}</span>
          </div>

          <div class="form-group">
            <label for="confirm-password">{{ $t('confirmPassword.label') }}</label>
            <input type="password"  class="form-control" id="confirm-password" name="confirm_password"
                   :placeholder="this.$i18n.t('confirmPassword.placeholder')" v-model="confirmPassword"
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
              <input class="form-check-input" type="radio" name="gender"
                     :id="'gender_' + option.value" :value="option.value"
                     v-model="profile.gender" v-validate="'required|in:1,2'"
              />
              <label class="form-check-label" :for="'gender_' + option.value">{{ option.text }}</label>
            </div>

            <span v-show="errors.has('profile.gender')" class="invalid-feedback">
              {{ errors.first('profile.gender') }}
            </span>
          </div>

          <div class="form-group">
            <label for="firstname">{{ $t('firstName.label') }}</label>
            <input type="text"  class="form-control" id="firstname" :placeholder="this.$i18n.t('firstName.placeholder')"
                   v-model="firstname" name="firstname" v-validate="'required|min:2|max:255'" required
            />

            <span v-show="errors.has('profile.firstname')" class="invalid-feedback">
              {{ errors.first('profile.firstname') }}
            </span>
          </div>

          <div class="form-group">
            <label for="surname">{{ $t('surName.label') }}</label>
            <input type="text"  class="form-control" id="surname" :placeholder="this.$i18n.t('surName.placeholder')"
                   v-model="profile.surname" name="surname" v-validate="'required|min:2|max:255'" required
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

export default {
  name: 'uam_profile',
  mixins: [mixinNotification],
  props: ['update-url'],
  created () {
    const dictionary = {
      custom: {
        gender: {
          required: () => 'Select gender.'
        }
      }
    }

    this.$validator.localize('en', dictionary);
  },
  data () {
    return {
      scope: {
        credentials: 'user',
        profile: 'profile'
      },
      user: {
        username: this.$user.username,
        email: this.$user.email,
        password: ''
      },
      genderOptions: [
        { text: this.$i18n.t('gender.options.female'), value: 1 },
        { text: this.$i18n.t('gender.options.male'), value: 2 }
      ],
      profile: {
        gender: this.$user.profile_gender,
        given_name: this.$user.profile_firstname,
        surname: this.$user.profile_surname
      },
      confirmPassword: ''
    }
  },
  computed: {
    isRequestPending () {
      return this.$store.getters['user/isRequestPending']
    },
    firstname: {
      get () {
        return this.profile.given_name
      },
      set (newValue) {
        this.profile.given_name = newValue
      }
    }
  },
  methods: {
    updateUser () {
      this.clearNotifications()

      this.$axios.put(this.updateUrl + this.$user.id, { user: this.user })
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
                  this.$axios.put(this.updateUrl + this.$user.id, { user: this.user })
                    .then((response) => {
                      this.$user.updateUser(response.data)
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
            }
          } else if (error.response && error.response.status === 422) {
            this.addNotification(this.$i18n.t('notifyLabel.uniqueEmail'))
          } else {
            this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
          }
        })
    },
    updateProfile () {
      this.clearNotifications()

      this.$axios.put(this.updateUrl + this.$user.id, { profile: this.profile })
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
                  this.$axios.put(this.updateUrl + this.$user.id, { profile: this.profile })
                    .then((response) => {
                      this.$user.updateProfile(response.data.profile)
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
            }
          } else if (error.response && error.response.status === 422) {
            this.addNotification(this.$i18n.t('notifyLabel.validationError'))
          } else {
            this.addNotification(this.$i18n.t('notifyLabel.cannotconnect'))
          }
        })
    },
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
