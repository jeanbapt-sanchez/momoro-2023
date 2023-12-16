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

const Layout = ({ children, isAboutPage, hasScrolled }) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <>
      <div className="Layout">
        <div className="Layout-header">
          <Link to="/" className="Layout-title">
            Momoro
          </Link>
          {!isAboutPage && (
            <Link to="/about" className="Layout-about">
              About
            </Link>
          )}
        </div>
        <div className="Layout-footer">
          <div className="Layout-contact">
            <div className="Layout-contact">
              {showButtons ? (
                <div className="Layout-social-buttons fade-in-contacts">
                  <button>Li</button>
                  <button>In</button>
                  <button>Be</button>
                  <button>@</button>
                  <button onClick={() => setShowButtons(!showButtons)}>×</button>
                </div>
              ) : (
                <button
                  onClick={() => setShowButtons(!showButtons)}
                  className="Layout-contact-button"
                >
                  Contact
                </button>
              )}
            </div>
          </div>
          <span className={`${hasScrolled ? 'fade-out' : 'fade-in'} Layout-scroll non-selectable`}>
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
