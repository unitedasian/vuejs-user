<template>
  <uamLogin
    :redirect-to="redirectTo" />
</template>

<script>
export default {
  name: 'login',

  props: ['redirectTo']
}
</script>
