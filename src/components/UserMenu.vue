<template lang="html">
  <b-nav-item-dropdown :right="right">
    <template slot="button-content">
      {{ $t('label.welcome') }} {{ $user.getCurrentUser().username }}
    </template>

    <b-dropdown-item to="/profile">
      <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
      {{ $t('label.profile') }}
    </b-dropdown-item>

    <slot></slot>

    <b-dropdown-divider></b-dropdown-divider>

    <b-dropdown-item href="#" @click.prevent="logout()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
      {{ $t('label.logout') }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  name: 'user-menu',
  props: {
    right: {
      // Right align dowpdown menu (default is left align)
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout () {
      this.$user.logout()
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  i18n: {
    messages: {
      'en': require('../translations/user-menu.json')
    }
  }
}
</script>
