<template>
  <div class="notification-bar" :class="notificationType">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      timeout: null,
    };
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationType() {
      return `-text-${this.notification.type}`;
    },
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: mapActions("notification", ["remove"]),
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
