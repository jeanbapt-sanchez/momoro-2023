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

import { mat4, vec4 } from 'gl-matrix';
import { Plane, Program, Mesh, Texture, Vec2, Raycast } from 'ogl';

// TODO: Migrate to GalleryItem Functional Component Nested of Gallery Functional Component
class GalleryItem {
  constructor({ gl, image, scene, spacing, camera, id, navigate }) {
    this.gl = gl;
    this.image = image;
    this.scene = scene;
    this.targetScale = 1;
    this.currentScale = 1;
    this.spacing = spacing || 15;
    this.camera = camera;
    this.id = id;
    this.navigateHook = navigate;

    this.speedFactor = 0.001;

    this.raycaster = new Raycast(this.camera);

    this.screen = { width: window.innerWidth, height: window.innerHeight };
    this.viewport = { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight };

    if (window.innerWidth <= 768) {
      // Mobile
      this.imageWidth = (760 / 2) * 0.75;
      this.imageHeight = (500 / 2) * 0.75;
      this.titleFontSize = 96 * 0.5;
    } else if (window.innerWidth > 768 || window.innerWidth <= 1024) {
      // Tablette
      this.imageWidth = 760 * 0.85;
      this.imageHeight = 500 * 0.85;
      this.titleFontSize = 96 * 0.75;
    } else {
      // Desktop
      this.imageWidth = 760;
      this.imageHeight = 500;
      this.titleFontSize = 96;
    }

    this.createShader();
    this.createMesh();
    this.bindEvents();
  }

