<script setup>
import {result} from "@/scripts/search.ts";
</script>

<template>
  <div id="result">
    <p v-for="value of result.filter(v=>v.length>0)" class="glass-border glass-bg">{{ value }}</p>
  </div>
</template>

<style scoped>
#result {
  transition: .3s ease;
  opacity: 0;
  pointer-events: none;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, .3);
  justify-content: center;
  color: white;
}

p {
  height: 3em;
  line-height: 1em;
  transition: .3s ease;
  white-space: nowrap;
  opacity: .4;
  font-size: 1.1em;
  padding: 16px;
  border-radius: 16px;
  min-width: 300px;

  &:hover {
    opacity: 1;
  }
}
</style>