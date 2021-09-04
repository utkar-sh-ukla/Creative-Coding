const canvasSketch = require('canvas-sketch')
const createShader = require('canvas-sketch-util/shader')
const glsl = require('glslify')

// Setup our sketch
const settings = {
  context: 'webgl',
  animate: true,
}

// Your glsl code
const frag = glsl(/*glsl*/ `
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  #pragma glslify: noise = require('glsl-noise/simplex/3d');

  void main () {
    // vec3 colorA = cos(time * 2.0) + vec3(1.0, 0.0, 0.0);
    // vec3 colorB = vec3(0.0, 0.5, 0.0);

    vec2 center = vUv - 0.5;
    center.x *= aspect;

    // float dist = length(center);

    // float alpha = smoothstep(0.50, 0.25, dist);

    // vec3 color = mix(colorA, colorB, vUv.y + vUv.x * sin(time));
    // gl_FragColor = vec4(color, alpha);

    float n = noise(vec3(center * 1.0, time));

    gl_FragColor = vec4(vec3(n), 1.0);
  }
`)

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor: 'white',
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      aspect: ({ width, height }) => width / height,
    },
  })
}

canvasSketch(sketch, settings)
