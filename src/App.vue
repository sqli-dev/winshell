<script setup>
import { onMounted, ref } from "vue";
import { lock, locked } from "@/scripts/low/actions.ts";
import config from "@/config.js";

import Clock from '@/components/Clock.vue';
import TileBar from '@/components/TileBar.vue';
import ProcessBar from '@/components/ProcessBar.vue';
import Search from '@/components/Search.vue';
import Start from '@/components/Start.vue';
import Notifications from '@/components/Notifications.vue';
import UI from '@/components/UI.vue';
import ColorPicker from "@/components/ColorPicker.vue";
import Moon from "@/components/background/Moon.vue";

const dragging = ref(false);
const lastY = ref(0);

function handleMouseDown(e) {
  if (locked.value) {
    dragging.value = false;
    lock(0);
    return;
  }
  dragging.value = true;
  lastY.value = e.clientY;
}

function handleMouseUp() {
  dragging.value = false;
}

function handleMouseMove(e) {
  if (!locked.value && dragging.value && Math.abs(e.clientY - lastY.value) > 100) {
    lock(1);
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <Moon :class="{ locked }" />
  <div id="lowestLayer" :class="{ visible: locked }"></div>
  <ColorPicker />
  <Clock :class="{ up: locked }" />
  <TileBar :class="{ up: locked }" />
  <ProcessBar v-if="config.processbar" :class="{ down: locked }" />
  <Search placeholder="Web search" :class="{ up: locked }" />
  <Start />
  <Notifications v-if="config.notifications" />
  <UI :class="{ up: locked }" />
</template>

<style scoped>
#lowestLayer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s ease;
}

#lowestLayer.visible {
  background: rgba(0, 0, 0, 0.5);
}

.up {
  top: -10em;
  pointer-events: none;
}

.down {
  bottom: -10em;
  pointer-events: none;
}
</style>