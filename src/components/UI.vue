<script setup>
import { ref } from "vue";
import config from "@/config.js";

const alertsOpen = ref(false);

function toggleAlerts() {
  alertsOpen.value = !alertsOpen.value;
}
</script>

<template>
  <div class="root">
    <div id="ui" class="glass-bg glass-border">
      <div class="info">
        <img src="/images/ui/online.png" alt="network" />
      </div>
      <div class="info">EN</div>
    </div>

    <div v-if="config.alerts" id="alerts" class="flex flex-col glass-bg glass-border">
      <img src="/images/ui/alert.png" alt="alert" @click="toggleAlerts" />
      <div id="a-options" class="flex flex-col" :style="{ height: alertsOpen ? '4.5rem' : '0', marginBottom: alertsOpen ? '0' : '-10px', marginTop: alertsOpen ? '1rem' : '0' }">
        <img src="/images/ui/mute.png" alt="alert" />
        <img src="/images/ui/sound.png" alt="alert" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  position: fixed;
  top: 5px;
  right: 5px;
  transition: 0.6s ease;
}

#ui {
  display: flex;
  gap: 1rem;
  padding: 4px 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 4px;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  transition: 0.3s ease;
}

.info:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
}

#a-options {
  overflow: hidden;
  transition: all 0.3s ease;
  gap: 10px;
}

img {
  width: 1.2rem;
  filter: invert(1);
  opacity: 0.8;
}
</style>