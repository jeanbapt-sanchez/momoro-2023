import { useEffect, useState } from 'react';
import { Renderer, Camera, Transform } from 'ogl';

const useWebGLScene = ({ canvasId }) => {
  const [glContext, setGlContext] = useState(null);
  const [camera, setCamera] = useState(null);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    // peut etre séparer en petite fonction
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const canvasContainer = document.getElementById(canvasId);
    canvasContainer.appendChild(gl.canvas);

    const camera = new Camera(gl);
    // camera.perspective({ near: 0.1, far: 100 });
    camera.perspective({ near: 0.1, far: 100, aspect: window.innerWidth / window.innerHeight });
    camera.fov = 45;
    camera.position.z = 20;

    const scene = new Transform();

    setGlContext(gl);
    setCamera(camera);
    setScene(scene);
    setRenderer(renderer);

    return () => {
      gl.canvas.remove();
    };
  }, [canvasId]);

  return { gl: glContext, camera, scene, renderer };
};

export default useWebGLScene;

// const initScene = () => {
//   const renderer = createRenderer();
//   const camera = createCamera(renderer.gl);
//   const scene = createScene();

//   return { gl: renderer.gl, camera, scene, renderer };
// };

// const createRenderer = () => {
//   const renderer = new Renderer();
//   const gl = renderer.gl;
//   gl.enable(gl.DEPTH_TEST);
//   gl.depthFunc(gl.LEQUAL);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   const canvasContainer = document.getElementById('galleryCanvas');
//   canvasContainer.appendChild(gl.canvas);
//   return renderer;
// };

// const createCamera = (gl) => {
//   const camera = new Camera(gl);
//   camera.perspective({ near: 0.1, far: 100 });
//   // camera.perspective({ near: 0.1, far: 100, aspect: window.innerWidth / window.innerHeight });
//   camera.position.z = 20;
//   return camera;
// };

// const createScene = () => new Transform();
