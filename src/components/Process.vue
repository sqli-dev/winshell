<script setup lang="ts">
defineProps<{
  image: string;
  name: string;
  timestamp: number;
}>();

</script>

<template>
  <div class="process flex">
    <img :src="image" :alt="name">
  </div>
</template>

<style scoped>
img {
  width: 2rem;
  height: 2rem;
  transition: .3s ease;
  border-radius: 8px;
}

.process {
  transition: .3s ease;
  padding: 4px;
  width: fit-content;
  border-radius: 4px;
}

.process:hover {
  background: rgba(255, 255, 255, .1);
}
</style>