<script setup>
import {onMounted, ref} from "vue";
import {lock, locked} from "@/scripts/low/actions.ts";
import config from "@/config.js";
import Clock from '@/components/Clock.vue'
import TileBar from '@/components/TileBar.vue'
import ProcessBar from '@/components/ProcessBar.vue'
import Search from '@/components/Search.vue'
import Start from '@/components/Start.vue'
import Notifications from '@/components/Notifications.vue'
import UI from '@/components/UI.vue'
import ColorPicker from "@/components/ColorPicker.vue";
import Moon from "@/components/background/Moon.vue";

const dragging = ref(false);
const lastY = ref(0);
onMounted(() => {
  document.addEventListener('mousedown', (e) => {
    if (locked.value) {
      dragging.value = false;
      return lock(0) || console.log(locked.value);
    }
    dragging.value = true;
    lastY.value = e.clientY
  });
  document.addEventListener('mouseup', () => {
    dragging.value = false;
  });
  document.addEventListener('mousemove', (e) => {
    if (!locked.value && dragging.value && Math.abs(e.clientY - lastY.value) > 100) {
      lock(1);
    }
  });
})
// window.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
// });
</script>

<template>
  <Moon :class="{'locked':locked}"/>
  <div id="lowestLayer" :class="{'visible': locked}"></div>
  <ColorPicker/>
  <Clock :class="{'up': locked}"/>
  <TileBar :class="{'up': locked}"/>
  <ProcessBar :class="{'down': locked}" v-if="config.processbar"/>
  <Search placeholder="Web search" :class="{'up': locked}"/>
  <Start/>
  <Notifications v-if="config.notifications"/>
  <UI :class="{'up': locked}"/>
</template>

<style scoped>
#lowestLayer {
  transition: .3s ease;
  background: rgba(0, 0, 0, 0);
  z-index: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &.visible {
    background: rgba(0, 0, 0, .5);
  }
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
