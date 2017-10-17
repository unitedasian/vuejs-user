<template lang="html">
  <div>
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      :class="'alert alert-' + notification.type"
      role="alert"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'uam_notification',
  props: ['notifications']
}
</script>
