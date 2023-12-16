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

import { useEffect } from 'react';

const useHideScrollbar = () => {
  useEffect(() => {
    // Create a style tag to hide the scrollbar
    const scrollbarStyleTag = document.createElement('style');
    scrollbarStyleTag.innerHTML = `
      /* Hide the scrollbar */
      body {
          overflow-anchor: none;
          overflow: auto;
      
          /* Hide the scrollbar for Chrome, Safari, and Opera */
          ::-webkit-scrollbar {
              display: none;
          }
      
          /* Hide the scrollbar for IE and Edge */
          -ms-overflow-style: none;
          scrollbar-width: none;
      }
    `;

    // Append the style tag to the head
    document.head.appendChild(scrollbarStyleTag);

    // Clean up by removing the style tag when the component unmounts
    return () => {
      document.head.removeChild(scrollbarStyleTag);
    };
  }, []);
};

export default useHideScrollbar;
