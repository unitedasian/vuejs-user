<template>
  <b-nav>
    <template v-if="!isLoggedIn">
      <b-nav-item
        @click.prevent="doLogin">
        {{ $t('user.menu.login') }}
      </b-nav-item>
      <b-nav-item
        @click.prevent="doSignup"
        v-if="signup">
        {{ $t('user.menu.signup') }}
      </b-nav-item>
    </template>
    <template v-else>
      <b-nav-item-dropdown right>
        <template slot="button-content">
          {{ welcome ? welcome : $t('user.menu.welcome', { user: $uamAuth.user.username  }) }}
        </template>

        <b-dropdown-item
          @click.prevent="doProfile"
          v-if="profile">
          <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
          {{ $t('user.menu.profilex') }}
        </b-dropdown-item>

        <slot></slot>

        <div v-if="divider" class="dropdown-divider"></div>

        <b-dropdown-item href="#" @click.prevent="doLogout">
          <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
          {{ $t('user.menu.logout') }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </template>
  </b-nav>
</template>

<script>
import route from '../mixins/route'

export default {
  computed: {
    isLoggedIn () {
      return this.$uamAuth.isLoggedIn()
    }
  },

  methods: {
    doLogin () {
      this.$router.push(this.getRoute(this.login))
    },

    doLogout () {
      this.$uamAuth.logout()
    },

    doProfile () {
      this.$router.push(this.getRoute(this.profile))
    },

    doSignup () {
      if (this.signup) {
        this.$router.push(this.getRoute(this.signup))
      }
    }
  },

  mixins: [ route ],

  name: 'UAMUserMenu',

  props: {
    login: {
      type: [ Object, String ],
      default: 'login'
    },
    divider: {
      type: Boolean,
      default: true
    },
    right: { // Right align dowpdown menu (default is left align)
      type: Boolean,
      default: false
    },
    signup: {
      type: [ Object, String ],
      default: 'signup'
    },
    welcome: String
  }
}
</script>
