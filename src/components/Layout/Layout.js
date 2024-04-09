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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children, isAboutPage, isScrolling }) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <>
      <div className="layout">
        <div className="ui-segment">
          <Link to="/" className="ui-action ui-action--momoro">
            Momoro
          </Link>
          {!isAboutPage && (
            <Link to="/about" className="ui-action">
              About
            </Link>
          )}
        </div>
        <div className="ui-segment">
          <div
            className={`ui-segment__contact ${showButtons ? 'ui-segment__contact--fade-in' : ''}`}
          >
            {showButtons ? (
              <>
                <a
                  className="ui-action ui-action--social-button"
                  href="https://www.linkedin.com/in/morgane-rocheteau-973458168"
                >
                  Li
                </a>
                <a
                  className="ui-action ui-action--social-button"
                  href="https://www.instagram.com/morgane.rocheteau"
                >
                  In
                </a>
                <a
                  className="ui-action ui-action--social-button"
                  href="https://www.behance.net/rocheteaumd669"
                >
                  Be
                </a>
                <a
                  className="ui-action ui-action--social-button"
                  href="mailto:rocheteaumn@gmail.com?subject=Contact&"
                >
                  @
                </a>
                <button
                  className="ui-action ui-action--social-button"
                  onClick={() => setShowButtons(!showButtons)}
                >
                  ×
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowButtons(!showButtons)}
                className="ui-action ui-action--contact-button"
              >
                Contact
              </button>
            )}
          </div>
          <span
            className={`ui-segment__scroll-hint ${
              isScrolling ? 'ui-segment__scroll-hint--fade-out' : 'ui-segment__scroll-hint--fade-in'
            } non-selectable`}
          >
            Scroll
          </span>
          <span className="non-selectable">FR</span>
        </div>
      </div>
      {children}
    </>
  );
};

export default Layout;
