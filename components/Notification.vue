<template lang="html">
  <div>
    <b-alert
      v-for="(notification, index) in notifications"
      :key="index"
      :variant="notification.type"
      show
    >
      {{ notification.message }}
    </b-alert>
  </div>
</template>

<script>
export default {
  props: ['notifications']
}
</script>
