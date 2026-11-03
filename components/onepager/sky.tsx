"use client"

import { useEffect, useRef } from "react"

/* Full-bleed sky rendered live: a cool, desaturated blue with volumetric
   clouds that drift slowly, after Origin Financial's hero photograph. */

const FRAG = `
precision highp float;
uniform vec2 r;
uniform float t;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = uv * vec2(r.x / r.y, 1.0);

  // sky: deep cool blue overhead, paler toward the horizon
  vec3 zenith = vec3(0.055, 0.215, 0.47);
  vec3 horizon = vec3(0.47, 0.64, 0.84);
  vec3 sky = mix(horizon, zenith, smoothstep(0.0, 1.05, uv.y));

  // cumulus masses: a warped base layer for shape, a fine layer for crisp
  // edges, banked low in the frame and thinning toward the zenith
  vec2 q = p * 1.05 + vec2(t * 0.009, t * 0.0012);
  float warp = fbm(q * 0.7 + vec2(t * 0.003, 0.0));
  float base = fbm(q + warp * 1.25);
  float detail = fbm(p * 4.6 + vec2(t * 0.016, -t * 0.002));
  float cover = base * 0.86 + detail * 0.26 - (uv.y - 0.1) * 0.95;
  float density = smoothstep(0.43, 0.6, cover);

  // light from above: sunlit tops, cooler grey-blue undersides
  float shade = smoothstep(0.32, 0.92, detail * 0.55 + base * 0.35 + uv.y * 0.42);
  vec3 cloudLit = vec3(1.0, 1.0, 1.0);
  vec3 cloudShadow = vec3(0.6, 0.68, 0.8);
  vec3 cloud = mix(cloudShadow, cloudLit, shade);

  vec3 col = mix(sky, cloud, density * 0.96);

  // a faint cool shadow behind the headline block
  vec2 e = (uv - vec2(0.5, 0.52)) * vec2(1.35, 2.1);
  col *= 1.0 - 0.16 * smoothstep(1.0, 0.0, length(e));

  // atmosphere: a cool falloff at the bottom so the logo row reads
  col *= mix(0.62, 1.0, smoothstep(0.0, 0.34, uv.y));
  // gentle vignette
  col *= 1.0 - 0.22 * pow(length(uv - vec2(0.5, 0.55)), 1.6);

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`

export function Sky({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "a")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uR = gl.getUniformLocation(prog, "r")
    const uT = gl.getUniformLocation(prog, "t")

    // Render below device resolution: clouds are soft, and this keeps the
    // shader cheap on laptops and phones.
    const scale = 0.75
    const size = () => {
      const w = Math.max(1, Math.round(cv.clientWidth * scale))
      const h = Math.max(1, Math.round(cv.clientHeight * scale))
      cv.width = w
      cv.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uR, w, h)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(cv)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const start = performance.now() - 40000 // begin mid-drift, not at an empty origin
    let raf = 0
    const frame = (now: number) => {
      if (!document.hidden) {
        gl.uniform1f(uT, (now - start) / 1000)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
      if (!reduce) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
