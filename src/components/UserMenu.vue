<template>
  <b-nav>
    <template v-if="!isLoggedIn">
      <b-nav-item @click.prevent="login">
        {{ $t('user.menu.login') }}
      </b-nav-item>
      <b-nav-item @click.prevent="signup" v-if="signupRoute">
        {{ $t('user.menu.signup') }}
      </b-nav-item>
    </template>
    <template v-else>
      <b-nav-item-dropdown :right="right">
        <template slot="button-content">
          {{ welcome ? welcome : $t('user.menu.welcome', { user: $uamAuth.user.username  }) }}
        </template>

        <b-dropdown-item  @click.prevent="profile" v-if="profileRoute">
          <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
          {{ $t('user.menu.profile') }}
        </b-dropdown-item>

        <slot></slot>

        <div v-if="divider" class="dropdown-divider"></div>

        <b-dropdown-item href="#" @click.prevent="logout">
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

    profileRoute () {
      return this.$uamAuth.routes.profile
    },

    signupRoute () {
      return this.$uamAuth.routes.signup
    }
  },

  methods: {
    login () {
      this.$router.push({ name: this.$uamAuth.routes.login })
    },

    logout () {
      this.$uamAuth.logout()
        .then(() => {
          this.$router.push({ name: this.$uamAuth.routes.logout })
        })
    },

    profile () {
      this.$router.push({ name: this.$uamAuth.routes.profile })
    },

    signup () {
      if (this.$uamAuth.doSignup) {
        this.$router.push({ name: this.$uamAuth.routes.signup })
      }
    }
  },

  name: 'uam_user_menu',

  props: {
    divider: {
      type: Boolean,
      default: true
    },
    right: { // Right align dowpdown menu (default is left align)
      type: Boolean,
      default: false
    },
    welcome: String
  }
}
</script>
