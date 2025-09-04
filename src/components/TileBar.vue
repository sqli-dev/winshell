<script setup lang="ts">
import {onMounted, ref, useTemplateRef} from "vue";
import {init, mouseMove, onHover} from "../scripts/tiles.ts";
import Tile from './Tile.vue'
import {chrome, discord, explorer, riot, youtube} from "../scripts/low/defined_paths.ts";

const tileBox = useTemplateRef("tileBox");
const tiles = ref<HTMLElement[] | null>(null);

onMounted(() => {
  if (tileBox.value) {
    tiles.value = Array.from(tileBox.value.querySelectorAll<HTMLElement>(".tile"));
    init(tileBox.value, tiles.value);
  }
});
</script>

<template>
  <div class="tile-bar glass-bg glass-border">
    <div class="tile-box"
         ref="tileBox"
         @mousemove="mouseMove"
         @mouseenter="onHover(true)"
         @mouseleave="onHover(false)">
      <Tile :path="youtube" image="/images/youtube.png" name="YouTube"/>
      <Tile :path="discord" image="/images/discord.png" name="Discord"/>
      <Tile :path="riot" image="/images/riot.png" name="Riot Client"/>
      <Tile :path="chrome" image="/images/chrome.png" name="Chrome"/>
      <Tile :path="explorer" image="/images/explorer.png" name="Explorer"/>
    </div>
  </div>
</template>

<style scoped>
.tile-box {
  max-width: 100%;
  overflow: auto;
  display: flex;
  gap: 10px;
  scroll-behavior: smooth;
}

.tile-box::-webkit-scrollbar {
  display: none;
}

.tile-bar {
  transition: .3s ease;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 123193;
  justify-content: center;
  top: 25px;
  padding: 5px;
  border-radius: 16px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
}

.tile-bar:hover:deep(.tile) {
  width: 6rem;
  height: 6rem;

  p {
    opacity: 1;
    height: 1rem;
    margin-bottom: 10px;
  }
}
</style>