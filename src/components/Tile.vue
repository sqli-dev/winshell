<script setup lang="ts">
import {command} from "../scripts/low/actions.ts";

defineProps<{
  image: string;
  path: string;
  name: string;
}>();
</script>

<template>
  <div class="tile flex flex-col gap-0.5 justify-center items-center" @click='command(`"${path}"`)'>
    <img :src="image" :alt="name">
    <p> {{ name }} </p>
  </div>
</template>

<style scoped>
.tile {
  background: rgba(255, 255, 255, 0);
  border-radius: 16px;
  width: 4rem;
  height: 4rem;
  transition: .3s ease;
}

.tile:hover {
  background: rgba(255, 255, 255, .1);
  box-shadow: 0 0 15px rgba(255, 255, 255, .1);
}

img {
  position: relative;
  opacity: .8;
  width: 3rem;
  border-radius: 16px;
}

p {
  color: white;
  height: 0;
  margin-bottom: 5px;
  opacity: 0;
  transition: .3s ease;
}
</style>