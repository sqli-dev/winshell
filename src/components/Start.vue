<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import config from "@/config.js"
import { perform, cancelAction, title, timeleft, current, forceAction } from "@/scripts/start/power.ts"

const hidden = ref(true)
const isHover = ref(false)
const activeOption = ref<string | null>(null)

const options = computed(() => {
  const opts = ["power"]
  if (config.connection) opts.push("connection")
  if (config.sound) opts.push("sound")
  return opts
})

const handleMouseMove = (event: MouseEvent) => {
  const anyOpen = !!activeOption.value
  const isCursorNearEdge = event.clientX <= (window.innerWidth - 250)

  if (isCursorNearEdge && !hidden.value) {
    hidden.value = true
  } else if (!isCursorNearEdge && hidden.value && !anyOpen) {
    hidden.value = false
  }
}

const handleMouseDown = () => {
  if (!isHover.value) {
    quit()
  }
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mousedown', handleMouseDown)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousedown', handleMouseDown)
})

const toggleOption = (option: string): void => {
  if (activeOption.value === option) {
    quit()
    return
  }

  quit()
  activeOption.value = option
}

const quit = (): void => {
  activeOption.value = null
}

const mouseEnter = (): void => {
  isHover.value = true
}

const mouseLeave = (): void => {
  isHover.value = false
}
</script>

<template>
  <div id="options" :class="{ hide: hidden }">
    <div
        v-for="option in options"
        :key="option"
        :id="option"
        class="option"
        :class="{ view: activeOption === option }"
        @click="toggleOption(option)"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
    >
      <div class="sub" :class="{ wait: activeOption === option }">
        <img :src="`/images/actions/${option}.png`" :alt="option">
        <p>{{ option.charAt(0).toUpperCase() + option.slice(1) }}</p>
      </div>

      <!-- power actions -->
      <div v-if="option === 'power'" class="actions">
        <div class="action" @click.stop="perform('shutdown')">
          <p>Shutdown</p>
          <img src="/images/actions/power.png" alt="Power">
        </div>
        <div class="action" @click.stop="perform('restart')">
          <p>Restart</p>
          <img src="/images/actions/restart.png" alt="Restart">
        </div>
        <div class="action" @click.stop="perform('sleep')">
          <p>Sleep</p>
          <img src="/images/actions/sleep.png" alt="Sleep">
        </div>
      </div>

      <!-- todo: connection -->
      <div v-else-if="option === 'connection'" class="actions">
        <div class="flex gap-2 flex-col text-gray-400 text-sm">
          <div class="flex gap-2 items-center text-xl text-white">
            <img src="/images/actions/ethernet.png" alt="state">
            <p>Network</p>
          </div>
          <p>Connected</p>
        </div>
        <br>
        <div class="networks">
          <div class="action">
            <p>Network 1</p>
            <img src="/images/actions/internet.png" alt="network">
          </div>
          <div class="action">
            <p>Network 2</p>
            <img src="/images/actions/internet.png" alt="network">
          </div>
        </div>
      </div>

      <!-- todo: sound -->
      <div v-else-if="option === 'sound'" class="actions">
        <div class="flex gap-2 flex-col text-gray-400 text-sm">
          <div class="flex gap-2 items-center text-xl text-white">
            <img src="/images/actions/wired.png" alt="state">
            <p>Headset 1</p>
          </div>
          <p>Connected</p>
        </div>
        <br>
        <div class="control flex gap-1 text-white justify-evenly items-center">
          <img src="/images/actions/sound.png" alt="control">
          <input type="range" min="0" max="100" step="1">
          <p>44%</p>
        </div>
        <br>
        <div class="devices">
          <div class="action">
            <p>Wireless headset 1</p>
            <img src="/images/actions/bluetooth.png" alt="sound_dev">
          </div>
          <div class="action">
            <p>Speakers 1</p>
            <img src="/images/actions/wired.png" alt="sound_dev">
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="shadow" class="none"></div>
  <div id="popup" class="none glass-bg-2 glass-border">
    <h1>{{ title }}</h1>
    <br>
    <p>Your computer will automatically {{ current }} in {{ timeleft }}s</p>
    <br>
    <div class="flex items-center justify-between confirm">
      <button @click="forceAction">{{ title }} now</button>
      <button @click="cancelAction">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
/* Styles remain the same as in the original */
.control {
  gap: 20px;

  input {
    -webkit-appearance: none;
    background: rgba(255, 255, 255, .1);
    padding: 2px;
    width: 100%;
    box-shadow: 0 0 10px rgba(255, 255, 255, .1);
    border-radius: 16px;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.3rem;
    height: 1.3rem;
    background: radial-gradient(#fff, #888);
    box-shadow: 0 0 5px white;
    border-radius: 50%;
  }
}

.option {
  transition: .3s ease;
}

.sub.wait {
  opacity: 0;
  width: 0;
  display: none;
}

.sub {
  transition: .3s ease;
  display: flex;
  gap: 10px;
  width: 10rem;
  align-items: center;
  color: white;
  flex-direction: row-reverse;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0);

  p {
    transition: .3s ease;
    opacity: 0;
  }

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    background: rgba(255, 255, 255, .05);
    border: 1px solid rgba(255,255,255,.2);

    p {
      opacity: 1;
    }

    img {
      transform: scale(1.1);
    }
  }
}

.option.view {
  transition: .3s ease;
  box-shadow: 0 0 15px rgba(0, 0, 0, .3);
  background: linear-gradient(45deg, rgba(255, 255, 255, .05), rgba(180, 180, 180, .025));
  backdrop-filter: blur(3px);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  margin-right: -10px;

  .actions {
    width: max-content;
    height: max-content;
    max-height: 25rem;
    max-width: 25rem;
    opacity: 1;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.2),
        rgba(180, 180, 180, 0.2)
    );
    -webkit-mask-image: linear-gradient(#fff 0 0),
    linear-gradient(#fff 0 0);
    -webkit-mask-origin: content-box, border-box;
    -webkit-mask-clip: content-box, border-box;
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

.networks {
  overflow-y: auto;
}

.networks::-webkit-scrollbar {
  display: none;
}

#options {
  transition: .3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

#options.hide {
  right: -15rem;
}

.confirm {
  button {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, .7);
    transition: .3s ease;

    &:nth-of-type(1):hover {
      background: rgba(255, 150, 150, .3);
    }

    &:hover {
      background: rgba(255, 255, 255, .3);
    }
  }
}

#popup {
  transition: .3s ease;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1278499188;
  color: white;
  padding: 2rem;
  border-radius: 1rem;

  h1 {
    font-weight: bold;
    text-align: center;
    font-size: 1.2rem;
    margin: 0;
  }

  &.none {
    background: none;
    border-width: 0;
    padding: 0;
    pointer-events: none;
    opacity: 0;
  }
}

#shadow {
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(10px) brightness(50%);
  position: fixed;
  z-index: 1278499187;
  transition: .3s ease;

  &.none {
    backdrop-filter: blur(0) brightness(100%);
    pointer-events: none;
  }
}

.action {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  color: white;
  text-wrap: nowrap;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  transition: .3s ease;

  &:hover {
    background: rgba(255, 255, 255, .1);
    box-shadow: 0 0 10px rgba(255, 255, 255, .1);

    img {
      margin-right: 10px;
    }
  }
}

.actions {
  transition: .3s ease;
  opacity: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 0;
  width: 0;
  gap: 10px;
}

img {
  transition: .3s ease;
  filter: invert(1);
  opacity: .7;
  width: 2rem;
}
</style>