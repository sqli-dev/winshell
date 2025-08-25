<script setup>
import config from "@/config.js";
</script>
<template>
  <div class="root">
    <div id="ui" class="glass-bg glass-border">
      <div class="info">
        <img src="/src/images/ui/offline.png" alt="network">
      </div>
      <div class="info">
        EN
      </div>
    </div>
    <div v-if="config.alerts" id="alerts" class="flex flex-col glass-bg glass-border">
      <img src="/src/images/ui/alert.png" alt="alert">
      <div id="a-options" class="flex flex-col">
        <img src="/src/images/ui/mute.png" alt="alert">
        <img src="/src/images/ui/sound.png" alt="alert">
      </div>
    </div>
  </div>
</template>

<style scoped>
.root {
  transition: .6s ease;
  position: fixed;
  right: 5px;
  top: 5px;
}
h3 {
  color: orange;
}

small {
  margin-left: -1.5rem;
  margin-bottom: 10px;
  color: #aaa;
}

#a-options {
  transition: .3s ease;
  gap: 10px;
  height: 0;
  margin-bottom: -10px;
  overflow: hidden;

  img {
    transition: .3s ease;
  }

  img:hover {

    background: rgba(0, 0, 0, .2);
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    padding: 4px;
    border-radius: 4px;
  }
}

#alerts {
  top: 5px;
  gap: 10px;
  right: 6rem;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  padding: 4px;

  img {
    width: 2rem;
  }

  p {
    position: absolute;
    top: 4.5px;
    color: white;
    font-weight: bold;
    font-size: 8px;
    right: 9px;
  }

  &:hover {
    #a-options {
      height: calc(4rem + 20px);
      margin-bottom: 0;
      margin-top: 1rem;
    }
  }
}

#ui {
  display: flex;
  gap: 1rem;
  right: 5px;
  top: 5px;
  padding: 4px 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
}

.info {
  transition: .3s ease;
  width: 1.5rem;
  font-size: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  padding: 4px;
  border-radius: 4px;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, .2);
    box-shadow: 0 0 5px rgba(255, 255, 255, .1);
  }
}

img {
  width: 1.2rem;
  filter: invert(1);
  opacity: .8;
}
</style>