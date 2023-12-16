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

import React, { createContext } from 'react';

export const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
  const about = {
    headline:
      "Although I'm passionate about the exponential advancements and innovations of multimedia technologies, I can not conceive these without a proper artistic direction. I'm able to create authentic, smart and well-executed ideas using digital and traditional media.",
  };

  return <AboutContext.Provider value={about}>{children}</AboutContext.Provider>;
};
