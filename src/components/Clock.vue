<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const time = ref("00:00 PM");
const date = ref("01-01-01");

const updateTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  time.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

  //Date
  const dateString = now.toDateString().split(" ");
  dateString.pop();
  date.value = dateString.join(" ");
};

let timer;
onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="clock flex gap-2">
    <h1>{{ date }}</h1>
    <h1>{{ time }}</h1>
  </div>
</template>

<style scoped>
.clock {
  transition: .6s ease;
  position: fixed;
  top: 1px;
  left: 3px;
  font-size: 0.8em;
  color: #aaa;
}
</style>