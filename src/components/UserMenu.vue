<template lang="html">
<li class="nav-item dropdown">
  <a
    class="nav-link dropdown-toggle"
    href="#"
    id="navbarDropdownMenuLink"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
     {{ $t('label.welcome') }} {{ $user.getCurrentUser().username }}
  </a>

  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
    <router-link class="dropdown-item" to="/profile">
      <i class="fa fa-user" aria-hidden="true"></i>&nbsp;
      {{ $t('label.profile') }}
    </router-link>

    <slot></slot>

    <div class="dropdown-divider"></div>

    <a class="dropdown-item" href="#" @click.prevent="logout()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
      {{ $t('label.logout') }}
    </a>
  </div>
</li>
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
