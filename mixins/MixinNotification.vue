<template lang="html">
  <notification class="notify" v-if="showNotification" :notifications="notifications"></notification>
</template>

<script>
import Notification from '../components/Notification.vue'

export default {
  data () {
    return {
      notifications: []
    }
  },
  components: {
    'notification': Notification
  },
  computed: {
    showNotification: function () {
      return this.notifications.length !== 0
    }
  },
  methods: {
    addNotification: function (message, type = 'danger') {
      this.notifications.push({ message: message, type: type })
    },
    clearNotifications: function () {
      this.notifications = []
    }
  }
}
</script>
