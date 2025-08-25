<script setup>
import {ref} from "vue";

const full = ref(false);
const hidden = ref(false);
let dbl = false;
const toggle = () => {
  setTimeout(() => {
    if (!dbl)
      full.value = !full.value;
  }, 100)
}
const close = () => {
  dbl = true;
  full.value = false;
  hidden.value = true;
}
</script>

<template>
  <div :class="['notification glass-border glass-bg', { 'full': full, 'hide-not': hidden }]" @click="toggle" @dblclick="close">
    <div class="n-head flex items-center">
      <img src="/src/images/youtube.png" alt="notification">
      <h2>New video!</h2>
    </div>
    <p>Young dupsko uploaded new video "Challange 30 dni bez srania" its super fun and yeah, you should watch it like
      right now</p>
  </div>
</template>

<style scoped>
.notification {
  transition: .3s ease;
  padding: 1rem;
  cursor: pointer;
  width: 12rem;
  height: 5rem;
  border-radius: 1rem;
  box-shadow: 0 0 15px rgba(0, 0, 0, .3);
}

.notification.hide-not {
  height: 0;
  padding: 0;
  opacity: 0;
  pointer-events: none;
  p {
    max-height: 0;
  }
  img {
    max-height: 0;
  }
  h2 {
    max-height: 0;
  }
}

.notification.full {
  height: 10rem;

  h2 {
    white-space: wrap;
  }

  p {
    white-space: wrap;
    max-height: calc(100% - 2rem);
  }
}

.notification:hover {
  filter: brightness(1.2);
  box-shadow: 0 0 25px rgba(255, 255, 255, .1);
}

.n-head {
  gap: 5px;

  h2 {
    color: white;
    font-weight: bold;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

p {
  font-size: .8rem;
  color: #eee;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

img {
  width: 2rem;
}

</style>