<script setup>
import Process from "./Process.vue";
import {handleMouseMove} from "@/scripts/processbar.ts";
import {onMounted, onUnmounted} from "vue";

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div :class="['process-bar glass-bg-2 glass-border']">
    <div class="processes">
      <Process image="/src/images/chrome.png" name="Chrome" :timestamp="Date.now()"/>
      <Process image="/src/images/discord.png" name="Discord" :timestamp="Date.now()"/>
      <Process image="/src/images/notelock.png" name="NoteLock" :timestamp="Date.now()"/>
    </div>
  </div>
</template>

<style scoped>
.process-bar {
  transition: .6s ease;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 1000;
  justify-content: center;
  bottom: 5px;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  border-radius: 16px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
}

.processes {
  max-width: 100%;
  overflow: auto;
  display: flex;
  gap: 16px;
  scroll-behavior: smooth;
}

.processes::-webkit-scrollbar {
  display: none;
}

</style>