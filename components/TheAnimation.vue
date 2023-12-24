<script lang="ts" setup>
import * as THREE from 'three'
import type { ShaderMaterial } from 'three/src/materials/ShaderMaterial'
import type { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'
import type { Scene } from 'three/src/scenes/Scene'
import type { Camera } from 'three/src/cameras/Camera'

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

    const int octaves = 1;
    const float seed2 = 1.1;
    const float seed = 1.2;

    float time;

    const mat2 m2 = mat2(0.75, 1.2990381, -1.2990381, 0.75);

    float tri(float x){ return abs(fract(x)-0.5); }
    float triXY(vec2 p){ return tri(p.x+tri((p.y-0.25)*1.5)) + tri(p.y-tri((p.x+0.5)*1.5)); }
    float tri2(vec2 p){
        return tri(p.x + tri(p.y*0.5 + 0.3333)) + tri(p.y + tri(p.x*0.5 - 0.1666));
    }

  float triNoise2D(vec2 p){
      float n = tri2(p);//(tri(p.x + tri(p.y*0.5 + 0.3333)) + tri(p.y + tri(p.x*0.5 - 0.1666)));//tri2(p);//
      p *= m2;
      n += tri2(p)*0.7071;//(tri(p.x + tri(p.y*0.5 + 0.3333)) + tri(p.y + tri(p.x*0.5 - 0.1666)))*0.7071;
      p *= m2;
      n += tri2(p)*0.5;//(tri(p.x + tri(p.y*0.5 + 0.3333)) + tri(p.y + tri(p.x*0.5 - 0.1666)))*0.5;
      return n/(2.2071);
  }

  // This is the smooth version of the tri function above. Sometimes, it's preferrable. Other times, not so much.
  float triSmooth(in float x){return 0.25+0.25*cos((x)*6.2831853);}
  float triSmooth2(float x){ x = abs(fract(x)-0.5); return x*x*(6.-8.*x); }
  float triSmoothXY(vec2 p){ return triSmooth(p.x+triSmooth((p.y-0.25)*1.5)) + triSmooth(p.y-triSmooth((p.x+0.5)*1.5)); }
  float triSmoothNoise2D(vec2 p, float ani_seed){

    // mat2 m2 = m2 * (sin(u_time / 20.) + .5;
    float t = ani_seed * .3333;
    float t1 = ani_seed * .15;

      float n = (triSmooth(p.x + triSmooth(p.y*0.5 + t)) + triSmooth(p.y + triSmooth(p.x*0.5 - t1)));
      p *= m2;
      n += (triSmooth(p.x + triSmooth(p.y*0.5 + t)) + triSmooth(p.y + triSmooth(p.x*0.5 - t1)))*0.7071;
      p *= m2;
      n += (triSmooth(p.x + triSmooth(p.y*0.5 + t)) + triSmooth(p.y + triSmooth(p.x*0.5 - t1)))*0.5;
      return n/(2.2071) * .5 + .5;

  }

  // ------------------------------

  float pattern(vec2 uv, float seed, float time, inout vec2 q, inout vec2 r) {

    q = vec2( triSmoothNoise2D( uv + vec2(0.0,0.0), seed ),
                   triSmoothNoise2D( uv + vec2(5.2,1.3), seed ) );

    r = vec2( triSmoothNoise2D( uv + 4.0*q + vec2(1.7 - time / 2.,9.2), seed ),
                   triSmoothNoise2D( uv + 4.0*q + vec2(8.3 - time / 2.,2.8), seed ) );

    vec2 s = vec2( triSmoothNoise2D( uv + 5.0*r + vec2(21.7 - time / 2.,90.2), seed ),
                   triSmoothNoise2D( uv + 5.0*r + vec2(80.3 - time / 2.,20.8), seed ) );

    return triSmoothNoise2D( uv + 4.0*s, seed );
  }

  vec4 colour(float pattern, vec2 distortion1, vec2 distortion2) {
    vec3 col = vec3(pattern * distortion2.x, pattern * distortion2.y, pattern * distortion1.x * 2.);

    // Try muxing the colours here. Uncomment the following lines, 1-by-1 for some examples
     // col = vec3(col.b);
   //  col = vec3(col.b * col.r) / col;
     col *= vec3(dot(distortion1, distortion1) * .5);
    // col = col * (1.5 + sin(gl_FragCoord.x / u_resolution.x * 10.) * .5 + cos(gl_FragCoord.y / u_resolution.y * 10.) * .5);
    // col = 1. - col;
    // col *= sin(col * 2.);

    // Ramping up the contrast a bit
    col = col * col * .5;

    return vec4(col, 3.);
  }

  void main() {

    time = u_time * .1;

    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = (fragCoord - u_resolution.xy*.5)/u_resolution.y;

    uv *= 3.5;

    vec2 q = vec2(0.);
    vec2 r = vec2(0.);

    float pattern = pattern(uv, seed, time, q, r);

    vec4 colour = colour(pattern, q, r);

    gl_FragColor = colour;
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
  <div ref="container" class="absolute inset-0 z-0 h-full w-full opacity-30 filter-blur-sm filter-brightness-300 filter-hue-rotate--20deg" />
</template>
