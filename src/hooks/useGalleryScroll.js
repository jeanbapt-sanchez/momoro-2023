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

import { useCallback, useEffect, useRef, useState } from 'react';
import normalizeWheel from 'normalize-wheel/src/normalizeWheel';

const useGalleryScroll = (onScroll) => {
  const [scrollDirection, setScrollDirection] = useState({ current: 0, previous: 0 });

  const lastTouchY = useRef(0);
  const scroll = useRef({
    value: 0,
    target: 0,
    ease: 0.2,
    velocity: 0,
    friction: 0.99,
    maxSpeed: 100,
    speed: 0.01,
    threshold: 0.2,
  });
  const rafId = useRef(null);

  const calculateScrollDirection = useCallback((delta) => {
    const newDirection = Math.sign(delta);
    setScrollDirection((previousDirection) => ({
      current: newDirection,
      previous:
        previousDirection.current !== newDirection
          ? previousDirection.current
          : previousDirection.previous,
    }));
  }, []);

  const calculateVelocity = useCallback(
    (delta) => {
      if (scrollDirection.current !== scrollDirection.previous) {
        scroll.current.velocity *= 0.5; // Reduce scrolling speed by half when direction changes
      }
      scroll.current.velocity += delta * scroll.current.speed;
      scroll.current.velocity = Math.min(
        Math.max(scroll.current.velocity, -scroll.current.maxSpeed),
        scroll.current.maxSpeed,
      ); // Limit scrolling speed
    },
    [scrollDirection],
  );

  const normalizeTouchEvent = useCallback((event) => {
    const currentTouchY = event.touches[0].clientY;
    const deltaY = currentTouchY - lastTouchY.current;
    const direction = deltaY > 0 ? 1 : -1;
    const touchNormalizationFactor = 5;
    return Math.abs(deltaY) * direction * touchNormalizationFactor;
  }, []);

  const updateScroll = useCallback(
    (delta) => {
      calculateScrollDirection();
      calculateVelocity(delta);
      onScroll();
    },
    [onScroll, calculateScrollDirection, calculateVelocity],
  );

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      const normalized = normalizeWheel(event);
      updateScroll(normalized.pixelY);
    },
    [updateScroll],
  );

  const handleTouchStart = useCallback((event) => {
    lastTouchY.current = event.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      event.preventDefault();
      const normalizedDelta = normalizeTouchEvent(event);
      updateScroll(normalizedDelta);
      lastTouchY.current = event.touches[0].clientY;
    },
    [normalizeTouchEvent, updateScroll],
  );

  const animateScroll = useCallback(() => {
    scroll.current.velocity *= scroll.current.friction; // Apply friction factor to velocity
    scroll.current.value +=
      (scroll.current.target - scroll.current.value) * scroll.current.ease +
      scroll.current.velocity; // Updated scroll.current.value with velocity and scroll value with an "ease in" effect

    if (Math.abs(scroll.current.value - scroll.current.target) < scroll.current.threshold)
      scroll.current.value = scroll.current.target; // Apply the scroll threshold
  }, []);

  useEffect(() => {
    const animateFrame = () => {
      animateScroll();
      rafId.current = requestAnimationFrame(animateFrame);
    };
    rafId.current = requestAnimationFrame(animateFrame);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [animateScroll]);

  useEffect(() => {
    const setupEventListeners = () => {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    };
    setupEventListeners();

    return () => {
      const cleanupEventListeners = () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
      };
      cleanupEventListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScroll]);

  return {
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    scroll,
  };
};

export default useGalleryScroll;
