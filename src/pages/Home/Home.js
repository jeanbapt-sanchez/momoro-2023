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

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Gallery, Layout } from '../../components';

const Home = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollTimeout = useRef(null);

  const handleScroll = useCallback(() => {
    // If scrolling is detected, set hasScrolled to true
    setHasScrolled(true);

    // Delete if a delay is already in progress
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Reset hasScrolled to false after a certain delay (e.g. 2 seconds)
    scrollTimeout.current = setTimeout(() => {
      setHasScrolled(false);
    }, 2000);
  }, []); // Dependencies are empty because we are not using any external variables in the callback

  useEffect(() => {
    // Désactiver le défilement lorsque le composant est monté
    document.body.classList.add('no-scroll');

    // Re-enable scrolling when component is unmounted
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <Layout hasScrolled={hasScrolled}>
      <div className="Home">
        <Gallery onScroll={handleScroll} />
      </div>
    </Layout>
  );
};

export default Home;
