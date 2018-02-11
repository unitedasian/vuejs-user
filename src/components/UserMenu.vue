<template>
  <b-nav>
    <template v-if="!isLoggedIn">
      <b-nav-item @click="login">
        {{ $t(loginRoute.label || 'user.menu.login') }}
      </b-nav-item>
      <b-nav-item @click="signup" v-if="signupRoute">
        {{ $t(signupRoute.label || 'user.menu.signup') }}
      </b-nav-item>
    </template>
    <template v-else>
      <b-nav-item-dropdown :right="right">
        <template slot="button-content">
          {{ $t(
              welcome ? welcome : 'user.menu.welcome',
              { user: $uamAuth.user.username  }
            ) }}
        </template>

        <b-dropdown-item  @click="profile" v-if="profileRoute">
          <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
          {{ $t(profileRoute.label || 'user.menu.profile') }}
        </b-dropdown-item>

        <slot></slot>

        <div v-if="divider" class="dropdown-divider"></div>

        <b-dropdown-item href="#" @click.prevent="logout">
          <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
          {{ $t(logoutRoute.label || 'user.menu.logout') }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </template>
  </b-nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$uamAuth.isLoggedIn()
    },

    loginRoute () {
      return this.$uamAuth.routes.login
    },

    logoutRoute () {
      return this.$uamAuth.routes.logout
    },

    profileRoute () {
      return this.$uamAuth.routes.profile
    },

    signupRoute () {
      return this.$uamAuth.routes.signup
    }
  },

  i18n: {
    messages: {
      'en': require('../i18n/user-menu.json')
    }
  },

  methods: {
    login () {
      this.$router.push({ name: this.loginRoutes.name })
    },

    logout () {
      this.$uamAuth.logout()
        .then(() => {
          this.$router.push({ name: this.logoutRoute.name })
        })
    },

    profile () {
      this.$router.push({ name: this.profileRoute.name })
    },

    signup () {
      if (this.$uamAuth.doSignup) {
        this.$router.push({ name: this.signupRoute.name })
      }
    }
  },

  name: 'uam_user_menu',

  props: {
    buttonContent: String,
    right: { // Right align dowpdown menu (default is left align)
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: true
    },
    welcome: String
  }
}
</script>
