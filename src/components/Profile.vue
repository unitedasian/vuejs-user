<template lang="html">
  <div class="profile">
    <slot
      name="loading"
      v-if="isRequestPending">
      <Loading />
    </slot>

    <template v-else>
      <b-tabs ref="tabs" card>
        <b-tab :title="this.$i18n.t('user.profile.tabLabel.credentials')" active>
          <form @submit.prevent="onSubmit('user')" :data-vv-scope="scope.credentials">
            <div class="form-group">
              <label for="uam_username">{{ $t('user.profile.username.label') }}</label>
              <input
                :placeholder="this.$i18n.t('user.profile.username.placeholder')"
                v-model="user.username" v-validate="'required|min:2|max:255'" required
                type="text"  class="form-control" id="uam_username" name="username"
              />

              <span v-show="errors.has('user.username')" class="invalid-feedback">{{ errors.first('user.username') }}</span>
            </div>

            <div class="form-group">
              <label for="email">{{ $t('user.profile.email.label') }}</label>
              <input
                :placeholder="this.$i18n.t('user.profile.email.placeholder')" name="email"
                v-model="user.email" v-validate="'required|email'" required
                type="email"  class="form-control" id="email"
              />

              <span v-show="errors.has('user.email')" class="invalid-feedback">{{ errors.first('user.email') }}</span>
            </div>

            <div class="form-group">
              <label for="uam_password">{{ $t('user.profile.password.label') }}</label>
              <input
                :placeholder="this.$i18n.t('user.profile.password.placeholder')"
                v-model="user.password" v-validate="'min:6|max:255|confirmed:confirm_password'"
                type="password"  class="form-control" id="uam_password" name="password"
              />

              <span v-show="errors.has('user.password')" class="invalid-feedback">{{ errors.first('user.password') }}</span>
            </div>

            <div class="form-group">
              <label for="confirm-password">{{ $t('user.profile.confirmPassword.label') }}</label>
              <input
                :placeholder="this.$i18n.t('user.profile.confirmPassword.placeholder')" v-model="confirmPassword"
                type="password"  class="form-control" id="confirm-password" name="confirm_password"
              />

              <span v-show="errors.has('user.confirm_password')" class="invalid-feedback">
                {{ errors.first('user.confirm_password') }}
              </span>
            </div>

            <button type="submit" class="btn btn-primary">{{ $t('user.profile.submit.label') }}</button>
          </form>
        </b-tab>
        <b-tab :title="this.$i18n.t('user.profile.tabLabel.you')">
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
              <label for="given_name">{{ $t('user.profile.givenName.label') }}</label>
              <input
                v-model="profile.givenName" name="given_name" v-validate="'required|min:2|max:255'"
                :placeholder="this.$i18n.t('user.profile.givenName.placeholder')"
                type="text"  class="form-control" id="given_name" required
              />

              <span v-show="errors.has('profile.given_name')" class="invalid-feedback">
                {{ errors.first('profile.given_name') }}
              </span>
            </div>

            <div class="form-group">
              <label for="surname">{{ $t('user.profile.surname.label') }}</label>
              <input
                v-model="profile.surname" name="surname" v-validate="'required|min:2|max:255'" required
                type="text"  class="form-control" id="surname" :placeholder="this.$i18n.t('user.profile.surname.placeholder')"
              />

              <span v-show="errors.has('profile.surname')" class="invalid-feedback">
                {{ errors.first('profile.surname') }}
              </span>
            </div>

            <button type="submit" class="btn btn-primary">{{ $t('user.profile.submit.label') }}</button>
          </form>
        </b-tab>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import Profile from '../models/Profile'
import User from '../models/User'

export default {
  components: {
    Loading
  },

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
        { text: this.$i18n.t('user.profile.gender.options.female'), value: 1 },
        { text: this.$i18n.t('user.profile.gender.options.male'), value: 2 }
      ],
      profile: new Profile(this.$uamAuth.user.profile.state),
      scope: {
        credentials: 'user',
        profile: 'profile'
      },
      user: new User(this.$uamAuth.user.state)
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
      this.$emit('before-update')

      this.$uamAuth.updateProfile(
        {
          profile: this.profile.state
        },
        this.updateUrl
      )
        .then(() => {
          this.$emit(
            'update-success',
            {
              message: this.$i18n.t('user.profile.notifyLabel.updated')
            }
          )
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 401 ||
              error.response.status === 403) {
              this.$emit('unauthorized-error')
            } else if (error.response.status === 422) {
              this.$emit(
                'update-error',
                {
                  message: this.$i18n.t('user.profile.notifyLabel.validationError')
                }
              )
            } else {
              this.$emit(
                'update-error',
                {
                  message: this.$i18n.t('user.profile.notifyLabel.cannotrefresh')
                }
              )
            }
          } else {
            this.$emit(
              'update-error',
              {
                message: this.$i18n.t('user.profile.notifyLabel.cannotconnect')
              }
            )
          }
        })
    },

    updateUser () {
      this.$emit('before-update')

      this.$uamAuth.updateUser(
        {
          user: this.user.state
        },
        this.updateUrl
      )
        .then(() => {
          this.$emit(
            'update-success',
            {
              message: this.$i18n.t('user.profile.notifyLabel.updated')
            }
          )
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 401 ||
              error.response.status === 403) {
              this.$emit('unauthorized-error')
            } else if (error.response.status === 422) {
              this.$emit(
                'update-error',
                {
                  message: this.$i18n.t('user.profile.notifyLabel.uniqueEmail')
                }
              )
            } else {
              this.$emit(
                'update-error',
                {
                  message: this.$i18n.t('user.profile.notifyLabel.cannotrefresh')
                }
              )
            }
          } else {
            this.$emit(
              'update-error',
              {
                message: this.$i18n.t('user.profile.notifyLabel.cannotconnect')
              }
            )
          }
        })
    }
  },

  name: 'UAMUserProfile',

  props: ['update-url']
}
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
