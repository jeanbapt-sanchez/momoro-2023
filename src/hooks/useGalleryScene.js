import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform } from 'ogl';

const useGalleryScene = () => {
  const sceneRefs = useRef({
    gl: null,
    camera: null,
    scene: null,
    renderer: null,
  });

  // Initialisation de la scène
  const initScene = () => {
    const renderer = createRenderer();
    const camera = createCamera(renderer.gl);
    const scene = createScene();

    sceneRefs.current = {
      gl: renderer.gl,
      camera,
      scene,
      renderer,
    };

    return sceneRefs.current;
  };

  const createRenderer = () => {
    const renderer = new Renderer();
    const gl = renderer.gl;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const canvasContainer = document.getElementById('galleryCanvas');
    canvasContainer.appendChild(gl.canvas);

    return renderer;
  };

  const createCamera = (gl) => {
    const camera = new Camera(gl);
    camera.perspective({ near: 0.1, far: 100 });
    // camera.perspective({ near: 0.1, far: 100, aspect: window.innerWidth / window.innerHeight });
    camera.position.z = 20;

    return camera;
  };

  const createScene = () => new Transform();

  // Gestion du redimensionnement de la fenêtre
  const handleResize = () => {
    const { renderer, camera, gl } = sceneRefs.current;

    if (renderer && camera) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      gl.viewport(0, 0, window.innerWidth, window.innerHeight);
      // camera.perspective({ aspect: window.innerWidth / window.innerHeight });

      renderer.render({
        scene: sceneRefs.current.scene,
        camera: sceneRefs.current.camera,
      });
    }
  };

  // Nettoyage de la scène
  const cleanupScene = () => {
    const { gl } = sceneRefs.current;
    if (gl && gl.canvas) {
      gl.canvas.remove();
    }
  };

  useEffect(() => {
    initScene();

    window.addEventListener('resize', handleResize);
    return () => {
      cleanupScene();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return sceneRefs.current;
};

export default useGalleryScene;

// const handleResize = useCallback(() => {
//   if (renderer && sceneRefs.current.camera) {
//     sceneRefs.current.renderer.setSize(window.innerWidth, window.innerHeight);
//     // sceneRefs.current.camera.perspective({
//     //   aspect: (sceneRefs.current.gl.canvas.width / sceneRefs.current.gl.canvas.height),
//     // });
//     sceneRefs.current.gl.viewport(0, 0, window.innerWidth, window.innerHeight);

//     mediasRef.current.forEach((media) => {
//       media.updateSize();
//     });

//     // Redessiner la scène
//     sceneRefs.current.renderer.render({
//       scene: sceneRefs.current.scene,
//       camera: sceneRefs.current.camera,
//     });
//   }
// }, []);
