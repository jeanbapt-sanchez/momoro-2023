/*
 * Copyright © 2023 Jean-Baptiste Sanchez
 *
 * This file is part of Momoro Portfolio 2023.
 *
 * For more information, the source code is available at:
 * https://github.com/jeanbapt-sanchez/momoro-portfolio-2023
 *
 * Momoro Portfolio 2023 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Renderer, Camera, Transform } from 'ogl';
// import normalizeWheel from 'normalize-wheel';
import { ProjectContext } from '../../contexts';
import GalleryItem from './GalleryItem';
import { useNavigate } from 'react-router-dom';
import useGalleryScroll from '../../hooks/useGalleryScroll';
import './Gallery.css';

const Gallery = ({ onScroll }) => {
  // const { handleWheel, handleTouchStart, handleTouchMove, scroll } = useGalleryScroll(onScroll);
  const { scroll } = useGalleryScroll(onScroll);

  const projectData = useContext(ProjectContext);

  // const [direction, setDirection] = useState(0);
  // const [previousDirection, setPreviousDirection] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  const thumbnails = useMemo(() => projectData.map((project) => project.thumbnail), [projectData]);
  const titles = useMemo(() => projectData.map((project) => project.title), [projectData]);
  const ids = useMemo(() => projectData.map((project) => project.id), [projectData]);

  const sceneRefs = useRef({
    gl: null,
    camera: null,
    scene: null,
    renderer: null,
  });
  // const scroll = useRef({
  //   value: 0,
  //   target: 0,
  //   ease: 0.2,
  //   velocity: 0,
  //   friction: 0.99,
  //   maxSpeed: 100,
  //   speed: 0.01,
  // });
  const spacing = useRef(15);
  // const lastTouchY = useRef(0);
  const mediasRef = useRef([]);

  const navigate = useNavigate();

  // const updateScroll = useCallback(
  //   (delta) => {
  //     setDirection(Math.sign(delta));
  //     if (direction !== previousDirection) {
  //       scroll.current.velocity *= 0.5; // Reduce scrolling speed by half when direction changes
  //     }
  //     scroll.current.velocity += delta * scroll.current.speed;
  //     scroll.current.velocity = Math.min(
  //       Math.max(scroll.current.velocity, -scroll.current.maxSpeed),
  //       scroll.current.maxSpeed,
  //     ); // Limit scrolling speed
  //     setPreviousDirection(direction);
  //     onScroll(); // Call scroll handler
  //   },
  //   [direction, previousDirection, onScroll],
  // );

  // const handleWheel = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //     const normalized = normalizeWheel(event);
  //     updateScroll(normalized.pixelY);
  //   },
  //   [updateScroll],
  // );

  // const handleTouchStart = useCallback((event) => {
  //   lastTouchY.current = event.touches[0].clientY;
  // }, []);

  // const handleTouchMove = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //     const currentTouchY = event.touches[0].clientY;
  //     const deltaY = currentTouchY - lastTouchY.current;
  //     const direction = deltaY > 0 ? 1 : -1;
  //     const touchNormalizationFactor = 5;

  //     const normalizedDelta = Math.abs(deltaY) * direction * touchNormalizationFactor;
  //     updateScroll(normalizedDelta);

  //     lastTouchY.current = currentTouchY;
  //   },
  //   [updateScroll],
  // );

  const handleResize = useCallback(() => {
    if (sceneRefs.current.renderer && sceneRefs.current.camera) {
      sceneRefs.current.renderer.setSize(window.innerWidth, window.innerHeight);
      // sceneRefs.current.camera.perspective({
      //   aspect: (sceneRefs.current.gl.canvas.width / sceneRefs.current.gl.canvas.height),
      // });
      sceneRefs.current.gl.viewport(0, 0, window.innerWidth, window.innerHeight);

      mediasRef.current.forEach((media) => {
        media.updateSize();
      });

      // Redessiner la scène
      sceneRefs.current.renderer.render({
        scene: sceneRefs.current.scene,
        camera: sceneRefs.current.camera,
      });
    }
  }, []);

  // TODO: Separate Media (Items) and Background

  useEffect(() => {
    const { gl, camera, scene, renderer } = initScene();
    sceneRefs.current.gl = gl;
    sceneRefs.current.camera = camera;
    sceneRefs.current.scene = scene;
    sceneRefs.current.renderer = renderer;

    // Media creation
    const medias = thumbnails.map((thumbnail, index) => {
      const media = new GalleryItem({
        gl,
        image: thumbnail,
        scene,
        spacing: spacing.current,
        camera,
        id: ids[index],
        navigate: navigate,
      });
      media.setPosition(index);
      media.createTitle(titles[index]);
      media.titleElement.style.opacity = 0;
      media.titleElement.style.transition = 'opacity 0.3s ease-in-out';
      return media;
    });
    mediasRef.current = medias;

    // User interaction management
    setupEventListeners();

    const update = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      setLastTime(currentTime);

      sceneRefs.current.gl.clear(
        sceneRefs.current.gl.COLOR_BUFFER_BIT | sceneRefs.current.gl.DEPTH_BUFFER_BIT,
      );

      // // Apply friction factor to velocity
      // scroll.current.velocity *= scroll.current.friction;

      // // Updated scroll.current.value with velocity and scroll value with an "ease in" effect
      // scroll.current.value +=
      //   (scroll.current.target - scroll.current.value) * scroll.current.ease +
      //   scroll.current.velocity;

      // // If the velocity is very small, set it to 0 to avoid unwanted movements
      // if (Math.abs(scroll.current.velocity) < 0.01) {
      //   scroll.current.velocity = 0;
      // }

      const viewWidth = 105;

      medias.forEach((media) => {
        media.currentScale += (media.targetScale - media.currentScale) * 0.1;
        media.mesh.scale.set(media.currentScale, media.currentScale, 1);

        media.mesh.position.x += scroll.current.value * 0.01; // Adjust the factor 0.01 according to the desired speed

        // If the image exits to the right of the viewport
        while (media.mesh.position.x > viewWidth / 2 + spacing.current) {
          media.mesh.position.x -= viewWidth + 2 * spacing.current;
        }
        // If the image exits to the left of the viewport
        while (media.mesh.position.x < -viewWidth / 2 - spacing.current) {
          media.mesh.position.x += viewWidth + 2 * spacing.current;
        }

        media.mesh.updateMatrixWorld(true);
        media.updateTitlePosition(sceneRefs.current.camera, sceneRefs.current.gl.canvas);
        media.update(deltaTime);
      });

      // If scroll.current.value is close to scroll.current.target, reset scroll.current.target
      // const tolerance = 1; // Une valeur beaucoup plus petite
      // if (Math.abs(scroll.current.value - scroll.current.target) < tolerance) {
      //   scroll.current.value = scroll.current.target;
      // }

      sceneRefs.current.renderer.render({
        scene: sceneRefs.current.scene,
        camera: sceneRefs.current.camera,
      });
      requestAnimationFrame(update);
    };
    update();

    requestAnimationFrame(update);
    return () => {
      cleanupScene(medias);
      cancelAnimationFrame(update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScroll, titles, thumbnails, ids]);

  const initScene = () => {
    const renderer = createRenderer();
    const camera = createCamera(renderer.gl);
    const scene = createScene();

    return { gl: renderer.gl, camera, scene, renderer };
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

  // IN CLEANING
  const setupEventListeners = () => {
    // window.addEventListener('wheel', handleWheel, { passive: false });
    // window.addEventListener('touchstart', handleTouchStart);
    // window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);
  };

  const cleanupEventListeners = () => {
    // window.removeEventListener('wheel', handleWheel);
    // window.removeEventListener('touchstart', handleTouchStart);
    // window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('resize', handleResize);
  };

  const cleanupScene = (medias) => {
    sceneRefs.current.gl.canvas.remove();
    cleanupEventListeners();
    medias.forEach((media) => {
      media.titleElement.remove();
    });
  };

  return <div className="gallery-canvas" id="galleryCanvas" />;
};

export default memo(Gallery);
