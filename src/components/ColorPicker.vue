<script setup lang="ts">
import {ref, onMounted, watch, computed} from "vue";

const colorPicker = ref<HTMLElement | null>(null);
const angleRef = ref<HTMLElement | null>(null);

const angleValue = ref(120);
const current = ref<0 | 1>(0);
const visible = ref(false);
const hovering = ref(false);
let clickTimeout: ReturnType<typeof setTimeout> | null = null;
let lastVisible = 0;

const colors = ref<[number[], number[]]>([
  [34, 34, 68],   // #222244
  [34, 68, 68]    // #224444
]);

const toHex = (rgb: number[]): string => {
  return `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;
};

const gradientStyle = computed(() =>
    `linear-gradient(${angleValue.value}deg, ${toHex(colors.value[0])}, ${toHex(colors.value[1])})`
);

watch(gradientStyle, (newStyle) => {
  document.body.style.background = newStyle;
  document.body.style.backgroundSize = `200% 200%`;
  if (angleRef.value) {
    angleRef.value.style.background = newStyle;
  }
}, {immediate: true});

const updateAngle = (e: Event) => {
  angleValue.value = parseInt((e.target as HTMLInputElement).value);
};

const clampInput = (e: Event, channel: number) => {
  const input = e.target as HTMLInputElement;
  let value = input.value.trim().replace(/\D/g, '') || '0';
  const clamped = Math.min(255, parseInt(value));
  input.value = clamped.toString();

  const newColors = [...colors.value] as [number[], number[]];
  newColors[current.value] = [...newColors[current.value]];
  newColors[current.value][channel] = clamped;
  colors.value = newColors;
};

const pickColor = (id: 0 | 1) => {
  current.value = id;
};

const hover = (value: boolean) => {
  hovering.value = value;
};

onMounted(() => {
  document.addEventListener('mousemove', (e) => {
    if (!visible.value && colorPicker.value) {
      colorPicker.value.style.left = `${e.clientX}px`;
      colorPicker.value.style.top = `${e.clientY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (visible.value && !hovering.value && (Date.now() - lastVisible > 200)) {
      visible.value = false;
      hovering.value = false;
      lastVisible = Date.now();
    }
  });

  const lowestLayer = document.querySelector("#lowestLayer");
  if (lowestLayer) {
    lowestLayer.addEventListener('mouseup', (e: MouseEvent) => {
      if (!colorPicker.value) return;

      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
        visible.value = true;
        lastVisible = Date.now();
      } else {
        colorPicker.value.style.left = `${e.clientX}px`;
        colorPicker.value.style.top = `${e.clientY}px`;
        clickTimeout = setTimeout(() => {
          clickTimeout = null;
        }, 230);
      }
    });
  }
  angleRef.value.style.background = gradientStyle.value;
});
</script>

<template>
  <div
      :class="['picker flex gap-3 flex-col absolute items-center glass-bg-2 glass-border', { hide: !visible }]"
      @mouseenter="hover(true)"
      @mouseleave="hover(false)"
      ref="colorPicker"
  >
    <div class="flex gap-3 justify-between w-full">
      <div
          :class="['color', { glow: current === 0 }]"
          @click="pickColor(0)"
          :style="{ background: toHex(colors[0]) }"
      ></div>
      <div
          :class="['color', { glow: current === 1 }]"
          @click="pickColor(1)"
          :style="{ background: toHex(colors[1]) }"
      ></div>
    </div>

    <div>
      <input
          type="range"
          @input="updateAngle"
          ref="angleRef"
          class="angle"
          min="0"
          max="360"
          :value="angleValue"
      >
    </div>

    <div class="flex gap-2 justify-between">
      <div v-for="(channel, index) in ['R', 'G', 'B']" :key="index" class="colorbox">
        <p>{{ channel }}</p>
        <input
            @input="e => clampInput(e, index)"
            type="text"
            class="rgb"
            autocomplete="off"
            maxlength="3"
            :value="colors[current][index]"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.glow {
  box-shadow: 0 0 10px #888;
}

.colorbox {
  display: flex;
  flex-direction: column;
  gap: 1px;
  color: white;
  align-items: center;
  width: 50px;

  input {
    max-width: 40px;
    color: white;
    outline: none;
    background: rgba(0, 0, 0, .3);
    border-radius: 8px;
    text-align: center;
    border: #888 1px solid;
  }
}

.angle {
  border-radius: 50%;
  height: 120px;
  width: 120px;
  appearance: none;
  outline: none;
  //box-shadow: 0 0 5px rgba(255,255,255,.3);
}

.angle::before {
  content: "";
  position: absolute;
  background: inherit;
  border-radius: 50%;
  height: 130px;
  width: 130px;
  transform: translate(-5px, -5px);
  filter: blur(10px) brightness(.8);
  z-index: -1;
}

.angle::-webkit-slider-thumb {
  background: #eee;
  appearance: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.color {
  transition: .3s ease;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #888;
}

.picker {
  transition: opacity 150ms ease, transform 150ms ease;
  left: 200px;
  top: 300px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0, 0, 0, .3);
  z-index: 99999999;
}

.picker.hide {
  transition: none;
  opacity: 0;
  transform: scale(0.95);
  pointer-events: none;
}
</style>