  createShader() {
    const texture = new Texture(this.gl);
    const vertex = `
      precision highp float;
      attribute vec2 uv;
      attribute vec3 position;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragment = `
      precision highp float;
      uniform sampler2D tMap;
      uniform float isHovered;
      uniform vec2 uViewportSizes;
      uniform vec2 uPlaneSizes;
      uniform vec2 uImageSizes;
      varying vec2 vUv;
      void main() {
        vec2 ratio = vec2(
          min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
          min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
        );
        
        vec2 uv = vec2(
          vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
          vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );

        vec4 texColor = texture2D(tMap, uv);
        float grayscale = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
        gl_FragColor = mix(vec4(grayscale, grayscale, grayscale, 1.0), texColor, isHovered);
      }
    `;

    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: texture },
        isHovered: { value: 0 }, // 0 for not hovered, 1 for hovered
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
      },
    });
    const img = new Image();
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    const fov = this.camera.fov * (Math.PI / 180); // Convertir l'angle de champ de vision en radians
    const distanceToPlane = this.camera.position.z;
    const heightInGLUnits = 2 * Math.tan(fov / 2) * distanceToPlane;
    const widthInGLUnits = heightInGLUnits * this.camera.aspect;

    const imageWidthInGLUnits = (this.imageWidth / window.innerWidth) * widthInGLUnits;
    const imageHeightInGLUnits = (this.imageHeight / window.innerHeight) * heightInGLUnits;

    const planeGeometry = new Plane(this.gl, {
      width: imageWidthInGLUnits,
      height: imageHeightInGLUnits,
      heightSegments: 50,
      widthSegments: 100,
    });

    this.mesh = new Mesh(this.gl, {
      geometry: planeGeometry,
      program: this.program,
    });
    this.mesh.position.z = 1.0;
    // Calculate the boundingBox if it is not already defined
    if (!this.mesh.geometry.bounds) {
      this.mesh.geometry.computeBoundingBox();
    }
    this.mesh.setParent(this.scene);
  }

  bindEvents() {
    this.gl.canvas.addEventListener('click', this.onClick.bind(this));
    this.gl.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onClick(event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    const normalizedMousePosition = new Vec2(x, y);

    // Create the raycaster
    this.raycaster.castMouse(this.camera, normalizedMousePosition);

    // Check if the raycaster intersects with the mesh
    const intersects = this.raycaster.intersectMeshes([this.mesh], { output: [] });

    // And if there is an intersection
    if (intersects.length > 0) {
      this.navigateHook(`/${this.id}`);
    }
  }

  onMouseMove(event) {
    // Event manage mouse effect on items and on the shaders

    // Calculate the normalized mouse position
    const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
    const normalizedMousePosition = new Vec2(normalizedX, normalizedY);

    // Update raycaster with mouse position
    this.raycaster.castMouse(this.camera, normalizedMousePosition);

    // Check intersections with all meshes in the scene
    const intersects = this.raycaster.intersectMeshes([this.mesh], { output: [] });

    // Deal with intersections
    if (intersects.length > 0) {
      this.targetScale = 1.1; // Slightly enlarge the mesh
      this.mesh.program.uniforms.isHovered.value = 1; // Restore original color
      this.titleElement.style.visibility = 'visible'; // Show title
      this.titleElement.style.opacity = 1; // Change title opacity
      this.gl.canvas.style.cursor = 'pointer'; // Change cursor
    } else {
      // Cursor is not on this plane
      this.targetScale = 1; // Reset mesh size
      this.program.uniforms.isHovered.value = 0; // Put in black and white
      this.titleElement.style.visibility = 'hidden'; // Hide title
      this.titleElement.style.opacity = 0; // Change title opacity
      this.gl.canvas.style.cursor = 'default'; // Reset cursor
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) {
      this.screen = screen;
    }

    if (viewport) {
      this.viewport = viewport;

      this.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
    }

    this.scale = this.screen.height / 1500;
    this.mesh.scale.x = (this.viewport.width * (this.imageWidth * this.scale)) / this.screen.width;
    this.mesh.scale.y =
      (this.viewport.height * (this.imageHeight * this.scale)) / this.screen.height;

    this.program.uniforms.uPlaneSizes.value = [this.mesh.scale.x, this.mesh.scale.y];
  }

  setPosition(index) {
    this.initialX = index * this.spacing; // Store the initial position
    this.mesh.position.x = this.initialX;
  }

  createTitle(title) {
    const titleElement = document.createElement('div');
    const titleFont = getComputedStyle(document.documentElement)
      .getPropertyValue('--title-font')
      .trim();
    titleElement.innerText = title;
    titleElement.style.position = 'absolute';
    titleElement.style.left = '50%';
    titleElement.style.top = '100%';
    titleElement.style.transform = 'translate(-50%, -50%)';
    titleElement.style.fontFamily = `${titleFont}, sans-serif`;
    titleElement.style.fontSize = `${this.titleFontSize}, px`;
    titleElement.style.color = 'white';
    titleElement.style.textAlign = 'center';
    titleElement.style.pointerEvents = 'none'; // to ensure it doesn't interfere with any interactions
    titleElement.style.whiteSpace = 'nowrap';
    titleElement.style.fontSize = `${this.titleFontSize}px`;
    document.getElementById('galleryCanvas').appendChild(titleElement);
    this.titleElement = titleElement;
  }

  worldToScreen(position, camera, canvas) {
    // Transform object position to clip space
    let clipSpacePosition = [];
    let mvp = [];
    mat4.multiply(mvp, camera.projectionMatrix, camera.viewMatrix);
    vec4.transformMat4(clipSpacePosition, [position.x, position.y, position.z, 1], mvp);

    // Divide by w to get the position in homogeneous space
    clipSpacePosition[0] /= clipSpacePosition[3];
    clipSpacePosition[1] /= clipSpacePosition[3];

    // Convert clip space to screen space
    const x = (clipSpacePosition[0] * 0.5 + 0.5) * canvas.width;
    const y = (-clipSpacePosition[1] * 0.5 + 0.5) * canvas.height;

    return { x, y };
  }

  updateTitlePosition(camera, canvas) {
    const screenPosition = this.worldToScreen(this.mesh.position, camera, canvas);
    this.titleElement.style.left = `${screenPosition.x}px`;
    const distanceFromCenterInPixel = 30;
    this.titleElement.style.top = `${
      screenPosition.y + this.imageHeight / 2 + distanceFromCenterInPixel
    }px`; // Adjust this to position the title at the bottom of the image
  }
}

export default GalleryItem;
