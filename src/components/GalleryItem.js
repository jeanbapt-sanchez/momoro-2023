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

    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      // Mobile
      this.imageWidth = (760 / 2) * 0.75;
      this.imageHeight = (500 / 2) * 0.75;
      this.titleFontSize = 96 / 2;
    } else if (screenWidth > 768 && screenWidth <= 1024) {
      // Tablette
      this.imageWidth = 760 / 2;
      this.imageHeight = 500 / 2;
      this.titleFontSize = 96 / 1.5;
    } else {
      // Desktop
      this.imageWidth = 760;
      this.imageHeight = 500;
      this.titleFontSize = 96;
    }

    this.backgroundShaderProgram = this.createBackgroundShader();
    this.createBackgroundMesh();
    this.createShader();
    this.createMesh();
    this.bindEvents();
  }

  createBackgroundShader() {
    return new Program(this.gl, {
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
  }

  createBackgroundMesh() {
    const backgroundGeometry = new Plane(this.gl, { width: 100, height: 100 });
    const backgroundMesh = new Mesh(this.gl, {
      geometry: backgroundGeometry,
      program: this.backgroundShaderProgram,
    });
    backgroundMesh.setParent(this.scene);
  }

  createShader() {
    const texture = new Texture(this.gl);
    const vertex = `
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
    varying vec2 vUv;
    void main() {
      vec4 texColor = texture2D(tMap, vUv);
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
      },
    });
    const img = new Image();
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
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
    // Update Background Shader mouse position
    const cameraZ = this.camera.position.z;
    const aspectRatio = this.camera.aspect;
    const fieldOfView = this.camera.fov;
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

    this.backgroundShaderProgram.uniforms.uMouse.value = mousePosition;

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
    document.getElementById('canvas-container').appendChild(titleElement);
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

  update(deltaTime) {
    this.backgroundShaderProgram.uniforms.uTime.value += deltaTime * this.speedFactor;
  }
}

export default GalleryItem;
