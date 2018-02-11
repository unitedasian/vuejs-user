<template>
  <b-nav>
    <template v-if="!isLoggedIn">
      <b-nav-item href="#" @click="login">
        {{ $t('user.menu.login') }}
      </b-nav-item>
      <b-nav-item href="#" @click="signup">
        {{ $t('user.menu.signup') }}
      </b-nav-item>
    </template>
    <template v-else>
      <b-nav-item-dropdown :right="right">
        <template slot="button-content">
          {{ welcome ?
              welcome :
              $t('user.menu.welcome', { user: $uamAuth.user.username  }) }}
        </template>

        <b-dropdown-item v-if="!noProfile" :to="{ name: profileRoute }">
          <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
          {{ $t('user.menu.profile') }}
        </b-dropdown-item>

        <slot></slot>

        <div v-if="!noDivider" class="dropdown-divider"></div>

        <b-dropdown-item href="#" @click.prevent="logout()">
          <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
          {{ $t('user.menu.logout') }}
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
      return this.$uamAuth.userEndpoints.login
    },

    signupRoute () {
      return this.$uamAuth.userEndpoints.signup
    }
  },

  i18n: {
    messages: {
      'en': require('../translations/user-menu.json')
    }
  },

  methods: {
    login () {
      this.$router.push({ name: this.$uamAuth.userEndpoints.login })
    },

    logout () {
      this.$uamAuth.logout()
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    },

    signup () {
      this.$router.push({ name: this.$uamAuth.userEndpoints.login })
    }
  },

  name: 'uam_user_menu',

  props: {
    buttonContent: String,
    right: { // Right align dowpdown menu (default is left align)
      type: Boolean,
      default: false
    },
    noDivider: {
      type: Boolean,
      default: false
    },
    noProfile: {
      type: Boolean,
      default: false
    },
    profileRoute: {
      type: String,
      default: 'profile'
    }
  }
}
</script>
