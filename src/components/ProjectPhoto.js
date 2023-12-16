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

import React from 'react';

const ProjectPhoto = ({ src, alt, index }) => {
  const sizes = [
    { width: 600, height: 800 },
    { width: 400, height: 600 },
    { width: 700, height: 800 },
    { width: 500, height: 700 },
  ];
  const offsets = [
    { x: 0, y: 100 },
    { x: 0, y: -100 },
    { x: 0, y: 80 },
    { x: 0, y: -100 },
  ];

  const { width, height } = sizes[index % sizes.length];
  const { x, y } = offsets[index % offsets.length];

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    objectFit: 'contain', // TODO: Choose between 'contain' which adapts to avoid exceeding the boundaries, 'cover' which covers the entirety without distortion, or 'fill' which fits perfectly within the box but distorts the image if it's not suitable. The sizes are predictable because it rotates, so the choice is between not caring and using 'contain' because it adapts the images.
    transform: `translate(${x}px, ${y}px)`,
  };

  return <img src={src} alt={alt} style={style} />;
};

export default ProjectPhoto;
