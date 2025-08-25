<script setup lang="ts">
import {onMounted, ref} from "vue";
import {hover, toggleView, state, view, toggleFocus, initRef, onResult} from "@/scripts/search.ts"
import SearchResult from "@/components/SearchResult.vue";
import {invoke} from "@tauri-apps/api/core";

const searchBox = ref<HTMLElement | null>(null);
const input = ref<HTMLElement | null>(null);
const suggestTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

onMounted(() => {
  initRef(searchBox.value, document.querySelector("#result"));
})

const suggest = async () => {
  if (input.value?.value.length > 0) {
    //onResult(test);
    const result: string[] = await invoke("google_suggest", {query: input.value?.value});

    if (result.length > 5) {
      onResult(result.slice(0, 5));
    }
    if(result.length == 0) {
      onResult(["No results found..."]);
    }
  } else {
    onResult([]);
  }
}
const onInput = () => {
  if (suggestTimeout.value) clearTimeout(suggestTimeout.value);
  suggestTimeout.value = setTimeout(() => {
    suggest();
  }, 350)
}

defineProps<{
  placeholder: string
}>();
</script>

<template>
  <div id="focusBox" :class="{ hidden: !state }" @mouseenter="hover(true)" @mouseleave="hover(false)">
    <div id="search" ref="searchBox" :class="{ hide: !view }" @mouseenter="toggleView(true)"
         @mouseleave="toggleView(false)">
      <div class="flex gap-3">
        <img src="/src/images/search.png" alt="search"/>
        <input ref="input" @input="onInput" autocomplete="off" id="s_inp" type="text" @focusin="toggleFocus(true)"
               @focusout="toggleFocus(false)"
               :placeholder="placeholder">
      </div>
      <SearchResult/>
    </div>
  </div>
</template>

<style scoped>
#focusBox {
  transition: .6s ease;
  position: fixed;
  display: flex;
  padding: 100px 200px;
  top: 3rem;
  left: 50%;
  justify-content: center;
  transform: translateX(-50%);
}

#search {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  transition: .3s ease;
  border-radius: 20px;
  padding: 10px 30px;
  display: flex;
  height: 3.5em;
  position: fixed;
  flex-direction: column;
  gap: 10px;
  left: 50%;
  transform: translateX(-50%);

  &.hide {
    backdrop-filter: blur(0);
    border: 1px solid rgba(255, 255, 255, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0);

    input::placeholder {
      color: rgba(255, 255, 255, 0);
    }
  }
}

input {
  transition: .3s ease;
  width: 12rem;
  border: none;
  background: transparent;
  color: white;
  flex-grow: 1;
  outline: none;
  font-size: 16px;
}


.hide {
  input {
    padding: 0;
    width: 0;
    border-width: 0;
  }
}


input::placeholder {
  color: #aaa;
}

img {
  cursor: pointer;
  width: 2rem;
  filter: invert(1);
  opacity: .7;
  transition: .3s ease;
}

.hidden {
  img {
    opacity: 0;
  }
}
</style>