import { useCallback, useEffect, useRef } from 'react';
import { Plane, Program, Mesh, Vec2 } from 'ogl';

const useGalleryBackground = ({ gl, scene, camera }) => {
  const backgroundShaderRef = useRef(null);
  const backgroundMeshRef = useRef(null);
  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(Date.now());

  const createBackgroundGeometry = ({ gl, width, height }) => new Plane(gl, { width, height });

  const createBackgroundShader = ({ gl }) => {
    return new Program(gl, {
      vertex: `
      attribute vec2 position;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = position.xy * 0.5 + 0.5;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);
      }
    `,
      fragment: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform float uTime;
    
      float length2(vec2 p) {
        return dot(p, p);
      }
    
      float noise(vec2 p) {
        return fract(sin(fract(sin(p.x) * (43.13311)) + p.y) * 31.0011);
      }
    
      float worley(vec2 p) {
        float d = 1e30;
        for (int xo = -1; xo <= 1; ++xo) {
          for (int yo = -1; yo <= 1; ++yo) {
            vec2 tp = floor(p) + vec2(xo, yo);
            d = min(d, length2(p - tp - noise(tp)));
          }
        }
        return 3.0 * exp(-4.0 * abs(2.5 * d - 1.0));
      }
    
      float fworley(vec2 p) {
        return sqrt(sqrt(sqrt(
          worley(p * 5.0 + 0.05 * uTime) *
          sqrt(worley(p * 50.0 + 0.12 + -0.1 * uTime)) *
          sqrt(sqrt(worley(p * -10.0 + 0.03 * uTime))))
        ));
      }
    
      void main() {
        vec2 uv = vUv;
        vec2 mouseUV = uMouse;
        vec2 p = uv - mouseUV;
    
        float t = fworley(p * 1500.0);
        t *= exp(-length2(abs(0.01 * p - 1.0)));
        vec3 color = vec3(t * 0.2, 1. * t, pow(t, 0.9 - t)) * 0.35 ; // replace 0.35, 0.65 for the last numbers and test wave
    
        float dist = length(p * 4.);
        float worleyValue = fworley(p * 1500.0);
        float wave = sin(dist * 20.0 - uTime * 5.0) * worleyValue * .0009;
    
        gl_FragColor = vec4(color + vec3(wave), 1.0);
      }
    `,
      uniforms: {
        uMouse: { value: new Vec2(0, 0) },
        uTime: { value: 0.0 },
      },
    });
  };

  const createBackgroundMesh = ({ gl, geometry, program }) =>
    new Mesh(gl, {
      geometry,
      program,
    });

  const animateBackgroundShader = useCallback(({ deltaTime }) => {
    if (!backgroundShaderRef.current) return;
    const speedFactor = 0.001;
    return (backgroundShaderRef.current.uniforms.uTime.value += deltaTime * speedFactor);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!backgroundShaderRef.current) return;
      const cameraZ = camera.position.z;
      const aspectRatio = camera.aspect;
      const fieldOfView = camera.fov;
      const scale = 0.47;
      const x =
        ((event.clientX / window.innerWidth) * 2 - 1) *
        aspectRatio *
        (cameraZ * Math.tan((fieldOfView * Math.PI) / 180 / 2)) *
        scale;
      const y =
        ((-((event.clientY / window.innerHeight) * 2 - 1) *
          (cameraZ * Math.tan((fieldOfView * Math.PI) / 180 / 2))) /
          aspectRatio) *
        scale;
      const mousePosition = new Vec2(x, y);
      backgroundShaderRef.current.uniforms.uMouse.value = mousePosition;
    },
    [camera],
  );

  // Manage creation
  useEffect(() => {
    if (!gl || !camera || !scene) return;
    const newBackgroundGeometry = createBackgroundGeometry({ gl, width: 100, height: 100 });
    const newBackgroundShader = createBackgroundShader({ gl });
    const newBackgroundMesh = createBackgroundMesh({
      gl,
      geometry: newBackgroundGeometry,
      program: newBackgroundShader,
    });
    backgroundShaderRef.current = newBackgroundShader;
    backgroundMeshRef.current = newBackgroundMesh;
    backgroundMeshRef.current.setParent(scene);

    // Cleanup
    return () => {};
  }, [camera, gl, scene]);

  // Manage animations
  useEffect(() => {
    if (!animateBackgroundShader) return;

    const currentTime = Date.now();
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    const animateFrame = () => {
      animateBackgroundShader({ deltaTime });
      rafIdRef.current = requestAnimationFrame(animateFrame);
    };
    rafIdRef.current = requestAnimationFrame(animateFrame);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [animateBackgroundShader]);

  // Manage events
  useEffect(() => {
    // TODO: Maybe handle resize
    const setupEventListeners = () => {
      window.addEventListener('mousemove', handleMouseMove);
    };
    setupEventListeners();

    return () => {
      const cleanupEventListeners = () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
      cleanupEventListeners();
    };
  }, [handleMouseMove]);

  return true;
};

export default useGalleryBackground;
