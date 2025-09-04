<script setup>
import Notification from './Notification.vue'
</script>

<template>
<div id="notifications">
  <Notification/>
  <Notification/>
</div>
</template>

<style scoped>
#notifications {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>