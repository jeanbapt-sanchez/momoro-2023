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

import React, { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { ProjectContext } from '../../contexts';
import GalleryItem from './GalleryItem';
import { useNavigate } from 'react-router-dom';
import { useGalleryBackground, useGalleryScroll, useWebGLScene } from '../../hooks';
import './Gallery.css';

const Gallery = ({ onScroll }) => {
  const { scroll } = useGalleryScroll(onScroll);
  const { gl, camera, scene, renderer } = useWebGLScene({ canvasId: 'galleryCanvas' });
  useGalleryBackground({ gl, scene, camera });

  const projectData = useContext(ProjectContext);

  const thumbnails = useMemo(() => projectData.map((project) => project.thumbnail), [projectData]);
  const titles = useMemo(() => projectData.map((project) => project.title), [projectData]);
  const ids = useMemo(() => projectData.map((project) => project.id), [projectData]);

  const spacing = useRef(15);
  const mediasRef = useRef([]);

  const navigate = useNavigate();

  const handleResize = useCallback(() => {
    if (renderer && camera) {
      renderer.setSize(window.innerWidth, window.innerHeight);

      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      });

      const fov = camera.fov * (Math.PI / 180);
      const height = 2 * Math.tan(fov / 2) * camera.position.z;
      const width = height * camera.aspect;

      gl.viewport(0, 0, height, width);

      mediasRef.current.forEach((media) => {
        media.onResize({
          screen: { width: window.innerWidth, height: window.innerHeight },
          viewport: { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight },
        });
      });
    }
  }, [camera, gl, renderer]);

  useEffect(() => {
    if (!gl || !camera || !scene || !renderer) return;

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
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
        media.updateTitlePosition(camera, gl.canvas);
      });

      renderer.render({
        scene: scene,
        camera: camera,
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
  }, [onScroll, titles, thumbnails, ids, gl, camera, scene, renderer]);

  const setupEventListeners = () => {
    window.addEventListener('resize', handleResize);
  };

  const cleanupEventListeners = () => {
    window.removeEventListener('resize', handleResize);
  };

  const cleanupScene = (medias) => {
    gl.canvas.remove();
    cleanupEventListeners();
    medias.forEach((media) => {
      media.titleElement.remove();
    });
  };

  return <div className="gallery-canvas" id="galleryCanvas" />;
};

export default memo(Gallery);
