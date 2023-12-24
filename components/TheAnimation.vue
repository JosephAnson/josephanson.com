<script lang="ts" setup>
import * as THREE from 'three'
import type { ShaderMaterial } from 'three/src/materials/ShaderMaterial'
import type { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'
import type { Scene } from 'three/src/scenes/Scene'
import type { Camera } from 'three/src/cameras/Camera'

const props = withDefaults(defineProps<{
  fragmentShaderOptions: '1' | '2'
}>(), {
  fragmentShaderOptions: '1',
})

const fragmentOptions = {
  1: `
      vec3 col = vec3(pattern * distortion2.x, pattern * distortion2.y, pattern * distortion1.x * 2.);
      col *= vec3(dot(distortion1, distortion1) * 0.5);
      col = col * col * 0.5;
      return vec4(col, 3.);
  `,
  2: `
      vec3 col = vec3(pattern, pattern , pattern * distortion1.x * 2.);
      col *= vec3(dot(distortion1, distortion1) * 10);
      return vec4(col, 1);
  `,
}

const container = ref<HTMLDivElement | null>(null)

let camera: Camera
let scene: Scene
let renderer: WebGLRenderer
let uniforms: ShaderMaterial['uniforms']

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  uniforms.u_resolution.value.x = renderer.domElement.width
  uniforms.u_resolution.value.y = renderer.domElement.height
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  uniforms.u_time.value += 0.05
  renderer.render(scene, camera)
}

onMounted(() => {
  camera = new THREE.Camera()
  camera.position.z = 1

  scene = new THREE.Scene()

  const geometry = new THREE.PlaneGeometry(2, 2)

  uniforms = {
    u_time: { value: 1.0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      void main() {
          gl_Position = vec4( position, 1 );
      }
    `,
    fragmentShader: `
      uniform vec2 u_resolution;
      uniform float u_time;

      const mat2 m2 = mat2(0.75, 1.2990381, -1.2990381, 0.75);
      const float seed = 1.2;

      float tri(float x) {
          return abs(fract(x) - 0.5);
      }

      float tri2(vec2 p) {
          return tri(p.x + tri(p.y * 0.5 + 0.3333)) + tri(p.y + tri(p.x * 0.5 - 0.1666));
      }

      float triNoise2D(vec2 p) {
          float n = tri2(p);
          p *= m2;
          n += tri2(p) * 0.7071;
          p *= m2;
          n += tri2(p) * 0.5;
          return n / 2.2071;
      }

      float triSmooth(float x) {
          return 0.25 + 0.25 * cos(x * 6.2831853);
      }

      float triSmoothNoise2D(vec2 p, float ani_seed) {
          float t = ani_seed * 0.3333;
          float t1 = ani_seed * 0.15;
          float n = triSmooth(p.x + triSmooth(p.y * 0.5 + t)) + triSmooth(p.y + triSmooth(p.x * 0.5 - t1));
          p *= m2;
          n += (triSmooth(p.x + triSmooth(p.y * 0.5 + t)) + triSmooth(p.y + triSmooth(p.x * 0.5 - t1))) * 0.7071;
          p *= m2;
          n += (triSmooth(p.x + triSmooth(p.y * 0.5 + t)) + triSmooth(p.y + triSmooth(p.x * 0.5 - t1))) * 0.5;
          return n / 2.2071 * 0.5 + 0.5;
      }

      float pattern(vec2 uv, float seed, float time, inout vec2 q, inout vec2 r) {
          q = vec2(triSmoothNoise2D(uv, seed), triSmoothNoise2D(uv + vec2(5.2, 1.3), seed));
          r = vec2(triSmoothNoise2D(uv + 4.0 * q + vec2(1.7 - time / 2., 9.2), seed),
                   triSmoothNoise2D(uv + 4.0 * q + vec2(8.3 - time / 2., 2.8), seed));
          vec2 s = vec2(triSmoothNoise2D(uv + 5.0 * r + vec2(21.7 - time / 2., 90.2), seed),
                        triSmoothNoise2D(uv + 5.0 * r + vec2(80.3 - time / 2., 20.8), seed));
          return triSmoothNoise2D(uv + 4.0 * s, seed);
      }

      vec4 colour(float pattern, vec2 distortion1, vec2 distortion2) {
          ${fragmentOptions[props.fragmentShaderOptions]}
      }

      void main() {
          float time = u_time * 0.1;
          vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / u_resolution.y;
          uv *= 3.5;
          vec2 q, r;
          float pat = pattern(uv, seed, time, q, r);
          vec4 col = colour(pat, q, r);
          gl_FragColor = col;
      }
    `,
  })

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(1)

  container.value?.appendChild(renderer.domElement)

  onWindowResize()
  window.addEventListener('resize', onWindowResize, false)

  animate()
})
</script>

<template>
  <div ref="container" class="filter-blur-xs absolute inset-0 z-0 h-full w-full opacity-30 filter-brightness-300 filter-hue-rotate--20deg" />
</template>
