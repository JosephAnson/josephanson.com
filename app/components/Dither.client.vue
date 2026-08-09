<script setup lang="ts">
// Adapted from Vue Bits' Dither background:
// https://vue-bits.dev/backgrounds/dither
import type { OGLRenderingContext } from 'ogl'
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl'

interface DitherProps {
  waveSpeed?: number
  waveFrequency?: number
  waveAmplitude?: number
  waveColor?: [number, number, number]
  baseColor?: [number, number, number]
  colorNum?: number
  pixelSize?: number
  disableAnimation?: boolean
  enableMouseInteraction?: boolean
  mouseRadius?: number
}

const props = withDefaults(defineProps<DitherProps>(), {
  waveSpeed: 0.05,
  waveFrequency: 3,
  waveAmplitude: 0.3,
  waveColor: () => [0.5, 0.5, 0.5] as [number, number, number],
  baseColor: () => [1, 1, 1] as [number, number, number],
  colorNum: 4,
  pixelSize: 2,
  disableAnimation: false,
  enableMouseInteraction: true,
  mouseRadius: 1,
})

const containerRef = useTemplateRef<HTMLDivElement>('container')

let renderer: Renderer | null = null
let gl: OGLRenderingContext | null = null
let program: Program | null = null
let mesh: Mesh | null = null
let animationId: number | null = null
let resizeObserver: ResizeObserver | null = null
let motionQuery: MediaQueryList | null = null
let initializationFailed = false
let currentMouse = [0, 0]
let targetMouse = [0, 0]
let lastFrameTime = 0
let renderScale = 1

const frameInterval = 1000 / 60
const mouseResponse = -Math.log(0.95) * 60
const colorResponse = -Math.log(0.01) / 0.5
const maxRenderSize = 1920

const vertexShader = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision highp float;

uniform float time;
uniform vec2 resolution;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 baseColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float colorNum;
uniform float pixelSize;

varying vec2 vUv;

vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 2;

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;

  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }

  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p - fbm(p + fbm(p2)));
}

float getBayerValue(int x, int y) {
  if (y == 0) {
    if (x == 0) return 0.0 / 64.0;
    if (x == 1) return 48.0 / 64.0;
    if (x == 2) return 12.0 / 64.0;
    if (x == 3) return 60.0 / 64.0;
    if (x == 4) return 3.0 / 64.0;
    if (x == 5) return 51.0 / 64.0;
    if (x == 6) return 15.0 / 64.0;
    if (x == 7) return 63.0 / 64.0;
  }
  else if (y == 1) {
    if (x == 0) return 32.0 / 64.0;
    if (x == 1) return 16.0 / 64.0;
    if (x == 2) return 44.0 / 64.0;
    if (x == 3) return 28.0 / 64.0;
    if (x == 4) return 35.0 / 64.0;
    if (x == 5) return 19.0 / 64.0;
    if (x == 6) return 47.0 / 64.0;
    if (x == 7) return 31.0 / 64.0;
  }
  else if (y == 2) {
    if (x == 0) return 8.0 / 64.0;
    if (x == 1) return 56.0 / 64.0;
    if (x == 2) return 4.0 / 64.0;
    if (x == 3) return 52.0 / 64.0;
    if (x == 4) return 11.0 / 64.0;
    if (x == 5) return 59.0 / 64.0;
    if (x == 6) return 7.0 / 64.0;
    if (x == 7) return 55.0 / 64.0;
  }
  else if (y == 3) {
    if (x == 0) return 40.0 / 64.0;
    if (x == 1) return 24.0 / 64.0;
    if (x == 2) return 36.0 / 64.0;
    if (x == 3) return 20.0 / 64.0;
    if (x == 4) return 43.0 / 64.0;
    if (x == 5) return 27.0 / 64.0;
    if (x == 6) return 39.0 / 64.0;
    if (x == 7) return 23.0 / 64.0;
  }
  else if (y == 4) {
    if (x == 0) return 2.0 / 64.0;
    if (x == 1) return 50.0 / 64.0;
    if (x == 2) return 14.0 / 64.0;
    if (x == 3) return 62.0 / 64.0;
    if (x == 4) return 1.0 / 64.0;
    if (x == 5) return 49.0 / 64.0;
    if (x == 6) return 13.0 / 64.0;
    if (x == 7) return 61.0 / 64.0;
  }
  else if (y == 5) {
    if (x == 0) return 34.0 / 64.0;
    if (x == 1) return 18.0 / 64.0;
    if (x == 2) return 46.0 / 64.0;
    if (x == 3) return 30.0 / 64.0;
    if (x == 4) return 33.0 / 64.0;
    if (x == 5) return 17.0 / 64.0;
    if (x == 6) return 45.0 / 64.0;
    if (x == 7) return 29.0 / 64.0;
  }
  else if (y == 6) {
    if (x == 0) return 10.0 / 64.0;
    if (x == 1) return 58.0 / 64.0;
    if (x == 2) return 6.0 / 64.0;
    if (x == 3) return 54.0 / 64.0;
    if (x == 4) return 9.0 / 64.0;
    if (x == 5) return 57.0 / 64.0;
    if (x == 6) return 5.0 / 64.0;
    if (x == 7) return 53.0 / 64.0;
  }
  else if (y == 7) {
    if (x == 0) return 42.0 / 64.0;
    if (x == 1) return 26.0 / 64.0;
    if (x == 2) return 38.0 / 64.0;
    if (x == 3) return 22.0 / 64.0;
    if (x == 4) return 41.0 / 64.0;
    if (x == 5) return 25.0 / 64.0;
    if (x == 6) return 37.0 / 64.0;
    if (x == 7) return 21.0 / 64.0;
  }

  return 0.0;
}

vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = getBayerValue(x, y) - 0.25;
  float step = 1.0 / (colorNum - 1.0);
  color += threshold * step;
  float bias = 0.2;
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 centeredUv = uv - 0.5;
  centeredUv.x *= resolution.x / resolution.y;

  float f = pattern(centeredUv);

  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(centeredUv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.72 * effect;
  }

  vec3 colorSteps = dither(uv, vec3(clamp(f, 0.0, 1.0)));
  vec3 col = mix(baseColor, waveColor, colorSteps.r);
  gl_FragColor = vec4(col, 1.0);
}
`

function resize() {
  if (!containerRef.value || !renderer || !program || !gl)
    return

  const { clientWidth, clientHeight } = containerRef.value
  const scale = Math.min(1, maxRenderSize / Math.max(clientWidth, clientHeight))
  renderScale = scale
  renderer.setSize(
    Math.max(1, Math.round(clientWidth * scale)),
    Math.max(1, Math.round(clientHeight * scale)),
  )
  const canvas = gl.canvas as HTMLCanvasElement
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  program.uniforms.resolution.value[0] = gl.canvas.width
  program.uniforms.resolution.value[1] = gl.canvas.height
  program.uniforms.pixelSize.value = Math.max(1, props.pixelSize * renderScale)
  setMouseToCenter()
  requestRender()
}

function setMouseToCenter() {
  if (!gl)
    return

  targetMouse = [gl.canvas.width / 2, gl.canvas.height / 2]
  currentMouse = [...targetMouse]
}

function handleMouseMove(event: MouseEvent) {
  if (!containerRef.value || !gl || !props.enableMouseInteraction)
    return

  const rect = containerRef.value.getBoundingClientRect()
  targetMouse = [
    ((event.clientX - rect.left) / rect.width) * gl.canvas.width,
    ((event.clientY - rect.top) / rect.height) * gl.canvas.height,
  ]
  requestRender()
}

function shouldAnimate() {
  return !props.disableAnimation && motionQuery?.matches !== true && !document.hidden
}

function render(time: number) {
  animationId = null

  if (!program || !renderer || !mesh || !gl)
    return

  if (shouldAnimate() && time - lastFrameTime < frameInterval) {
    animationId = requestAnimationFrame(render)
    return
  }

  const deltaSeconds = lastFrameTime === 0
    ? frameInterval / 1000
    : Math.min((time - lastFrameTime) / 1000, 0.1)
  lastFrameTime = time

  if (props.enableMouseInteraction) {
    const smoothing = 1 - Math.exp(-mouseResponse * deltaSeconds)
    currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0])
    currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1])
  }

  const colorSmoothing = shouldAnimate()
    ? 1 - Math.exp(-colorResponse * deltaSeconds)
    : 1
  const waveColor = program.uniforms.waveColor.value
  const baseColor = program.uniforms.baseColor.value

  waveColor.r += colorSmoothing * (props.waveColor[0] - waveColor.r)
  waveColor.g += colorSmoothing * (props.waveColor[1] - waveColor.g)
  waveColor.b += colorSmoothing * (props.waveColor[2] - waveColor.b)
  baseColor.r += colorSmoothing * (props.baseColor[0] - baseColor.r)
  baseColor.g += colorSmoothing * (props.baseColor[1] - baseColor.g)
  baseColor.b += colorSmoothing * (props.baseColor[2] - baseColor.b)

  program.uniforms.time.value = shouldAnimate() ? time * 0.001 : 0
  program.uniforms.waveSpeed.value = props.waveSpeed
  program.uniforms.waveFrequency.value = props.waveFrequency
  program.uniforms.waveAmplitude.value = props.waveAmplitude
  program.uniforms.mousePos.value[0] = currentMouse[0]
  program.uniforms.mousePos.value[1] = currentMouse[1]
  program.uniforms.enableMouseInteraction.value = props.enableMouseInteraction ? 1 : 0
  program.uniforms.mouseRadius.value = props.mouseRadius
  program.uniforms.colorNum.value = props.colorNum
  program.uniforms.pixelSize.value = Math.max(1, props.pixelSize * renderScale)

  renderer.render({ scene: mesh })

  if (shouldAnimate())
    animationId = requestAnimationFrame(render)
}

function requestRender() {
  if (animationId === null)
    animationId = requestAnimationFrame(render)
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (animationId !== null)
      cancelAnimationFrame(animationId)
    animationId = null
    return
  }

  requestRender()
}

function addMotionChangeListener(query: MediaQueryList) {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', requestRender)
    return
  }

  query.addListener?.(requestRender)
}

function removeMotionChangeListener(query: MediaQueryList) {
  if (typeof query.removeEventListener === 'function') {
    query.removeEventListener('change', requestRender)
    return
  }

  query.removeListener?.(requestRender)
}

function initializeScene() {
  if (!containerRef.value || renderer || initializationFailed)
    return

  if (!('ResizeObserver' in window)) {
    initializationFailed = true
    return
  }

  try {
    renderer = new Renderer({
      alpha: true,
      dpr: 1,
    })
    gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    const geometry = new Triangle(gl)
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height]) },
        waveSpeed: { value: props.waveSpeed },
        waveFrequency: { value: props.waveFrequency },
        waveAmplitude: { value: props.waveAmplitude },
        waveColor: { value: new Color(...props.waveColor) },
        baseColor: { value: new Color(...props.baseColor) },
        mousePos: { value: new Float32Array([gl.canvas.width / 2, gl.canvas.height / 2]) },
        enableMouseInteraction: { value: props.enableMouseInteraction ? 1 : 0 },
        mouseRadius: { value: props.mouseRadius },
        colorNum: { value: props.colorNum },
        pixelSize: { value: props.pixelSize },
      },
    })
    mesh = new Mesh(gl, { geometry, program })

    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    canvas.style.imageRendering = 'pixelated'
    containerRef.value.appendChild(canvas)

    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    addMotionChangeListener(motionQuery)
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(containerRef.value)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    resize()
  }
  catch (error) {
    initializationFailed = true
    cleanup()
    console.warn('Dither background disabled because WebGL could not be initialized.', error)
  }
}

function cleanup() {
  if (animationId !== null)
    cancelAnimationFrame(animationId)

  resizeObserver?.disconnect()
  if (motionQuery)
    removeMotionChangeListener(motionQuery)
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  if (containerRef.value)
    containerRef.value.replaceChildren()

  try {
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  }
  catch {
    // The context may already be unavailable after a failed initialization.
  }
  animationId = null
  resizeObserver = null
  motionQuery = null
  renderer = null
  gl = null
  program = null
  mesh = null
  lastFrameTime = 0
  renderScale = 1
}

watch(
  () => [
    props.waveSpeed,
    props.waveFrequency,
    props.waveAmplitude,
    ...props.waveColor,
    ...props.baseColor,
    props.colorNum,
    props.pixelSize,
    props.disableAnimation,
    props.enableMouseInteraction,
    props.mouseRadius,
  ],
  requestRender,
)

watch(containerRef, initializeScene, { flush: 'post' })
onMounted(initializeScene)
onBeforeUnmount(cleanup)
</script>

<template>
  <div ref="container" class="vue-bits-dither" />
</template>

<style scoped>
.vue-bits-dither {
  width: 100%;
  height: 100%;
}

.vue-bits-dither :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}
</style>
