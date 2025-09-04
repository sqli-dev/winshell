<template>
  <div ref="moonContainer" class="moon-container"></div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import fastFrames from "@/scripts/moon.ts";
import * as THREE from 'three';

const moonContainer = ref(null)
let scene, camera, renderer, moon, animationId
const initThreeJS = () => {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
      75,
      moonContainer.value.clientWidth / moonContainer.value.clientHeight,
      0.1,
      1000
  )
  camera.position.z = 4

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
  renderer.setSize(moonContainer.value.clientWidth, moonContainer.value.clientHeight)
  moonContainer.value.appendChild(renderer.domElement)

  const textureLoader = new THREE.TextureLoader()
  const moonTexture = textureLoader.load(
      '/moon_color.png'
  )
  const moonDisplacement = textureLoader.load(
      '/moon_disp.png'
  )

  const moonMaterial = new THREE.MeshPhongMaterial({
    map: moonTexture,
    bumpMap: moonDisplacement,
    bumpScale: .4,
    specular: new THREE.Color('grey'),
    shininess: 2
  })

  const moonGeometry = new THREE.SphereGeometry(2, 128, 128)
  moon = new THREE.Mesh(moonGeometry, moonMaterial)
  renderer.shadowMap.enabled = true;

  moon.castShadow = true;
  moon.receiveShadow = false;

  scene.add(moon)

  const directionalLight = new THREE.DirectionalLight(0xffd0a0, 4)

  directionalLight.castShadow = true;
  directionalLight.position.set(-4, 4, 4)
  scene.add(directionalLight)
  scene.add(new THREE.AmbientLight(0x222222))

  const animate = () => {
    let mult = 1;
    if (fastFrames.value > 0) {
      fastFrames.value = fastFrames.value - 1;
      mult = 2 * Math.pow((fastFrames.value/5),2);
    }
    animationId = requestAnimationFrame(animate)
    moon.rotation.y += 0.0002 * mult
    moon.rotation.x += 0.0002
    moon.rotation.z += 0.0002 * mult
    renderer.render(scene, camera)
  }
  animate()
}

const handleResize = () => {
  camera.aspect = moonContainer.value.clientWidth / moonContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(moonContainer.value.clientWidth, moonContainer.value.clientHeight)
}

const cleanup = () => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationId)
  if (renderer) {
    renderer.dispose()
  }
}

onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<style scoped>
.moon-container {
  transition: 1s ease;
  position: fixed;
  z-index: 1;
  pointer-events: none;
  width: 100%;
  opacity: .0;
  height: 100%;
  transform: scale(.4);
  &.locked {
    transform: scale(.8);
    opacity: .8;
  }
}
</style>