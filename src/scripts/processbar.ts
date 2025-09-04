import {ref} from "vue";

const isHovered = ref(false);

function handleMouseMove(event) {
   isHovered.value = event.clientY > window.innerHeight - 150;
}


export {isHovered, handleMouseMove}