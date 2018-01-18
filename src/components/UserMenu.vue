<template lang="html">
  <b-nav-item-dropdown :right="right">
    <template slot="button-content">
      {{ buttonContent }}
    </template>

    <b-dropdown-item v-if="!noProfile" :to="profileRoute">
      <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
      {{ $t('label.profile') }}
    </b-dropdown-item>

    <slot></slot>

    <div v-if="!noDivider" class="dropdown-divider"></div>

    <b-dropdown-item href="#" @click.prevent="logout()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
      {{ $t('label.logout') }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  i18n: {
    messages: {
      'en': require('../translations/user-menu.json')
    }
  },

  methods: {
    logout () {
      this.$user.logout()
        .then(() => {
          this.$router.push({ name: 'login' })
        })
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
      default: '/profile'
    }
  }
}
</script>
