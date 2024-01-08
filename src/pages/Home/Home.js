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

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Gallery, Layout } from '../../components';
import { throttle } from 'lodash';
import './Home.css';

const Home = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollEndTimeoutRef = useRef(null);

  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    scrollEndTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 2000);
  }, []);

  // eslint-disable-next-line
  const throttledHandleScroll = useCallback(throttle(handleScroll, 100), [handleScroll]);

  useEffect(() => {
    if (!document.body.classList.contains('no-scroll')) document.body.classList.add('no-scroll');

    return () => {
      if (document.body.classList.contains('no-scroll'))
        document.body.classList.remove('no-scroll');
      if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    };
  }, []);

  return (
    <Layout isScrolling={isScrolling}>
      <div className="home">
        <Gallery onScroll={throttledHandleScroll} />
      </div>
    </Layout>
  );
};

export default memo(Home);
